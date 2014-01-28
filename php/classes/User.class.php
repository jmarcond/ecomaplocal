<?php 
include('login/config/db.php');
require_once('classes/Database.class.php');

class User {
	private $user_id;
	private $username;
	private $email;
	private $projects;
	
	private static $database;
		
	function __construct($id = 0) {
		$this->construct($id);
	}
	
	function construct($id = 0) {
		if ($id) {
			$query = "SELECT * FROM `".DB_USERS_TABLE."` WHERE `user_id` = '$id'";
		} else {
			$this->database = new Database;
			$this->user_id = 0;
			$this->username = "";
			$this->email = "";
			$this->projects = [ ];
			return;
		}
		$this->database = new Database;
		$user = $this->database->query($query);
		$info = $user->fetch_array();
		$this->user_id = $info['user_id'];
		$this->username = $info['user_name'];
		$this->email= $info['user_email'];
		$this->projects = [ ];
	}
	
	function getAllProjects(){
		$projectsArray = [ ];
		if($this->user_id == $_SESSION['user_id']){
			$query = "SELECT * FROM `projects` WHERE `user_id` = '$this->user_id'";
			$projects = $this->database->query($query);
			while ($info = $projects->fetch_array()) {
				array_push($projectsArray, Array(
					"id" => $info['project_id'],
					"name" => $info['name']
				));
			}
			$this->projects = $projectsArray;
		}	
	}
	
	function convertToView(){
		$ret = Array();
		$ret['user_id'] = $this->user_id;
		$ret['username'] = $this->username;
		$ret['email'] = $this->email;
		$ret['projects'] = $this->projects;
		return  $ret;
	}
	
	##TODO
	function edit($name, $desc) {
		$this->name = $name;
		$this->description = $desc;
		$this->blurb = $blurb;
		$query = 'UPDATE `project` SET `name` = "' . $name . '", `description` = "' . $desc . '", `blurb` = "' . $blurb . '" WHERE `id` = "' . $this->id . '"';
		$this->database->query($query);
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
	