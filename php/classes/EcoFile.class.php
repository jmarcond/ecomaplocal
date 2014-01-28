<?php 
session_start();
require_once ("./classes/Database.class.php");

class EcoFile{
	private $id;
	private $name;
	private  $blob;
	private $addDate;
	private $projectId;
	private static $database;
	
	function __construct($id = 0) {
		$this->construct($id);
	}
	
	/*
	 * Constructor that creates an existent File from DB by Id
	* or an empty file
	*/
	function construct($id = 0) {
		$this->database = new Database;
		if ($id && $this->authenticate($id)) {
			$query = "SELECT * FROM `files` WHERE `file_id` = '$id'";
		} else {
			$this->id = 0;
			$this->name = "";
			$this->blob = "";
			$this->addDate = "";
			$this->projectId = 0;
			return;
		}
		$proj = $this->database->query($query);
		$info = $proj->fetch_array();
		$this->id = $info['file_id'];
		$this->name = $info['name'];
		$this->blob = $info['file_blob'];
		$this->addDate = $info['creation_date'];
		$this->projectId = $info['project_id'];
		return;
	
	}
	
	function authenticate($id){
		$user_id = $_SESSION['user_id'];
		$query = "SELECT `project_id` FROM `files` WHERE `file_id` = '$id'  ";
				
		$fileQuery = $this->database->query($query);
	
		if($fileQuery){
			$info = $fileQuery->fetch_array();
			$project_id = $info['project_id'];
			$query = "SELECT * FROM `projects` WHERE `project_id` = '$project_id' AND `user_id` = '$user_id' ";
			$userQuery = $this->database->query($query);
			if(mysqli_num_rows($userQuery) > 0)
				return true;
		}
		return false;
	}
	
	function addOrEdit() {
		$user_id = $_SESSION['user_id'];
	
		/*
		 * new file
		*/
		if(!(isset($this->id) && $this->id != 0)){
			$query = "INSERT INTO `files` VALUES(DEFAULT, '$this->projectId', '$this->name', '$this->addDate', '$this->blob') " ;
			$this->database->query($query);
			$id = $this->database->getConnection()->insert_id;
			$this->id = $id;
		}else //existent project
		{
			if($this->authenticate($this->id)){
				$query = 'UPDATE `files` SET `name` = "' . $this->name . '", `file_blob` = "' . $this->blob . '"  WHERE `id` = "' . $this->id . '"';
				$this->database->query($query);
			}else{
	
			}
				
		}
	}
	
	/*
	 * Creates an File object from data passed from the browser
	 */
	function createFromView($viewFile)
	{
		$this->id = $viewFile["id"];
		$this->name = $viewFile["name"];
		$this->blob = $viewFile["blob"];
		$this->addDate = $viewFile["addDate"];
		$this->projectId = $viewFile["projectId"];
	}
	
	function convertToView(){
		$toView = [];
		$toView["id"] = $this->id;
		$toView["name"] = $this->name;
		$toView["addDate"] = $this->addDate;
		$toView["projectId"] = $this->projectId;
		$toView["blob"] = $this->blob;
		return $toView;
	
	}
}
?>