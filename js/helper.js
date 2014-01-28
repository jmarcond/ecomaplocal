$.urlParam = function(name) {
	var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)')
			.exec(window.location.href);
	return (results == null) ? -1 : results[1];
}