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
const websockets = require('./websockets.js');
const {v4: uuidv4} = require('uuid');

const program_functions = {

	program:null,

	//Initialize the persistent FS3D object with default and
	//preloaded values
	init:new Promise(function(resolve, reject){
		if(settings.debug){console.log('Running FS3D Init...')};
		var result = {
			settings:{
				host:{server:null,ip:null,port:null,scenario:null,},
				player:{name:null,callsign:null,role:null,aircraft:null}
			},
			data:{
				fs3d:{
					uuid:null,
					scenarios:null,
					aircraft:null,
					players:null,
					flightplan:null,
					weather:null
				},
				p3d:null,
				controls:null
			},
			system:{cpu:null,memory:null,graphics:null,os:null}
		}
		Promise.all([io.getControlsFile, io.getConfigFile, profiler.init]).then((values) => {
			result.data.controls = values[0];
			result.data.p3d = values[1];
			result.system = values[2];
			result.data.fs3d.uuid = uuidv4();
			this.program = result;
			resolve(this.program);
		});
	})	
}

module.exports = program_functions;