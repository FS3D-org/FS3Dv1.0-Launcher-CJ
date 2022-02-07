/*--------------------------------------
		FS3D/Prepar3d Launcher
		----------------------

	Author: 	FS3D
	Version:	0.5
	Year:		2022

	NOTE: Please read the official
	docs on how ipcRenderer and contextBridge
	functionality works. In order for a display
	page to access variables in main.js, functions
	should be created below that provide access
	to internal functions. They should then
	be referenced in preload.js to make them
	available to the calling page.
--------------------------------------*/
const {ipcMain, dialog} = require('electron');
const fs3d_functions = require('./fs3d.js');
const ui = require('./ui.js');

//Show a dynamically-created warning window
ipcMain.handle('showWarning', async (event, options) => {
	ui.windows.showWarning(options);
});

//Set the state of a value on the persistent FS3D object
ipcMain.handle('setData', async (event, options) => {
	fs3d_functions.setData(options);
});
