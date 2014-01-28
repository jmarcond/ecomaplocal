

function showFiles(filesArray){
	var filesTable = new FilesTable(filesArray);
	filesTable.createTableView("files-table-div", false);
	$('#material_panel').show();
}
/*
 * Following functions handle file CRUD operations
 * making AJAX request to the server
 */
function saveFiles(filesArray){
	debugger;
	$
	.ajax({
		url : "./php/addOrEditFile.php",
		type : "POST",
		dataType : 'json',
		data : {
			filesArray: JSON.stringify(filesArray)
		},
		success : function(data, textStatus, jqXHR) {
			debugger;
			if (data.length > 0) {
				showFiles(createFilesArrrayFromServer(data));
				
			} else {
				//no files
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			debugger;
			// if fails
			console
					.log("Ops. Request to load files failed. Sorry about that.");
		}
	});
}

function addFiles(array) {
	
	var filesArray = [];
	for (var i = 0, f; f = array[i]; i++) {
		var newFile = new EcoFile();
		newFile.createFileFromUpload(f, $('#projectIdInput').val());
		filesArray.push(newFile);
	}
	saveFiles(filesArray);
}


function handleFileSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();

	var files = evt.dataTransfer.files; // FileList object.
	addFiles(files);
}

function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}


/*
 * Receives an instance of Project
 * and add view elements
 */
function loadProjectInfo(project){
	$('#projectIdInput').val(project.id);
	$('#nameInput').val(project.name);
	$('#notesInput').val(project.notes);
	$(
			'input:radio[name=privacyInput][value="'
					+ project.privacy + '"]')
			.prop('checked', true);
	
	showFiles(project.files);
	
}

/*
 * Get project information by Id from the server 
 */
function getCurrentProject(id){
	$
	.ajax({
		url : "./php/getProjectsByUser.php",
		type : "POST",
		dataType : 'json',
		data : "projectId=" + id,
		success : function(data, textStatus, jqXHR) {
			if(data.success){
				loadProjectInfo(data);
				$('#material_panel').show();
			}else alert('error');
		},
		error : function(jqXHR, textStatus, errorThrown) {
			// if fails
			console
					.log("Ops. Request to add or edit project failed. Sorry about that.");
		}
	});
}

/*
 * create a new or edit current project
 */
function saveOrEditProject(project){
	$
	.ajax({
		url : "./php/addOrEditProject.php",
		type : "POST",
		async : true,
		dataType : 'json',
		data : {project: project},
		success : function(data, textStatus, jqXHR) {
			debugger;
			loadProjectInfo(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			debugger;
			console
					.log("Ops. Request to add or edit project failed. Sorry about that.");
		}
	});	
}

/*
 * Handles 'save' form button
 */
$("#addOrEditForm")
.submit(
		function(e) {
			var project = new Project();
			project.createFromForm($('#projectIdInput').val(), $('#nameInput').val(), $('#notesInput').val(), $(
			'input:radio[name=privacyInput]:checked').val());
			saveOrEditProject(project);
			e.preventDefault(); 
		});

/*
 * main
 */
$(document).ready(function(){
	var project = {
			id : "",
			name : "Project One",
			notes : "Here is my notes, Enjoy!",
			privacy : "public",
			files : [
			         {
			        	 name: "dataone.xlsx",
			        	 addDate : "12/11/2013"
			         },
			         {
			        	 name: "datatwo.xlsx",
			        	 addDate : "12/11/2013"
			         },
			         {
			        	 name: "datathree.xlsx",
			        	 addDate : "12/11/2013"
			         }
			         ]
	}
	
	// Setup the drag and drop listeners.
	var dropZone = document.getElementById('drop_zone');
	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('drop', handleFileSelect, false);
	
	var projectId = $.urlParam('projectId');	
	if (projectId == "new" || projectId == undefined || projectId == -1) {
		
		
	}else{
		getCurrentProject(projectId);
		//projectIdInput
	}
	
});