var maps_array = Array();
var divs_array = Array();
var map;
var currentLayer = null;
var data_obj;
var versionConfig = new Header3();

function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object

	// files is a FileList of File objects. List some properties.
	var output = [];
	for (var i = 0, f; f = files[i]; i++) {
		output.push('<li><strong>', i, ' </strong><strong>', escape(f.name),
				'</strong> (', f.type || 'n/a', ') - ', f.size,
				' bytes, last modified: ',
				f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString()
						: 'n/a', '</li>');

		/* Checking the files */
		// Check for the various File API support.
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			// Great success! All the File APIs are supported.
		} else {
			alert('The File APIs are not fully supported in this browser.');
		}
		if (!f) {
			alert("Failed to load file");
		} else {

			var reader = new FileReader();

			// Closure to capture the file information.
			reader.onload = (function(theFile) {
				return function(e) {
					var csv = event.target.result;
					/* Skipping first 3 lines */
					var line = 0
					for (var i = 0; i < 3; i++) {
						line = csv.search('\n');
						csv = csv.slice(line + 1);
					}
					data_obj = $.csv.toObjects(csv);

					var stringArray = Array();

					$(':checkbox:checked').each(function(i) {
						stringArray[i] = $(this).val();
					});

					// var s = createSerie(data_obj, "time",
					// ["temperature","gas1","gas2","voc","humidity","light","sound"]);
					createMapsArray(data_obj, stringArray);

				};

			})(files[0]);

			// Read in the image file as a data URL.
			reader.readAsText(files[0]);

		}
	}
	document.getElementById('list').innerHTML = '<ul>' + output.join('')
			+ '</ul>';
	// document.getElementByI('list').innerHTML = file[1].size;

}
document.getElementById('files').addEventListener('change', handleFileSelect,
		false);

function createMapsArray(csv_objs, yNamesArray) {
	var min, max;
	// initializing maps
	for (var j = 0; j < yNamesArray.length; j++) {
		maps_array[yNamesArray[j]] = new EcoMap();
		(maps_array[yNamesArray[j]]).setMap(map);
	}

	for (var j = 0; j < yNamesArray.length; j++) {
		min = max = parseFloat(csv_objs[0][yNamesArray[j]]);
		for (var i = 0; i < csv_objs.length; i++) {
			if ( parseFloat(csv_objs[i][yNamesArray[j]]) < min ) min = parseFloat(csv_objs[i][yNamesArray[j]]);
			if ( parseFloat(csv_objs[i][yNamesArray[j]]) > max ) max = parseFloat(csv_objs[i][yNamesArray[j]]);			
		}
		(maps_array[yNamesArray[j]]).setMIN(min);
		(maps_array[yNamesArray[j]]).setMAX(max);
	}

	for (var i = 0; i < csv_objs.length; i++) {
		for (var j = 0; j < yNamesArray.length; j++) {
			var circle = new Circle(parseFloat(csv_objs[i].Latitude),
					parseFloat(csv_objs[i].Longitude),
					parseFloat(csv_objs[i][yNamesArray[j]]),
					(maps_array[yNamesArray[j]]).getMIN(),
					(maps_array[yNamesArray[j]]).getMAX(),
					csv_objs[i]["Time"], null);
			maps_array[yNamesArray[j]].addCircle(circle);
		}
	}
}

function plotMaps(mapsArray) {

}

function clearPlots() {
	$("#container").empty();

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

$(document).ready(
		function addOptions() {
			var opts = versionConfig.optionsMap;
			for (var i = 0; i < opts.length; i++) {
				$('#options_container').append(
						'<label class="checkbox"> '
								+ '<input type="checkbox" value="' + opts[i][1]
								+ '" id="checkbox' + i + '"> ' + opts[i][0]
								+ '</label>');
				$('#button_radio_container')
						.append(
								'<button name="btn-toggle" class="btn" '
										+ ' value="' + opts[i][1] + '" >'
										+ opts[i][0] + '</button>');
			}
			$('button[name = "btn-toggle"]').click(function() {
				setRightLayer($(this).val());
			});
		});
