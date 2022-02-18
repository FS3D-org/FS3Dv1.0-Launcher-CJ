/*--------------------------------------
		FS3D/Prepar3d Launcher
		----------------------

	Author: 	FS3D
	Version:	0.5
	Year:		2022

--------------------------------------*/
var ui = require('./ui.js');
const menuTemplate = [
	{
		label:'File',
		submenu:[
			{
				label: 'Use Last Config',
				accelerator: 'Ctrl+L',
				click(){}
			},		
			{
				label: 'Rescan Hardware',
				accelerator: 'Ctrl+S',
				click(){}
			},
			{
				label: 'Reset To Default',
				accelerator: 'Ctrl+D',
				click(){}
			},
			{
				label: 'Quit',
				accelerator: 'Ctrl+Q',
				click(){app.quit();}
			}			
		]
	},
	{
		label:'Help',
		submenu:[
			{
				label: 'About Servers',
				click(){ui.windows.helpWindow('about_server.html');}
			},
			{
				label: 'About Roles',
				click(){ui.windows.helpWindow('about_roles.html');}
			},
			{
				label: 'About Aircraft Config',
				click(){ui.windows.helpWindow('about_aircraft.html');}
			},			
			{
				label: 'About Controls',
				click(){ui.windows.helpWindow('about_controls.html');}
			},
			{
				label: 'About Graphics',
				click(){ui.windows.helpWindow('about_graphics.html');}
			},	
			{
				label: 'About FS3D',
				click(){ui.windows.helpWindow('about_fs3d.html');}
			},				
		]
	}	
];

//Export menu
module.exports = menuTemplate;