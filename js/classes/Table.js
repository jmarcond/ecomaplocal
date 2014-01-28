/*
 * This function creates and Object
 * that represents a result Table used on searching
 * it receives an array of projects and creates
 * HTML necessary to generate the table
 */
function SearchTable(projectsList) {

	this.projectList = projectsList;

	this.removeProjectById = function(projectId) {

	};

	this.addProject = function(project) {

	}

	this.createTableView = function(divId) {

		var header = '<table class="table table-hover">' + '<thead>' + '<tr>'
				+ '<th>Project Name</th>' + '<th>Field</th>'
				+ '<th>Author</th>' + '<th>Views</th>' + '<th>Open</th>'
				+ '</tr>' + '</thead>';

		var body = '<tbody>';

		/*
		 * Adding rows
		 */
		for (var i = 0; i < this.projectList.length; i++) {
			var userName = "";
			if (parseInt(this.projectList[i].description.owner) <= 0
					|| parseInt(this.projectList[i].description.owner) >= 4)
				userName = allUsers[0].name;
			else
				userName = allUsers[parseInt(this.projectList[i].description.owner) - 1].name;

			body += '<tr>'
					+ '<td>'
					+ this.projectList[i].description.name
					+ '</td>'
					+ '<td>'
					+ this.projectList[i].topic
					+ '</td>'
					+ '<th>'
					+ userName
					+ '</th>'
					+ '<td>'
					+ Math.round(Math.random() * 1000)
					+ '</td>'
					+
					// '<td><a href="#"><span class="glyphicon
					// glyphicon-trash"></span></a></td>'+
					'<td><a href="./viewproject.html?projectId='
					+ this.projectList[i].id
					+ '&userId='
					+ currentUser.id
					+ '"><span class="glyphicon glyphicon-folder-open"></span></a></td>'
					+ '</tr>';
		}
		body += '</tbody>';
		console.log(header + body + '</table>');
		$("#" + divId).html(header + body + '</table>');
	};

}

/*
 * This function creates and Object that represents a files Table used on
 * editing projects It receives an array of files and creates HTML necessary to
 * generate the table
 */
function FilesTable(fileList, isView) {

	this.filesList = fileList;
	this.isView = isView;
	this.deleteFile = function(fileId) {
		alert("deleting" + fileId);
	}

	this.createTableView = function(divId) {
		var delstr = (this.isView) ? '' : '<th>Delete</th>';
		var delstr2 = (this.isView) ? ''
				: '<td><a href="#" onclick = "this.deleteFile" ><span class="glyphicon glyphicon-trash"></span></a></td>';

		var header = '<table class="table table-hover">' + '<thead>' + '<tr>'
				+ '<th>File Name</th>' + '<th>Add Date</th>'
				+ '<th>Download</th>' + delstr + '</tr>' + '</thead>';

		var body = '<tbody>';

		/*
		 * Adding rows
		 */
		for (var i = 0; i < this.filesList.length; i++) {

			body += '<tr>'
					+ '<td>'
					+ this.filesList[i].name
					+ '</td>'
					+ '<td> '
					+ this.filesList[i].addDate
					+ '</td>'
					+ '<td><a href="#"><span class="glyphicon glyphicon-download"></span></a></td>'
					+ '<td><a href="#"><span class="glyphicon glyphicon-trash"></span></a></td>'
					+ '</tr>';
		}
		body += '</tbody>';
		console.log(header + body + '</table>');
		$("#" + divId).html(header + body + '</table>');
	};

}
