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

					var data_obj = $.csv.toObjects(csv);

					var stringArray = Array();

					$(':checkbox:checked').each(function(i) {
						stringArray[i] = $(this).val();
					});
					// var s = createSerie(data_obj, "time",
					// ["temperature","gas1","gas2","voc","humidity","light","sound"]);
					var s = createSerie(data_obj, "Time", stringArray);
					plotCharts(s);

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

function createSerie(csv_objs, xName, yNamesArray) {
	var series = Array();
	for (var j = 0; j < yNamesArray.length; j++) {
		series[j] = Array();
		series[j].title = yNamesArray[j];
	}

	for (var i = 0; i < csv_objs.length; i++) {
		for (j = 0; j < yNamesArray.length; j++) {
			series[j].push([ parseFloat(csv_objs[i][xName]),
					parseFloat(csv_objs[i][yNamesArray[j]]) ]);
		}
		
	}
	return series;
}

function plotCharts(series) {
	clearPlots();
	var divs_array = Array();
	var plots_array = Array();

	for (var i = 0; i < series.length; i++) {
		divs_array[i] = document.createElement("div");
		divs_array[i].setAttribute("style", "height:500px; width:1000px;");
		divs_array[i].setAttribute("id", 'chart' + i);
		document.getElementById("container").appendChild(divs_array[i]);
		plots_array[i] = $.jqplot('chart' + i, [ series[i] ], {
			// Give the plot a title.
			title : versionConfig.getOptionByHeader(series[i].title),
		      cursor:{ 
		          show: true,
		          zoom:true, 
		          showTooltip:false
		        },
			highlighter: {
		        show: true,
		        sizeAdjust: 7.5
		      },
		      axes: {
		            xaxis: {
		                renderer: $.jqplot.DateAxisRenderer,
		                tickRenderer: $.jqplot.CanvasAxisTickRenderer,
		                tickOptions: {
		                    formatString: '%m/%d/%Y %H:%M:%S',
		                    angle: -60
		                }
		            }
		      }
		// You can specify options for all axes on the plot at once with
		// the axesDefaults object. Here, we're using a canvas renderer
		// to draw the axis label which allows rotated text.
		});

	}
}

function clearPlots() {
	$("#container").empty();
}

$( document ).ready(function addOptions() {
	var opts = versionConfig.optionsMap;
	for (var i = 0; i < opts.length; i++) {
		$('#options_container')
				.append(
						'<label class="checkbox"> '+
						'<input type="checkbox" value="'+opts[i][1]+'" id="checkbox'+i+'"> '+
						opts[i][0] +'</label>');
	}
});

