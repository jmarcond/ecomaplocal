<?php
session_start();
require_once ('classes/Database.class.php');
require_once ('classes/EcoFile.class.php');

class Project {
	private $id;
	private $name;
	private $creationDate;
	private $notes;
	private $privacy;

	private $files;
	private static $database;
	
	function __construct($id = 0) {
		$this->construct($id);
	}
	
	/*
	 * Constructor that creates an existent Project from DB by Id
	 * or an empty project
	 */
	function construct($id = 0) {
		
		if ($id && $this->authenticate($id)) {
			$query = "SELECT * FROM `projects` WHERE `project_id` = '$id'";
		} else {
			$this->database = new Database;
			$this->id = 0;
			$this->name = "";
			$this->notes = "";
			$this->creationDate = "";
			$this->privacy = "Private";
			$this->files = array();
			return;
		}
		$this->database = new Database;
		$proj = $this->database->query($query);
		$info = $proj->fetch_array();
		
		
		$this->id = $info['project_id'];
		$this->name = $info['name'];
		$this->notes = $info['notes'];
		$this->privacy = $info['privacy'];
		$this->files = array();

		$id = $this->id;
		
			$files = array();
			$query = "SELECT * FROM `files` WHERE `project_id` = '$id'";
			$filesQuery = $this->database->query($query);
			while ($info = $filesQuery->fetch_array()) {
				array_push($files, new EcoFile($info['file_id']));
			}
			$this->files = $files;
		
		
	}
	
	function authenticate($id){
		if($this->database ==  null ) $this->database = new Database;
		$user_id = $_SESSION['user_id'];
		$query = "SELECT * FROM `projects` WHERE `project_id` = '$id' AND `user_id` = '$user_id' ";		
		$userQuery = $this->database->query($query);
		
		if($userQuery){
			if(mysqli_num_rows($userQuery) > 0)
				return true;
		}
		return false;
	}
	
/*
 * Add or Edit  current instance to Database
 */	
 	function addOrEdit() {		
		$user_id = $_SESSION['user_id'];
		
		/*
		 * new Project
		 */
		if(!(isset($this->id) && $this->id != 0)){
			$query = "INSERT INTO `projects` VALUES(DEFAULT, '$user_id', '$this->name', '$this->creationDate', '$this->notes', '$this->privacy')";
			$this->database->query($query);
			$this->id = $this->database->getConnection()->insert_id;
		}else //existent project
		{
			if($this->authenticate($this->id)){
				$query = 'UPDATE `projects` SET `name` = "' . $this->name . '", `notes` = "' . $this->notes . '", `privacy` = "' . $this->privacy . '" WHERE `project_id` = "' . $this->id . '"';
				$this->database->query($query);
			}else{
				
			}
					
		}
		
		
	}
	
	function createFromView($viewProject){
		$this->id = $viewProject["id"];
		$this->name = $viewProject["name"];
		$this->creationDate = $viewProject["creationDate"];
		$this->notes = $viewProject["notes"];
		$this->privacy= $viewProject["privacy"];
	}
	
	function convertToView(){
		$toView = [];
		$toView["id"] = $this->id;
		$toView["name"] = $this->name;
		$toView["creationDate"] = $this->creationDate;
		$toView["notes"] = $this->notes;
		$toView["privacy"] = $this->privacy;
		$toView["files"] = [ ];
		foreach($this-> files as $file){
			$toView["files"][] = $file->convertToView();
		}
		return $toView;
		
	}

/*     	TODO REMOVE
 * 		function remove(){
        foreach($this->maps as $mapID){
            $map = Map::loadMap($mapID);
            $map->remove();
        }
        $query = "SELECT id from point where project = $this->id";
        $results = $this->database->query($query);
        while (($row = $results->fetch_array())){
            $point = Point::loadPoint($row['id'], $this->database);
            $point->remove();
        }
        $query = "DELETE FROM `project` WHERE id=".$this->id;
        $results = $this->database->query($query);
        $query = "DELETE FROM `projusers` WHERE project=".$this->id;
        $results = $this->database->query($query);
    } */

}
?>
