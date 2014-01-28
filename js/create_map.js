var maps_array = Array();
var divs_array = Array();
var map;
var currentLayer = null;
var data_obj;

var NOGPS = "!!!NO-GPS!!!";

function createMapsArray(csv_objs, yNamesArray) {
	var min, max;
	// initializing maps
	for (var j = 0; j < yNamesArray.length; j++) {
		maps_array[yNamesArray[j].headerName] = new EcoMap();
		(maps_array[yNamesArray[j].headerName]).setMap(map);
	}

	for (var j = 0; j < yNamesArray.length; j++) {
		min = max = parseFloat(csv_objs[0][yNamesArray[j].headerName]);
		for (var i = 0; i < csv_objs.length; i++) {
			if ( parseFloat(csv_objs[i][yNamesArray[j].headerName]) < min ) min = parseFloat(csv_objs[i][yNamesArray[j].headerName]);
			if ( parseFloat(csv_objs[i][yNamesArray[j]]) > max ) max = parseFloat(csv_objs[i][yNamesArray[j].headerName]);			
		}
		(maps_array[yNamesArray[j].headerName]).setMIN(min);
		(maps_array[yNamesArray[j].headerName]).setMAX(max);
	}

	for (var i = 0; i < csv_objs.length; i++) {
		for (var j = 0; j < yNamesArray.length; j++) {
			
			/*Checking if there is GPS*/
			if (csv_objs[i].Latitude != NOGPS && csv_objs[i].Longitude != NOGPS){
				var circle = new Circle(parseFloat(csv_objs[i].Latitude),
						parseFloat(csv_objs[i].Longitude),
						parseFloat(csv_objs[i][yNamesArray[j].headerName]),
						(maps_array[yNamesArray[j].headerName]).getMIN(),
						(maps_array[yNamesArray[j].headerName]).getMAX(),
						csv_objs[i]["Time"], null);
				maps_array[yNamesArray[j].headerName].addCircle(circle);			
			}
		}
	}
}

function plotMaps(mapsArray) {

}

function initialize() {
	var mapOptions = {
		/*
		 * Centering map at Central Square Lat: 42.363419 Long: -71.089869
		 */
		center : new google.maps.LatLng(42.363419, -71.089869),
		zoom : 15,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map0"), mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);

function setRightLayer(newLayer) {
	if (currentLayer != null) {
		for (circle in maps_array[currentLayer].getCircles()) {
			maps_array[currentLayer].getCircles()[circle].circle.setMap(null);
		}
	}
	for (circle in maps_array[newLayer].getCircles()) {
		maps_array[newLayer].getCircles()[circle].circle.setMap(map);
	}
	currentLayer = newLayer;
}


