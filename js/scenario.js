/*--------------------------------------
		FS3D/Prepar3d Launcher
		----------------------

	Author: 	FS3D
	Version:	0.5
	Year:		2022

--------------------------------------*/
window.FS3D.getData('settings').then(function(result){

	//Get all base data
	var fs3d_settings = result;
	var server = document.getElementById("server");
	var ip = document.getElementById("ip");
	var port = document.getElementById("port");
	var scenario = document.getElementById("scenario");
	var name = document.getElementById("name");
	var callsign = document.getElementById("callsign");
	var role = document.getElementById("role");
	var aircraft = document.getElementById("aircraft");
	var launch = document.getElementById("launch_button");
	
	//Load saved data if exists
	for(setting in fs3d_settings){
		for(field in fs3d_settings[setting]){
			if(fs3d_settings[setting][field] !== null){
				target = document.getElementById(field);
				target.value = fs3d_settings[setting][field];
				if(field === 'server' && fs3d_settings[setting][field] !== null){
					server.classList.add('input_cleared');
				}
				if(field === 'scenario' && fs3d_settings[setting][field] !== null){
					scenario.disabled = false;
					scenario.classList.add('input_cleared');
				}
			}
		}
	}

	function updateFields(enable, disable=[]){
		for(field in enable){
			enable[field].classList.remove("input_cleared");
			enable[field].classList.add("input_enabled");
			enable[field].disabled = false;
		}
		for(field in disable){
			if(disable[field].nodeName === 'SELECT'){
				disable[field].selectedIndex = 0;
			}
			disable[field].disabled = true;
			disable[field].classList.remove("input_cleared");				
			disable[field].classList.remove("input_enabled");				
		}			
	}

	/*Enable player options - this is run after every field change
	  to validate that all server options have been filled out before
	  enabling the player section*/
	function enablePlayerSettings(){

		//Check that all required server fields have been completed first
		var server_choice = server.options[server.selectedIndex].text;
		if(ip.value !== '' && port.value !== '' && server_choice !== 'Please Choose A Scenario'){

			//Enable player fields
			var enable = [name, callsign, role, aircraft];
			updateFields(enable);			
		}
		
		//Otherwise revert to disable
		else{

			//Disable player fields
			var enable = [];
			var disable = [name, callsign, role, aircraft];
			updateFields(enable, disable);
		}
		
	}
	
	function enableLaunch(){

		//Check that all required player fields have been completed first
		if(name.value !== '' && callsign.value !== '' && role.value !== 'Please Choose An Option' && aircraft.value !== 'Please Choose An Option'){
			
			launch.classList.remove('launch_disabled');
			launch.classList.add('launch_enabled');

		}
		
	}	

	/*Handle server selection and subsequent server fields state*/
	server.addEventListener('change', () => {
		var server_choice = server.options[server.selectedIndex].text;
		switch(server_choice){
			case "Please Select A Server":
				window.FS3D.setData([
					{setting:'host', target:'server', value:null},
					{setting:'host', target:'ip', value:null},
					{setting:'host', target:'port', value:null},
					{setting:'host', target:'scenario', value:null},
					{setting:'player', target:'name', value:null},
					{setting:'player', target:'callsign', value:null},
					{setting:'player', target:'role', value:null},
					{setting:'player', target:'aircraft', value:null}
				]);			
				ip.value = '';
				port.value = '';
				name.value = '';
				callsign.value = '';
				scenario.selectedIndex = 0;				
				var enable = [server];
				var disable = [ip, port, scenario, name, callsign, role, aircraft];
				updateFields(enable, disable);
			break;
			case "Localhost":
				window.FS3D.setData([
					{setting:'host', target:'server', value:'Localhost'},
					{setting:'host', target:'ip', value:'localhost'},
					{setting:'host', target:'port', value:null},
					{setting:'host', target:'scenario', value:null},
					{setting:'player', target:'name', value:null},
					{setting:'player', target:'callsign', value:null},
					{setting:'player', target:'role', value:null},
					{setting:'player', target:'aircraft', value:null}
				]);		
				ip.value = 'localhost';
				port.value = '';
				scenario.selectedIndex = 0;				
				var enable = [server, port, scenario];
				var disable = [ip, name, callsign, role, aircraft];
				updateFields(enable, disable);			
			break;
			case "FS3D Official Server":
				window.FS3D.setData([
					{setting:'host', target:'server', value:'FS3D Official Server'},
					{setting:'host', target:'ip', value:'fs-3d.net'},
					{setting:'host', target:'port', value:'1194'},
					{setting:'host', target:'scenario', value:null},
					{setting:'player', target:'name', value:null},
					{setting:'player', target:'callsign', value:null},
					{setting:'player', target:'role', value:null},
					{setting:'player', target:'aircraft', value:null}					
				]);			
				ip.value="fs-3d.net";
				port.value="1194";
				scenario.selectedIndex = 0;
				var enable = [server, scenario];
				var disable = [ip, port, name, callsign, role, aircraft];
				updateFields(enable, disable);				
			break;		
			case "Custom":
				window.FS3D.setData([
					{setting:'host', target:'server', value:'Custom'},
					{setting:'host', target:'ip', value:null},
					{setting:'host', target:'port', value:null},
					{setting:'host', target:'scenario', value:null},
					{setting:'player', target:'name', value:null},
					{setting:'player', target:'callsign', value:null},
					{setting:'player', target:'role', value:null},
					{setting:'player', target:'aircraft', value:null}					
				]);				
				ip.value = '';
				port.value = '';
				scenario.selectedIndex = 0;
				var enable = [server, ip, port, scenario];
				var disable = [name, callsign, role, aircraft];
				updateFields(enable, disable);				
			break;
		}
		if(server.value !== 'Please Select A Server' && server.value !== ''){
			server.classList.remove("input_enable");
			server.classList.add("input_cleared");
		}		
	});

	ip.addEventListener('focusout', () => {
		if(ip.value !== ''){
			window.FS3D.setData([{setting:'host', target:'ip', value:ip.value}]);				
			ip.classList.add("input_cleared");	
			enablePlayerSettings();	
		}
	});

	port.addEventListener('focusout', () => {
		if(port.value !== ''){
			window.FS3D.setData([{setting:'host', target:'port', value:port.value}]);					
			port.classList.add("input_cleared");
			enablePlayerSettings();
		}
	});
	scenario.addEventListener('change', () => {
		if(scenario.value !== 'Please Choose A Scenario' && scenario.value !== ''){
			window.FS3D.setData([{setting:'host', target:'scenario', value:scenario.value}]);				
			scenario.classList.remove("input_enable");
			scenario.classList.add("input_cleared");
			enablePlayerSettings();
		}
	});

	name.addEventListener('focusout', () => {
		if(name.value !== ''){
			window.FS3D.setData([{setting:'player', target:'name', value:name.value}]);	
			name.classList.remove("input_enabled");
			name.classList.add("input_cleared");
		}
		enableLaunch();
	});
	
	callsign.addEventListener('focusout', () => {
		if(callsign.value !== ''){
			window.FS3D.setData([{setting:'player', target:'callsign', value:callsign.value}]);	
			callsign.classList.remove("input_enabled");
			callsign.classList.add("input_cleared");
		}
		enableLaunch();
	});	

	role.addEventListener('change', () => {
		if(role.value == 'Observer'){
			var warningOptions = {
				title:'Observer Mode',
				message:'In observer mode, you will be invisible to other players and unable to suppress fire'
			};
			window.FS3D.showWarning(warningOptions);
		}
		if(role.value !== 'Please Choose An Option' && role.value !== ''){
			role.classList.remove("input_enable");
			role.classList.add("input_cleared");
		}
		else{
			role.value = null;
		}
		window.FS3D.setData([{setting:'player', target:'role', value:role.value}]);	
		enableLaunch();		
	});
	
	aircraft.addEventListener('change', () => {
		if(aircraft.value !== 'Please Choose An Option' && aircraft.value !== ''){
			window.FS3D.setData([{setting:'player', target:'aircraft', value:aircraft.value}]);	
			aircraft.classList.remove("input_enable");
			aircraft.classList.add("input_cleared");
		}
		enableLaunch();		
	});	

});