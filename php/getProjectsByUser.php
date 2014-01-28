<?php 
error_reporting(E_ERROR);
session_start();
require_once("classes/Project.class.php");


$id = $_POST['projectId'];


if(isset($id)){
	$project = new Project($id);
	$return = $project->convertToView();
	$return["success"] = true;
}else{
	$return["success"] = false;
}

echo json_encode($return);

?>