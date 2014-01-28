/*
 * This file has the version about header and text to variable
 *  
*/

function Header3(){
	this.optionsArray = [
  	   'Temperature',  
	   'Humidity',	
	   'InfraRed Level', //PhotocellIR
	   'Blue Light Level', //PhotocellBlue
	   'Indoor Air Quality Pred ', //IAQ Pred
	   'Indoor Air Quality Res', //IAQ Res
	   'Gas 1 (PPB)', //Gas1PPB,
	   'Gas 2 (PPB)' //GAS2PPB
	];
	
	this.optionsMap = [
	  ['Temperature','Temperature'], //celcius
	  ['Humidity','Humidity'],	// RH%
	  ['InfraRed Level','PhotocellIR'],  //same chart, separate lines //same with accelerometers 
	  ['Blue Light Level', 'PhotocellBlue'], 
	  ['Indoor Air Quality Pred ', 'IAQPred'], //VOC Predicted
	  ['Indoor Air Quality Res', 'IAQRes'], //VOC Raw
	  ['Gas 1 (PPB)', 'Gas1PPB'], //ppb lowercase 
	  ['Gas 2 (PPB)', 'Gas2PPB']
	];
	
	
	this.getPropretyArrayByLabels = function (labelArray){
		var propretyArray = Array();
		var aux;
		for(var i = 0; i<labelArray.length; i++){
			aux = labelArray[i];
			for(var j = 0; j<optionsMap.length; j++){
				if(aux[0] == labelArray[i]) propretyArray.push(aux[1]);
			}
		}
		return propretyArray;
	}
	
	this.getOptionByHeader = function(header){
		var opt = '';
		for(var i = 0; i<this.optionsMap.length; i++){
			if(this.optionsMap[i][1] == header) {
				opt = this.optionsMap[i][0];
				break;
			}
		}
		return opt;
	}
}
