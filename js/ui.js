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
const {electron, dialog} = require('electron');
var ui = {

	//Functions dealing with windows
	windows:{
		
		//Build help windows (separate popups)
		helpWindow:function(windowName){
			newWindow = new BrowserWindow({
				width:480,
				height:480,
				title:"About"
			});
			const wmaps = {
				"aboutServersWindow":"about_servers.html",
				"aboutRolesWindow":"about_roles.html",
				"aboutAircraftWindow":"about_aircraft.html",
				"aboutControlsWindow":"about_controls.html",
				"aboutGraphicsWindow":"about_graphics.html",
				"aboutFS3DWindow":"about_fs3d.html",
			}
			newWindow.loadURL(url.format({
				pathname: path.join(__dirname, 'pages/', wmaps[windowName]),
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