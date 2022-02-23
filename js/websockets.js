/*--------------------------------------
		FS3D/Prepar3d Launcher
		----------------------

	Author: 	FS3D
	Version:	0.5
	Year:		2022

--------------------------------------*/
const settings = require('./settings.js');

const websockets = {

	init: function(){	

		const {WebSocket} = require('ws');
		const ws = new WebSocket(settings.remote_server);

		ws.on('open', function() {
			var initData = {
				"type":"P3D_UI",
				"UUID":fs3d.data.fs3d.uuid
			}
			ws.send(JSON.stringify(initData));

		});

		ws.on('message', function message(data) {
			switch(data.type){

				//Get aircraft data at loading
				case 'aircraft_list':
					fs3d.

				break;


			}



		});
		
		ws.on('error', (error) => {
		  console.log(error);
		})
	
	}
}

module.exports = websockets;