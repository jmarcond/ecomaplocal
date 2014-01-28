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
		
	});

	$("#loginform").submit(loginManager.doLogin);
});