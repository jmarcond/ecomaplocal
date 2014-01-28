<?php 
error_reporting(E_ERROR);
session_start();
require_once ("classes/User.class.php");

$user = [];
$user['success'] = true;
$user['name'] = $_SESSION['user_name'];
$user['email'] = $_SESSION['user_email'];
$user['isLoggedIn'] = true;

$user = new User($_SESSION['user_id']);
$user->getAllProjects();
$user = $user->convertToView();
$user['isLoggedIn'] = true;
$user['success'] = true;

echo(json_encode($user));
?> 