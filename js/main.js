var versionConfig = new Header3();

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
		navbarObj.generateNavbar('navbar_container', output);
		;
	});

	$("#loginform").submit(loginManager.doLogin);
});

//callback handler for form submit
$("#registerForm").submit(function(e)
{
    var postData = $(this).serializeArray();
    console.log(JSON.stringify(postData));
   
    $.ajax(
    {
        url : "./php/login/register.php",
        type: "POST",
		dataType : 'json', 
        data : {
        	user_name : $('#register_input_username').val(),
        	user_password_new : $('#login_input_password_new').val(),
        	user_password_repeat : $('#login_input_password_repeat').val(),
        	user_email : $('#login_input_email').val(),
        	register : true
        },
        success:function(data, textStatus, jqXHR) 
        {
        	if(data.success){
        		location.reload();
        	}else{
        		alert('erro');
        	}
        },
        error: function(jqXHR, textStatus, errorThrown) 
        {
            //if fails      
        }
    });
    e.preventDefault(); //STOP default action
});
 
