/*--------------------------------------
		FS3D/Prepar3d Launcher
		----------------------

	Author: 	FS3D
	Version:	0.5
	Year:		2022

--------------------------------------*/
const settings = require('./settings.js');
const fs = require('fs');
const {WebSocket} = require('ws');

const websockets = {

	init: function(){	

		const ws = new WebSocket(settings.remote_server);

		ws.on('open', function() {
			var initData = {
				"type":"P3D_UI",
				"UUID":program.data.fs3d.uuid
			}
			ws.send(JSON.stringify(initData));

		});

		ws.on('message', function message(data){
			var result = JSON.parse(data);
			console.log(result);
			if(result.type == 'aircraft_list'){
				var aircraft = [];
				result.data.forEach((craft) => {
					var details = {};
					details.aircraft_type = craft[1],
					details.category = craft[2],
					details.name = craft[3],
					details.p3d_title = craft[4],
					details.empty_weight_lbs = craft[5],
					details.max_takeoff_weight_lbs = craft[6],
					details.agent_type = craft[7],
					details.agent_capacity_gals = craft[8],
					details.agent_capacity_lbs = craft[9],
					details.fuel_left_capacity_lbs = craft[10],
					details.fuel_center_capacity_lbs = craft[11],
					details.fuel_right_capacity_lbs = craft[12],
					details.fuel_left_outer_capacity_lbs = craft[13],
					details.fuel_left_inner_capacity_lbs = craft[14],
					details.fuel_left_aux_capacity_lbs = craft[15],
					details.fuel_right_outer_capacity_lbs = craft[16],
					details.fuel_right_inner_capacity_lbs = craft[17],
					details.fuel_right_aux_capacity_lbs = craft[18],
					details.fuel_left_external_capacity_gals = craft[19],
					details.fuel_right_external_capacity_gals = craft[20]
					aircraft.push(details);
				});
				program.data.fs3d.aircraft = aircraft;			
			}
			else if(result.type == 'waypoints'){
				var waypoints = [];
				result.waypoints.forEach((point) => {
					var waypoint = {
						scenario_id:point[1],
						scenario_type:point[2],
						id:point[3],
						description:point[4],
						lat_n_s:point[5],
						lat_deg:point[6],
						lat_min:point[7],
						lat_sec:point[8],
						lon_e_w:point[9],
						lon_deg:point[10],
						lon_min:point[11],
						lon_sec:point[12],
						alt_ft:point[13],
						is_departure:point[14],
						is_destination:point[15]					
					};
					waypoints.push(waypoint);
				});
				program.data.fs3d.scenarios = result.scenario_name;
				program.data.fs3d.departure_icao = result.departure_icao;
				program.data.fs3d.waypoints = waypoints;	
				console.log(program.data.fs3d);
			}
			else if(result.type == 'weather'){
				var weather = {
					temp_f:result.temp_f,
					wind_speed_kts:result.wind_speed_kts,
					wind_gust_kts:result.wind_gust_kts,
					wind_dir_deg:result.wind_dir_deg,
					time:result.time,
					visibility_sm:result.visibility_sm,
					field_elevation_ft:result.field_elevation_ft[0][0]
				};
				program.data.fs3d.weather = weather;
			}
		});
		
		ws.on('error', (error) => {
		  console.log(error);
		})
	
	}
}

module.exports = websockets;