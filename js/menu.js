/*--------------------------------------
		FS3D/Prepar3d Launcher
		----------------------

	Author: 	FS3D
	Version:	0.5
	Year:		2022

--------------------------------------*/
const menuTemplate = [
	{
		label:'File',
		submenu:[
			{
				label: 'Use Last Config',
				accelerator: 'Ctrl+L',
				click(){
					
				}
			},		
			{
				label: 'Find Servers',
				accelerator: 'Ctrl+S',
				click(){
					
				}
			},
			{
				label: 'Reset To Default',
				accelerator: 'Ctrl+D',
				click(){
					
				}
			},
			{
				label: 'Quit',
				accelerator: 'Ctrl+Q',
				click(){
					app.quit();
				}
			}			
		]
	},
	{
		label:'Help',
		submenu:[
			{
				label: 'About Servers',
				click(){createHelpWindow('aboutServersWindow');}
			},
			{
				label: 'About Roles',
				click(){createHelpWindow('aboutRolesWindow');}
			},
			{
				label: 'About Aircraft Config',
				click(){createHelpWindow('aboutAircraftWindow');}
			},			
			{
				label: 'About Controls',
				click(){createHelpWindow('aboutControlsWindow');}
			},
			{
				label: 'About Graphics',
				click(){createHelpWindow('aboutGraphicsWindow');}
			},	
			{
				label: 'About FS3D',
				click(){createHelpWindow('aboutFS3DWindow');}
			},				
		]
	}	
];
	
module.exports = menuTemplate;