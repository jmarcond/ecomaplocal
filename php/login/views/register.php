<?php
if($registration->registration_successful){
	$user ['success'] = true;
	$user ['name'] = $_SESSION ['user_name'];
	$user ['email'] = $_SESSION ['user_email'];
	$user ['isLoggedIn'] = true;
	echo (json_encode ( $user ));
}else{
	$err = [];
	$err['success'] = false;
	$err['message'] = $registration->messages;
	$err['erros']  = $registration->errors;
	$err['reg'] = $registration;
	echo (json_encode ( $err ));
	
} 
/* 
// show negative messages
if ($registration->errors) {
    foreach ($registration->errors as $error) {
        echo $error;    
    }
}

// show positive messages
if ($registration->messages) {
    foreach ($registration->messages as $message) {
        echo $message;
    }
} */

?>