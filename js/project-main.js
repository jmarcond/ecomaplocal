$(document).ready(function() {
	console.log("document is ready...");
	// var hardCodeObj = new HardCode();
	var arr = new Array();
	var navbarObj = new Navbar(new NavbarAcc([ {
		label : "VOC Kendall 11-17",
		id : "432131"
	} ]));
	// debugger;
	loginManager.isLoggedIn(function(output) {
		if(!output.isLoggedIn){
			alert("You are not logged in.");
			//window.location('./ecomaplive.html');
		}else{
			navbarObj.generateNavbar('navbar_container', output);
		}
		
		
	});

	$("#loginform").submit(loginManager.doLogin);
});

function saveOrUpdateProject(){
	
	var project = new Project();
	project.name = $("#project_inputName").val(); 
	project.notes = : $("#project_inputNotes").val(); 
	projects.privacy = 1;
	
	$.ajax({
		async : false,
		url : "./php/project_manager.php",
		type : 'POST',
		dataType : 'json',
		data : {
			user_name : $("#login_input_username").val(),
			user_password : $("#login_input_password").val(),
			login : "Log in"
		},
		mimeType : "multipart/form-data",
		success : function(data, textStatus, jqXHR) {
			if (data.isLoggedIn != undefined
					&& data.isLoggedIn) { // user logged-in
				location.reload();
			} else {
				alert("Username and password don't match.");
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("Error while logging in. Please, try again.");
		}
	});	
}