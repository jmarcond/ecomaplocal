<?php 
error_reporting(E_ERROR);
session_start();
require_once ("classes/User.class.php");


$user = new User($_SESSION['user_id']);
$user->getAllProjects();
$user = $user->convertToView();
$user['isLoggedIn'] = true;
$user['success'] = true;

echo(json_encode($user));
?> 