/*
 * Class to handle project's file objects
 * 
 * Properties:
 * 		id: string,
 * 		name: string,
 * 		notes: string,
 * 		addDate: string,
 * 		projectId: string
 * 
 * Methods:
 * 		File,
 * 		createFileFromServer,
 * 		createFromUpload
 */

/*
 * Auxiliary function to create an array from 
 * JSON files array passed from the server
 */
function createFilesArrrayFromServer(array){
	var filesArray = [];
	
	for (var i=0; i<array.length; i++ ){
		var newFile = new File;
		newFile.createFileFromServer(array[i]);
		filesArray.push(newFile);
	}
	return filesArray;
}


/*
 * Constructor
 */
function EcoFile(){
	this.id = "";
	this.name = "";
	this.addDate = "";
	this.projectId = "";
	this.blob = "";
	
	
	/*
	 * Creates a file instance from a dropped file
	 * 
	 */
	this.createFileFromUpload = function(f, projectId){
		if (f != undefined){
			this.id = "";
			this.name = f.name;
			this.addDate = new Date();
			this.projectId = projectId;
			this.url = "./files/text.txt";
		}
	}
	
	/*
	 * Creates a file instance from a server JSON
	 * 
	 */
	this.createFileFromServer = function(f){
		if(f != undefined){
			this.id = f.id;
			this.name = f.name;
			this.addDate = f.addDate;
			this.projectid = f.projectId;
			this.url = f.url;	
		}
	}
	
	
}