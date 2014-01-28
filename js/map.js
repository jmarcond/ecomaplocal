/*
 * Returns a google.maps.Map centered and
 * placed according to the parameters
 */

function EcoMap() {
	this.map = null;
	this.circles = Array();
	
	this.getMap = getMap;
	this.setMap = setMap;
	
	this.getCircles = getCircles;
	this.setCircles = setCircles;
	
	this.getMIN = getMIN;
	this.setMIN = setMIN;
	this.getMAX = getMAX;
	this.setMAX = setMAX;
	
	this.addCircle = addCircle;
	
	this.MIN = 0.00;
	this.MAX = 0.00;
	
	/*
	 * Getters and Setters
	 */
	function getMap(){return this.map;}
	function setMap(googleMap){this.map = googleMap;}
	function getCircles(){return this.circles;}
	function setCircles(circlesArray){this.circles = circlesArray;}
	function getMIN(){return this.MIN;}
	function setMIN(v){this.MIN = v;}
	function getMAX(){return this.MAX;}
	function setMAX(v){this.MAX = v;}
	
	
	/*
	 * Add Circle to the array
	 */
	function addCircle(circle){this.circles.push(circle);}
	
	/*
	 * Set Map by minLat, maxLat, div
	 */
	function createMapFromParams(minLat, maxLat, div){setMap(new GoogleMap(minLat, maxLat, div));}
	
}



function GoogleMap(centerLat, centerLng, div){

	var mapOptions = { // TODO: add more options and events
		center : new google.maps.LatLng(centerLat, centerLng),
		zoom : 15,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

	// not var b/c I want it to be public
	map = new google.maps.Map(div, mapOptions)

	return map;
}