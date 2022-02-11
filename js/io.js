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
	getControlsFile: new Promise(function(resolve, reject){
		if(settings.debug){console.log('Loading Standard Controls...')};
		var control_object;
		var controls_xml = fs.readFileSync(process.env.APPDATA + settings.controls_file,{encoding:'utf8'});		
		var parser = new xml2js.Parser();
		parser.parseString(controls_xml, function(err, result){
			control_object = result;
		});
		resolve(control_object);
	}),

	//Get %APPDATA%/Roaming/Lockheed Martin/Prepar3d v4/Prepar3d.cfg file		
	getConfigFile: new Promise(function(resolve, reject){
		if(settings.debug){console.log('Loading Prepar3d.cfg...')};
		var config_object = {};
		var config_rows = fs.readFileSync(process.env.APPDATA + settings.config_file,{encoding:'utf16le'}).split("\n");
		var current_section = '';
		console.log(config_rows);
		for(var i = 1; i < config_rows.length; i++){ //Start with 1 to skip the funky first row encoding
			if(config_rows[i].charAt(0) == ''){/*This skips empty lines*/}			
			else if(config_rows[i].charAt(0) == '['){
				var section_name = config_rows[i].replace(/[\[\]']+/g,'');
				config_object[section_name] = {};
				current_section = section_name;
			}
			else{
				var setting = config_rows[i].split("=");
				var property = setting[0];
				var value = setting[1];
				config_object[current_section][property] = value;
			}
		}
		resolve(config_object);
	})
	
}

//Export IO
module.exports = io;