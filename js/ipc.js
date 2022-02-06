const {ipcMain, dialog} = require('electron');
const fs3d_functions = require('./fs3d.js');
const ui = require('./ui.js');

ipcMain.handle('showWarning', async (event, options) => {
	ui.windows.showWarning(options);
});

ipcMain.handle('setData', async (event, options) => {
	fs3d_functions.setData(options);
});
