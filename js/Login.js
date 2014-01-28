function Login() {
	
	this.user = {isLoggedIn : false};
	/*
	 * Function to check with the server if the user is login (use sessions)
	 * Expect a object:
	 * {"user_name":"jhleite","user_email":"jhleite@mit.edu","user_logged_in":1}
	 */

	this.isLoggedIn = function(handleData) {
		$.ajax({
			async : false,
			url : "./php/index.php",
			type : 'POST',
			dataType : 'json',
			data : {
				login : "Log in"
			},
			mimeType : "multipart/form-data",
			success : function(data, textStatus, jqXHR) {
				handleData(data);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				debugger;
				console.log("That's so bad, we got an error");
			}
		});
	}

	/*
	 * Function to do login (use sessions) Expect a object:
	 * {"user_name":"jhleite","user_email":"jhleite@mit.edu","user_logged_in":1}
	 */
	this.doLogin = function(e) {
		$.ajax({
			async : false,
			url : "./php/login/index.php",
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
		e.preventDefault(); // STOP default action
	}

	/*
	 * Function to do logout (use sessions) Expect a object: { result: boolean }
	 */
	this.doLogout = function() {
		$.ajax({
			async : false,
			//dataType : "json",
			url : "./php/login/index.php?logout",
			type : 'POST',
			mimeType : "multipart/form-data",
			success : function(data, textStatus, jqXHR) {
				location.reload();
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert("Error while logging out. Please, try again.")
			}
		});
	}
	

}