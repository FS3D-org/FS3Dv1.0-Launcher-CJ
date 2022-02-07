/*--------------------------------------
		FS3D/Prepar3d Launcher
		----------------------

	Author: 	FS3D
	Version:	0.5
	Year:		2022

--------------------------------------*/
/*Imports*/
const electron = require('electron');
const url = require('url');
const path = require('path');
const settings = require('./js/settings.js');
const ui = require('./js/ui.js');
const menu = require('./js/menu.js');
const fs3d_functions = require('./js/fs3d.js');
const controls = require('./js/controls.js');
const io = require('./js/io.js');
const ipc = require('./js/ipc.js');

/*Electron setup*/
const {app, BrowserWindow, Menu, ipcMain} = electron;

/*Detached App Windows*/
let mainWindow;
let aboutServersWindow;
let aboutRolesWindow;
let aboutAircraftWindow;
let aboutControlsWindow;
let aboutGraphicsWindow;
let aboutFS3DWindow;

//Run when app is ready
app.on('ready', function(){

	splashWindow = new BrowserWindow({
		width:settings.width,
		height:settings.height,
		transparent:true,
		frame:false,
		alwaysOnTop:true
	});
	splashWindow.loadFile(path.join(__dirname, 'pages/splash.html'));
	splashWindow.center();

	//Initialize FS3D Data Objects
	fs3d_functions.init.then(function(data){
		if(settings.debug){console.log('Creating App Window...')};
		var fs3d = data;

		//Create App Window
		mainWindow = new BrowserWindow({
			width:settings.width,
			height:settings.height,
			show:false,
			webPreferences:{preload: path.join(app.getAppPath(), 'preload.js')},
			resizable:settings.resizable
		});
	
		//Load Start Page
		mainWindow.loadURL(url.format({
			pathname: path.join(__dirname, 'pages/' + settings.startpage),
			protocol:"file:",
			slashes: true
		}));
	
		//Quit App
		mainWindow.on('closed', function(){app.quit();});
	
		//If Debugging, Open Dev Tools
		if(settings.debug_mode){mainWindow.webContents.openDevTools();}
	
		//Enable Custom Menu
		if(settings.custom_menu){
			const mainMenu = Menu.buildFromTemplate(menu);
			Menu.setApplicationMenu(mainMenu);
		}

		splashWindow.close();
		mainWindow.show();
	
	});
		
});