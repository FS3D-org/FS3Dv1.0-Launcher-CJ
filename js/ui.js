/*--------------------------------------
		FS3D/Prepar3d Launcher
		----------------------

	Author: 	FS3D
	Version:	0.5
	Year:		2022

	NOTE: This module provides functions
	for building windows, dealing with alerts,
	and so on. Most UI functionality should 
	be defined here for consistency.
--------------------------------------*/
const {electron, BrowserWindow, dialog} = require('electron');
const url = require('url');
const path = require('path');
var ui = {

	//Functions dealing with windows
	windows:{
		
		//Build help windows (separate popups)
		helpWindow:function(window_file){
			newWindow = new BrowserWindow({
				width:480,
				height:480,
				title:"About"
			});
			newWindow.loadURL(url.format({
				pathname: path.join(__dirname, 'pages/', window_file),
				protocol:"file:",
				slashes: true
			}));
			newWindow.on('close', function(){
				newWindow = null;
			});	
		},
		
		//Build popup warning.
		showWarning: function(options){
			dialog.showMessageBox({
				type: 'none',
				buttons: [],
				defaultId: 0,
				icon: '',
				title: options.title,
				message: options.message,
				detail: '',
				noLink: false,
				normalizeAccessKeys: false,
			});
		}
	},

}

//Export ui
module.exports = ui;