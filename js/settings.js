/*--------------------------------------
		FS3D/Prepar3d Launcher
		----------------------

	Author: 	FS3D
	Version:	0.5
	Year:		2022

	NOTE: This is the main settings file
	for the launcher. Anything that can be
	changed here should NOT be changed 
	elsewhere, as much of the functionality
	depends on the settings object being
	imported before anything else is.

--------------------------------------*/
const settings = {
	version:'0.1',
	controls_file:'/Lockheed Martin/Prepar3D v4/Controls/Standard.xml',
	custom_controls_file:'/Lockheed Martin/Prepar3D v4/Controls/Custom.xml',
	config_file:'/Lockheed Martin/Prepar3D v4/Prepar3D.cfg',
	debug: true,
	custom_menu: true,
	width:560,
	height:800,
	resizable:true,
	startpage:'scenario.html'
}

//Export settings
module.exports = settings;