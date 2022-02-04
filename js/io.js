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
const xml2js = require('xml2js');
const js2xmlparser = require('js2xmlparser');
const io = {
	
	//Get %APPDATA%/Roaming/Lockheed Martin/Prepar3d v4/Controls/Standard.xml
	getControlsFile: function(){
		var control_object;
		var controls_xml = fs.readFileSync(process.env.APPDATA + settings.controls_file,{encoding:'utf8'});		
		var parser = new xml2js.Parser();
		parser.parseString(controls_xml, function(err, result){
			control_object = result;
		});
		return control_object;
	},

	//Get %APPDATA%/Roaming/Lockheed Martin/Prepar3d v4/Prepar3d.cfg file		
	getConfigFile: function(){
		var config_object = {};
		var config_rows = fs.readFileSync(process.env.APPDATA + settings.config_file,{encoding:'utf16le'}).split("\n");
		var current_section = '';
		for(var i = 1; i < config_rows.length; i++){
			if(config_rows[i].charAt(0) == '['){
				var section_name = config_rows[i].replace(/[\[\]']+/g,'');
				config_object[section_name] = {};
				current_section = section_name;
			}
			else if(config_rows[i].charAt(0) == ''){/*This skips empty lines*/}
			else{
				var setting = config_rows[i].split("=");
				var property = setting[0];
				var value = setting[1];
				config_object[current_section][property] = value;
			}
		}
		return config_object;
	},
	
	//Write %APPDATA%/Roaming/Lockheed Martin/Prepar3d v4/Prepar3d.cfg file		
	writeConfigFile: function(source){
		var path = process.env.APPDATA + settings.config_file;
		if(fs.existsSync(path)){fs.unlinkSync(path);}
		for(section in source){
			fs.writeFileSync(path, '['+section+']\n', {flag: 'a+', encoding:'utf16le'});
			for(property in source[section]){
				fs.writeFileSync(path, property+"="+source[section][property]+'\n', {flag: 'a+', encoding:'utf16le'});
			}
		}
	},	
	
	
	
	
	
	writeControlsFile: function(source, type){
		file = null;
		if(type == 'json'){
			source = JSON.stringify(source);
			file = 'Controls.json';
		}
		else{
			file = 'Custom.xml';
			source = js2xmlparser.parse("Root", source);
		}
		fs.writeFileSync('./files/'+file, JSON.stringify(source), {flag: 'a+'});
	}
	
}

module.exports = io;