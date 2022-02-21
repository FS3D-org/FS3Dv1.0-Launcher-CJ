/*--------------------------------------
		FS3D/Prepar3d Launcher
		----------------------

	Author: 	FS3D
	Version:	0.5
	Year:		2022

--------------------------------------*/
const settings = require('./settings.js');
const fs3d = require('./fs3d.js');
const os = require('os');
const fs = require('fs');
const io = {

	//Get %APPDATA%/Roaming/Lockheed Martin/Prepar3d <version>/Controls/Standard.xml
	getControlsFile: new Promise(function(resolve, reject){
		if(settings.debug){console.log('Loading Controls File...')};
		var file_rows = fs.readFileSync(process.env.APPDATA + settings.controls_file, {encoding:'utf8'}).split("\n");
		for(row in file_rows){file_rows[row] = file_rows[row].trim().replace(/\r/g,'');} //Replace newlines
		var controls = {
			declaration:null,
			root:null,
			Descr:null,
			Filename:'Custom.xml',
			Sections:{}
		};
		var section_group = [];		//Temporary group for sections
		var settings_group = {};	//Temporary group for settings
		var num = 0;				//Section count
		var section_name;			//Temporary section names
		var type;					//Temporary type name
		for(row in file_rows){
			var line = file_rows[row];
			if(line.includes('<?xml')){controls.declaration = line;}
			else if(line.includes('<SimBase.Document')){controls.root = line.replace('Standard', 'Custom');} //Override id with Custom
			else if(line.includes('Descr')){controls.Descr = line.replace('<Descr>', '').replace('</Descr>', '');}
			else if(line.includes('<SimControls.Map')){
				section_group = [];//Empty temp files
				section_name = '';
			}
			else if(line.includes('<Name>')){section_name = line.replace('<Name>', '').replace('</Name>', '');}
			else if(line.includes('</SimControls.Map')){
				controls.Sections[section_name] = section_group;
				num++;
			}
			else if(line.includes('<Filename>') || line.includes('</Filename>') || line.includes('</SimBase.Document>')){} //Ignore useless tags
			else if(line == ''){}//Skip empty lines.
			else{
				if(line.includes('<Entry>') || line.includes('<Axis>') || line.includes('<POV>')){settings_group = {};}
				if(line.includes('<Entry>')){
					type = "Entry";
					settings_group[type] = {};
				}
				else if(line.includes('<Axis')){
					type = "Axis";
					settings_group[type] = {};
				}
				else if(line.includes('<POV>')){
					type = "POV";
					settings_group[type] = {};
				}
				else if(line.includes('</Entry') || line.includes('</Axis') || line.includes('</POV>')){section_group.push(settings_group);}
				else{
					var setting = line.slice(
						line.indexOf('<') + 1,
						line.indexOf('>'),
					);				
					var value = line.slice(
						line.indexOf('>') + 1,
						line.lastIndexOf('<'),
					);
					settings_group[type][setting] = value;
				}
			}
		}
		fs.writeFile('./Files/Controls.json', JSON.stringify(controls, null, 4), function(){});
		resolve(controls);
	}),

	//Get %APPDATA%/Roaming/Lockheed Martin/Prepar3d v4/Prepar3d.cfg file		
	getConfigFile: new Promise(function(resolve, reject){
		if(settings.debug){console.log('Loading Prepar3d.cfg...')};
		var config_data = {};
		var config_rows = fs.readFileSync(process.env.APPDATA + settings.config_file,{encoding:'utf16le'}).split("\n");
		var current_section = '';
		for(var i = 1; i < config_rows.length; i++){ //Start with 1 to skip the funky first row encoding
			if(config_rows[i].charAt(0) == ''){/*This skips empty lines*/}			
			else if(config_rows[i].charAt(0) == '['){
				var section_name = config_rows[i].replace(/[\[\]']+/g,'').replace(/\r/g,'');
				config_data[section_name] = {};
				current_section = section_name; //Reset current name to start a new section
			}
			else{
				var setting = config_rows[i].split("=");
				var property = setting[0];
				var value = setting[1];
				config_data[current_section][property] = value.replace(/[\[\]']+/g,'').replace(/\r/g,'');
			}
		}
		fs.writeFile('./Files/Config.json', JSON.stringify(config_data, null, 4), function(){})
		resolve(config_data);
	}),

	writeConfigFile:function(config_data){
		var config = process.env.APPDATA + settings.config_file;
		var config_default = process.env.APPDATA + settings.config_file_default;
		return new Promise(function(resolve, reject){
			var backup = new Promise(function(resolve, reject){
				fs.copyFile(config, config +'.bak', function(){
					fs.copyFile('./Files/default/Prepar3d.cfg', config, function(){resolve();});
				});
			});
			backup.then(function(){
				var defaults_file = fs.readFileSync('./js/defaults.json');
				var defaults = JSON.parse(defaults_file);
				var config_string = '\r\n';
				for(section in config_data){
					config_string += '['+section+']\r\n'
					for (const [key, value] of Object.entries(config_data[section])){
						if(defaults.config[section] !== undefined && defaults.config[section].hasOwnProperty(key)){
							config_string += key+'='+defaults.config[section][key]+"\r\n";
						}
						else{config_string += key+'='+value+"\r\n";}
					}
				}
				const utf16buffer = Buffer.from(`\ufeff${config_string}`, 'utf16le');
				fs.writeFileSync(config, utf16buffer);		
			});
			resolve();

		});
	},

	writeControlsFile:function(controls_data){
		var controls = process.env.APPDATA + settings.controls_file;
		var custom_controls = process.env.APPDATA + settings.custom_controls_file;
		return new Promise(function(resolve, reject){
			var backup = new Promise(function(resolve, reject){
				fs.copyFile(controls, controls +'.bak', function(){});
				resolve();
			});
			backup.then(function(){
				var output = '';
				output += controls_data.declaration + '\r\n\r\n';
				output += controls_data.root + '\r\n';
				output += '\t<Descr>' + controls_data.Descr + '</Descr>' + '\r\n';
				output += '\t<Filename>' + controls_data.Filename + '</Filename>' + '\r\n';
				for(section in controls_data.Sections){
					output += '\t<SimControls.Map>' + '\r\n';
					output += '\t\t<Name>' + section + '</Name>' + '\r\n';
					var section = controls_data.Sections[section];
					for(var count = 0; count <= section.length; count++){
						for(type in section[count]){
							output += '\t\t<'+type+'>' + '\r\n';
							for(setting in section[count][type]){
								output += '\t\t\t<'+setting+'>' + section[count][type][setting] + '</'+setting+'>\r\n';
							}
							output += '\t\t</'+type+'>' + '\r\n';
						}
					}
					output += '\t</SimControls.Map>' + '\r\n';
				}
				output += '</Simbase.Document>\r\n';
				fs.writeFile(custom_controls, "\ufeff" + output, function(){});
			});

			resolve();

		});
	},
	
}

//Export IO
module.exports = io;