var loginManager = new Login();

/* NavbarAcc definition */
function NavbarAcc(projectsArray) {
	this.label = "My projects";
	this.projectsArray = projectsArray;

	this.addProject = function(label, id) {
		if (this.projectsArray == undefined)
			this.projectsArray = Array();
		this.projectsArray.push({
			label : "" + label,
			id : "" + id
		});
	};
}

/* navbar class definintion */

function Navbar(navbarAcc) {

	this.headerLabel = 'EcoMapLive';
	this.navbarAcc = navbarAcc;
	this.projectArray = new Array();
	this.generateNavbar = function(containerId, user) {
				
		var navbarHeader = '<div class="navbar-header">'
				+ '<button type="button" class="navbar-toggle" data-toggle="collapse"	data-target=".navbar-collapse">'
				+ '<span class="sr-only">Toggle navigation</span>'
				+ '<span class="icon-bar"></span>'
				+ '<span class="icon-bar"></span>'
				+ '<span class="icon-bar"></span>' + '</button>'
				+ '<a class="navbar-brand" href="./ecomaplive.html">' + this.headerLabel
				+ '</a>' + '</div>';



		var loginForm = '<form class="navbar-form navbar-right" method="post" action="" name="loginform" id="loginform">'
				+ '<div class="form-group login-bar">'
				+ '<input type="text" placeholder="UserName" class="form-control" id="login_input_username" pattern="[a-zA-Z0-9]{2,64}" name="user_name"> '
				+ '</div>'
				+ '<div class="form-group login-bar">'
				+ '<input type="password" placeholder="Password" class="form-control" id="login_input_password" name="user_password">'
				+ '</div>'
				+ '<button type="submit" class="btn btn-success login-bar" name="login" value="Log in">Sign in</button>'
				+ '</form>';

		var logoutDiv = '<div  class="navbar-form navbar-right">'
				+ '<button  class=" btn btn-danger" onclick="loginManager.doLogout();">Logout</button>'
				+ '</div>';

		var registerDiv = '<div  class="navbar-form navbar-right">'
				+ '<button  class=" btn btn-warning" onclick="$(\'#myModal\').modal(\'show\');">Register</button>'
				+ '</div>';

		var loginDiv;

		if (user.isLoggedIn) {
			//create myprojects dropdown list
			var myProjDropDown = '';
			for (var i = 0; i < user.projects.length; i++) {
				myProjDropDown += '<li><a href="./editproject.html?projectId='+user.projects[i].id+'">'
						+ user.projects[i].name + '</a></li>';
			}
			
			
			// append logout button
			var helloDiv = '<div  class="navbar-right">'
					+ '<a class="hello" href="ecomaplive.html">  Hello, ' + user.username
					+ '</a>' + '</div>'
			loginDiv = logoutDiv + helloDiv;
			
			//build menu bar
			var navbarAcc = '<div class="navbar-collapse collapse">'
				+ '<ul class="nav navbar-nav">'
				+ '<li class="active"><a href="#">Home</a></li>'
				+ '<li><a href="#about">About</a></li>'
				+ '<li><a href="#contact">Contact</a></li>'
				+ '<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">'
				+ this.navbarAcc.label + '<b class="caret"></b></a>'
				+ '<ul class="dropdown-menu">'
				+ '<li><a href="./editproject.html">New Project</a></li>'
				+ '<li class="divider"></li>' + myProjDropDown + '</ul></li>'
				+ '</ul>' + loginDiv + '</div>';
		} else {
			// append login and register button
			loginDiv = registerDiv + loginForm;
			
			//build menu bar
			var navbarAcc = '<div class="navbar-collapse collapse">'
				+ '<ul class="nav navbar-nav">'
				+ '<li class="active"><a href="#">Home</a></li>'
				+ '<li><a href="#about">About</a></li>'
				+ '<li><a href="#contact">Contact</a></li>'
				+ '</ul>' + loginDiv + '</div>';
		}


		$('#' + containerId).html(navbarHeader + navbarAcc);
	};
}

