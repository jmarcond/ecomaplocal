/*
 * Has informations about a field from csv file
 */
function CSVField(headerName, unit, label){
	this.label = label;
	this.headerName = headerName;
	this.unit = unit;
	
}

/*
 * Class for csv configuration
 */

function CSVConfig(versionId, sensorName, hasGPS, avFields, slFields) {
	this.versionId = versionId;
	this.sensorName = sensorName;
	this.availableFields = avFields; //fields on CSV file
	this.hasGPS = hasGPS;
	this.selectableFields = slFields;


	/*
	 * Methods
	 */
	this.getHeaderString = function(){
		var header = "";
		for(var i=0; i<this.availableFields.length; i++){
			if(i == this.availableFields.length - 1) header += this.availableFields[i].headerName+"\n";
			else header += this.availableFields[i].headerName + ",";
		}
		return header;
	}
}

function CSVSetup() {

	this.version2 = new CSVConfig(2, "ECOMINI", true, [
			new CSVField("SensorVersion", "1.3", "Sensor Version"), 
			new CSVField("Time", "s", "Time"),
			new CSVField("Latitude", "Lat", "Latitute"), 
			new CSVField("Longitude", "Long", "Longitude"),
			new CSVField("BatteryV", "V", "Battery Level"), 
			new CSVField("AccelX", "m/s2", "Accelerometer X"),
			new CSVField("AccelY", "m/s2", "Accelerometer Y"), 
			new CSVField("AccelZ", "m/s2", "Eccelerometer Z"),
			new CSVField("Temperature", "C", "Temperature"), 
			new CSVField("Humidity", "RH%", "Humidity"),
			new CSVField("PhotocellIR", "IR", "Infra Red Level"), 
			new CSVField("PhotocellR", "R", "Red Light Level"),
			new CSVField("PhotocellG", "G", "Green Lgith Level"), 
			new CSVField("PhotocellB", "B", "Blue Light Level"),
			new CSVField("SoundLevel", "dB", "Sound Level"),
			new CSVField("VOCPred", "%", "VOC Pred"), 
			new CSVField("VOCRes", "%", "VOC Res"),
			new CSVField("Gas1PPB", "PPB", "Gas 1"), 
			new CSVField("Gas1We", "%", "Gas 1 We"),
			new CSVField("Gas1Aux", "%", "Gas 1 Aux"), 
			new CSVField("Gas2PPB", "PPB", "Gas 2"),
			new CSVField("Gas2We", "%", "Ga 2 We"), 
			new CSVField("Gas2Aux", "%", "Gas 2 Aux"),
			new CSVField("ButtonStatus", "", "Button Status") ], 
			[
				new CSVField("BatteryV", "V", "Battery Level"), 
				new CSVField("Temperature", "C", "Temperature"), 
				new CSVField("Humidity", "RH%", "Humidity"),
				//new CSVField("", "IR", "Light Level"),
				new CSVField("SoundLevel", "dB", "Sound Level"),
				new CSVField("VOCPred", "%", "VOC Pred"), 
				new CSVField("VOCRes", "%", "VOC Res"),
				new CSVField("Gas1PPB", "PPB", "Gas 1"),  
				new CSVField("Gas2PPB", "PPB", "Gas 2") ]
			);
	
	
	/*
	 * Methods
	 */

	this.getConfigById = function(id){
		switch (id){
			case 2: return this.version2;
		}
	};
	
	this.getVersionFromLine = function(line){
		var stringArray = line.split(",");
		return stringArray[0];
	};
	
	
}