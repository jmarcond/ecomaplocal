
function Project(){
	
	this.id = "";
	this.name = "";
	this.notes = "";
	this.privacy = "";
	this.creationDate = "";
	//TODO status
	this.files = new Array();
	
	this.createFromForm = function(id, name, notes, privacy){
		this.id = id;
		this.name = name;
		this.notes = notes;
		this.privacy = privacy;
		this.creationDate = new Date();
	}
}