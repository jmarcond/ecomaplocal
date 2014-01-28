<?php 
session_start();
include('login/config/db.php');

class Database {
	private static $connection;
	
	function __construct() {
		if (!isset($this->connection)) {
			$this->connect();
		}
	}
	
	function connect() {
		//connect
		$this->connection = new Mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
		//$this->connection = new Mysqli('localhost', 'ecomap', '141991g');
		if ($this->connection->connect_error) {
			die ("Connection error: " . $this->connection->connect_error);
		}
	}

	function query($string) {
		//needs to be preparsed
		return $this->connection->query($string);
	}
	
	function getConnection() {
		return $this->connection;
	}
	
	function __destruct() {
		//close the connection
		$this->connection->close();
	}

    function close(){
		$this->connection->close();
    }
	
	function __sleep() {
		//$this->connection->close();
		return array();
	}
	
	function __wakeup() {
		$this->connect();
	}
}
?>
