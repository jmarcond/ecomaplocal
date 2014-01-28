function createSerie(csv_objs, xName, yNamesArray) {
	var series = Array();
	for (var j = 0; j < yNamesArray.length; j++) {
		series[j] = {};
		series[j].serie = Array();
		series[j].title = yNamesArray[j].label;
	}

	for (var i = 0; i < csv_objs.length; i++) {
		for (j = 0; j < yNamesArray.length; j++) {
			series[j].serie.push([ parseFloat(csv_objs[i][xName]),
					parseFloat(csv_objs[i][yNamesArray[j].headerName]) ]);
		}
		
	}
	return series;
}

function plotCharts(series) {
	clearPlots();
	var divs_array = Array();
	var plots_array = Array();

	for (var i = 0; i < series.length; i++) {
		//		<div class="featurette">
		var hr = document.createElement("hr");
		hr.setAttribute("class", "featurette-divider");
		divs_array[i] = document.createElement("div");
		divs_array[i].setAttribute("class", "featurette");
		var chart_div = document.createElement("div");
		chart_div.setAttribute("style", "height:500px; width:100%;");
		chart_div.setAttribute("id", 'chart' + i);
		divs_array[i].appendChild(chart_div);
		
		document.getElementById("charts_div").appendChild(hr);

		document.getElementById("charts_div").appendChild(divs_array[i]);
		plots_array[i] = $.jqplot('chart' + i, [ series[i].serie ], {
			// Give the plot a title.
			title : series[i].title,
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
	$("#charts_div").empty();
}
