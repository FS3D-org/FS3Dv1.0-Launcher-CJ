const {ipcMain, dialog} = require('electron');
const fs3d = require('./fs3d.js');
const ui = require('./ui.js');

ipcMain.handle('getData', async (event, source) => {
	return fs3d[source];
});


ipcMain.handle('showWarning', async (event, options) => {
	ui.windows.showWarning(options);
});

ipcMain.handle('setData', async (event, options) => {
	fs3d.setData(options);
});
