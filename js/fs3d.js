/*--------------------------------------
		FS3D/Prepar3d Launcher
		----------------------

	Author: 	FS3D
	Version:	0.5
	Year:		2022

--------------------------------------*/
const settings = require('./settings.js');
const io = require('./io.js');
const url = require('url');
const path = require('path');
const fs = require('fs');
const profiler = require('./profiler.js');

const fs3d_functions = {

	fs3d:null,

	//Initialize the persistent FS3D object with default and
	//preloaded values
	init:new Promise(function(resolve, reject){
		if(settings.debug){console.log('Running FS3D Init...')};
		var data = {
			settings:{
				host:{server:null,ip:null,port:null,scenario:null,},
				player:{name:null,callsign:null,role:null,aircraft:null}
			},
			data:{fs3d:null,p3d:null,controls:null},
			system:{cpu:null,memory:null,graphics:null,os:null}
		}
		Promise.all([io.getControlsFile, io.getConfigFile, profiler.init]).then((values) => {
			data.controls = values[0];
			data.p3d = values[1];
			data.system = values[2];
			this.fs3d = data;
			resolve(this.fs3d);
		});
	}),
	
	//Set the value of a property on the persistent FS3D object
	setData:function(options){
		var output = {settings:null};
		for(entry in options){
			if(settings.debug){console.log('Set data "'+entry+'" to '+options[entry])};
			entry = options[entry];
			this.fs3d.settings[entry.setting][entry.target] = entry.value;
		}
	}
	
}

module.exports = fs3d_functions;