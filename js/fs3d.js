/*--------------------------------------
		FS3D/Prepar3d Launcher
		----------------------

	Author: 	FS3D
	Version:	0.5
	Year:		2022

--------------------------------------*/
const io = require('./io.js');
const url = require('url');
const path = require('path');
const fs = require('fs');

const fs3d = {
	settings:{
		host:{
			server:null,
			ip:null,
			port:null,
			scenario:null,
		},
		player:{
			name:null,
			callsign:null,
			role:null,
			aircraft:null
		}
	},
	data:{
		fs3d:null,
		p3d:null,
		controls:null
	},
	init:function(){
	
		//Create temp output docs
		
		//Load controls into memory
		fs3d.data.controls 	= io.getControlsFile();
		
		//Load existing P3D/FS3D settings into memory
		fs3d.data.p3d 		= io.getConfigFile();
		
	},
	
	setData:function(options){
		for(entry in options){
			entry = options[entry];
			this.settings[entry.setting][entry.target] = entry.value;
		}
		console.log(this);
	}
	
}

module.exports = fs3d;