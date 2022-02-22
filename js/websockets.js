/*--------------------------------------
		FS3D/Prepar3d Launcher
		----------------------

	Author: 	FS3D
	Version:	0.5
	Year:		2022

--------------------------------------*/
const {WebSocket} = require('ws');
const settings = require('./settings.js');
const websockets = {

	data:{
		connected:false;
	},

	init: function(){	

		const {WebSocket} = require('ws');
		const ws = new WebSocket(settings.vpn_server);

		ws.on('open', function open(response) {
			var initData = {
				"type":"p3d_ui_request",
				"UUID":fs3d.data.fs3d.uuid
			}
			ws.send(JSON.stringify(initData));
			console.log('response:'+response);
			websockets.data.connected = true;
		});
		ws.on('message', function message(data) {
			console.log('received: %s', data);
		});
	
	},

	connectionTest:function(response){
		if(websockets.data.connected){
			return true;
		}
		else{
			return false;
		}
	}
}

module.exports = websockets;