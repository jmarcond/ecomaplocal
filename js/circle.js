var h = [];

/*
 * This function creates a Circle - google.maps.Circle object from a dataLine
 * object and assigned it to the map parameter
 */
function Circle(latitude, longitude, value, min, max, time, map) {
	latLng = new google.maps.LatLng(latitude, longitude);
	color = valueToRGB(value, min, max)
	color = "rgb(" + color + ")";
	debugger;
    this.circle = new google.maps.Circle({
        'center': latLng,
        'clickable':true,
        'fillColor': color, 
        'fillOpacity':0.5,
        'map':map,
        'radius':100, // TODO: location in meters
        'strokeColor':'#0000A0',
        'strokeOpacity':'0.0',
        infoWindow: new google.maps.InfoWindow({
	      content: createInfoWindowContent(value, time),
	      position: latLng,
	  })
    });
    
    this.circle.addListener('mouseover', function(){
    	this.infoWindow.open(this.map);
    });
    
    this.circle.addListener('mouseout', function(){
    	this.infoWindow.close();
    });
    
/*    google.maps.event.addListener(this.circle, 'mouseover', function() {
    	debugger;
    	this.infoWindow.open(this.map);
      });
    
    google.maps.event.addListener(this.circle, 'mouseout', function() {
    	this.infoWindow.close();
      });*/
    
}

function createInfoWindowContent(value, time){
	var string = "<b>Value: </b>"+value+"<br><b>Time: </b>"+time;
	return string;
}

/*
 * This function parse the actual value to int with some calculations
 */
function parseValueToInt(value, max) {
	return parseInt(value / ((max + 1)) * 255, 10);
}

/*
 * Convert a value to a RGB according to the scale returns the RGB string
 */
function valueToRGB(value, min, max) {
	return ''+red(value, min, max)+","+green(value, min, max)+","+blue(value, min, max)+'';
	
	/*return getHue()[normalizeValue(parseInt(value * getHue().length, 10), 0,
			getHue().length - 1)];*/
}

function red(v, min, max){
	if(min != max)	return parseInt((255/(max-min)) * (v-min));
		else return 255;
}

function blue(v, min, max){
	if(min != max) return parseInt((255/(min-max)) * (v-max));
	else return 255;
}

function green(value, min, max){ //TODO
	//return 0;
	var mid = (min+max)/2.00;
	var a,b,c;
	var maxmin = max - min;
	var smaxmin = Math.pow(max,2) - Math.pow(min,2);
	
	b = 255 / ( 
				(-maxmin * Math.pow(mid,2) /smaxmin) +
				mid + 
				(min * ((maxmin * min / smaxmin)-1))
				);
	
	c = b * min *((maxmin * min /smaxmin) - 1);
	a = -b *(maxmin/smaxmin);
	
	/*b = 255 / (
			(Math.pow(mid,2)*(min-max)/(Math.pow(max,2)*Math.pow(min,2))) +
			(mid)+
			(min * (((min/(Math.pow(max,2) - Math.pow(min,2)))*(max-min))-1))
			);
	
	a = -b * (max-min)/(Math.pow(max,2) - Math.pow(min,2));
	c = b*min*(((max-min)*min/(Math.pow(max,2)-Math.pow(min,2)))-1);*/
	return parseInt(a*Math.pow(value, 2) + b*value + c);
}

/*
 * Rerturns the value truncated to min if lower, to max if grater, or return
 * value, otherwise
 */
function normalizeValue(value, min, max) {
	if (value < min) {
		return min;
	}
	if (value > max) {
		return max;
	}
	return value;
}

function initializeHue() {
	// define the colours from 0 to 100
	// BLUEST
	h.push('0,0,255');
	h.push('0,1,255');
	h.push('0,2,255');
	h.push('0,4,255');
	h.push('0,5,255');
	h.push('0,7,255');
	h.push('0,9,255');
	h.push('0,11,255');
	h.push('0,13,255');
	h.push('0,15,255');
	h.push('0,18,253');
	h.push('0,21,251');
	h.push('0,24,250');
	h.push('0,27,248');
	h.push('0,30,245');
	h.push('0,34,243');
	h.push('0,37,240');
	h.push('0,41,237');
	h.push('0,45,234');
	h.push('0,49,230');
	h.push('0,53,226');
	h.push('0,57,222');
	h.push('0,62,218');
	h.push('0,67,214');
	h.push('0,71,209');
	h.push('0,76,204');
	h.push('0,82,199');
	h.push('0,87,193');
	h.push('0,93,188');
	h.push('0,98,182');
	h.push('0,104,175');
	h.push('0,110,169');
	h.push('0,116,162');
	h.push('7,123,155');
	h.push('21,129,148');
	h.push('34,136,141');
	h.push('47,142,133');
	h.push('60,149,125');
	h.push('71,157,117');
	h.push('83,164,109');
	h.push('93,171,100');
	h.push('104,179,91');
	h.push('113,187,92');
	h.push('123,195,73');
	h.push('132,203,63');
	h.push('140,211,53');
	h.push('148,220,43');
	h.push('156,228,33');
	h.push('163,237,22');
	h.push('170,246,11');
	h.push('176,255,0');
	h.push('183,248,0');
	h.push('188,241,0');
	h.push('194,234,0');
	h.push('199,227,0');
	h.push('204,220,0');
	h.push('209,214,0');
	h.push('213,207,0');
	h.push('217,200,0');
	h.push('221,194,0');
	h.push('224,188,0');
	h.push('227,181,0');
	h.push('230,175,0');
	h.push('233,169,0');
	h.push('236,163,0');
	h.push('238,157,0');
	h.push('240,151,0');
	h.push('243,145,0');
	h.push('244,140,0');
	h.push('246,134,0');
	h.push('248,129,0');
	h.push('249,123,0');
	h.push('250,118,0');
	h.push('251,112,0');
	h.push('252,107,0');
	h.push('253,102,0');
	h.push('254,97,0');
	h.push('255,92,0');
	h.push('255,87,0');
	h.push('255,82,0');
	h.push('255,78,0');
	h.push('255,73,0');
	h.push('255,68,0');
	h.push('255,64,0');
	h.push('255,59,0');
	h.push('255,55,0');
	h.push('255,51,0');
	h.push('255,47,0');
	h.push('255,43,0');
	h.push('255,39,0');
	h.push('255,35,0');
	h.push('255,31,0');
	h.push('255,27,0');
	h.push('255,23,0');
	h.push('255,20,0');
	h.push('255,16,0');
	h.push('255,13,0');
	h.push('255,10,0');
	h.push('255,8,0');
	h.push('255,3,0');
}

function getHue() {
	if (h.length == 0)
		initializeHue();
	return h;
}