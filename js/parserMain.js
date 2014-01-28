//var configSetup = new ConfigSetup();
var csvSetup = new CSVSetup();

/*
 * Global File Variables
 */
var FILES; // FileList object
var F;
var READER = new FileReader();
var CSV_STRING;

function cleanVars(){
	/*
	 * Reseting variable for next plots
	 */
	FILES = [];
	F = {};
	CSV_STRING = "";
	$('#skip_value').val("");
	
}


function addOptions(stringArray) {
	var opts = stringArray;
	$('#button_radio_container').empty();
	for (var i = 0; i < opts.length; i++) {
		$('#button_radio_container').append(
				'<button name="btn-toggle" class="btn" ' + ' value="'
						+ opts[i].headerName + '" >' + opts[i].label
						+ '</button>');
	}
	$('button[name = "btn-toggle"]').click(function() {
		setRightLayer($(this).val());
	});
}

function plotBtn() {
	
	/*
	 * Parsing File
	 */
	var skip = parseInt($('#skip_value').val());
	if(isNaN(skip)) data_obj = $.csv.toObjects(CSV_STRING, 1); 
	else data_obj = $.csv.toObjects(CSV_STRING, parseInt(skip));
	
	/*
	 * Getting Array to show
	 */
	var stringArray = Array();
	$(':checkbox:checked').each(function(i) {
		stringArray[i] = {
			headerName : $(this).val(),
			label : $(this).parent().text()
		};
	});

	/*
	 * add map options buttons
	 */
	addOptions(stringArray);

	/*
	 * Creating Maps and Charts
	 */
	debugger;
	createMapsArray(data_obj, stringArray);
	var s = createSerie(data_obj, "Time", stringArray);

	plotCharts(s);

	cleanVars();
	$("#optionsModal").modal('hide');
}

function generateSelectFieldsByConfig(config, modalDivId) {
	var selectFields = config.selectableFields;
	$('#' + modalDivId).empty();
	for (var i = 0; i < selectFields.length; i++) {
		$('#' + modalDivId).append(
				'<label class="checkbox"> ' + '<input type="checkbox" value="'
						+ selectFields[i].headerName + '" id="checkbox' + i
						+ '">' + selectFields[i].label + '</label>');
	}
}


function handleFileSelect(evt) {
	FILES = evt.target.files; // FileList object
	F = FILES[0];
	/* Checking the files */
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		// Great success! All the File APIs are supported.
	} else {
		alert('The File APIs are not fully supported in this browser.');
	}
	if (!F || F.size > 10485760) {
		alert("Failed to load file");
	} else {
		/*
		 * Setting reader and callback
		 */

		// Closure to capture the file information.
		READER.onload = (function(theFile) {
			return function(e) {
				CSV_STRING = event.target.result;
				var line;
				/*
				 * Removing Comments
				 */
				while(CSV_STRING[0][0] == '#'){
					line = CSV_STRING.search('\n');
					CSV_STRING = CSV_STRING.slice(line + 1);
				}
				
				/* getting first line for config setup identification */
				line = CSV_STRING.search('\n');
				line = CSV_STRING.slice(0, line + 1);
				var versionId = csvSetup.getVersionFromLine(line);
				var config = csvSetup.getConfigById(parseInt(versionId));

				generateSelectFieldsByConfig(config, "options_container");
				CSV_STRING = config.getHeaderString().concat(CSV_STRING);

				if (event.total > 5242880) {
					$('#bigFileModal').modal('show');
				} else {
					$("#optionsModal").modal('show');
				}
			};

		})(FILES[0]);

		READER.readAsText(FILES[0]);

	}
}

// document.getElementByI('list').innerHTML = file[1].size;

document.getElementById('files').addEventListener('change', handleFileSelect,
		false);