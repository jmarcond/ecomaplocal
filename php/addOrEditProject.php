<?php
error_reporting(E_ERROR);
session_start();
require_once ("./classes/Project.class.php");
require_once ("./classes/EcoFile.class.php");

$project = new Project();
$project->createFromView(($_POST['project']));
$project->addOrEdit(); 
$ret = $project->convertToView();

echo json_encode($ret);
?>