'use strict'

var queryService = require("./queryOfda.server.service");
var config = require('./../../config/config');
var parseString = require('xml2js').parseString;

module.exports.graphRpy = function (params, callback){
	var response = {};
	var graphEntries = {};
	var datasets = [{name:params.datasetId, displayName:params.datasetId.capitalize()}];
	var state = config.states[params.state];

	
	console.log("PARAMS: "+JSON.stringify(params));
	
	datasets.forEach(function(dataset){
		var query = {
			    queryId: 1,
			    noun:'Result',
		    endpoint:'search?mimeType=xml',
		    params:{
		      statecode:'US:51',
		      characteristicName:params.datasetId.capitalize(),
		      startDateLo:params.startDate
		    }
			  };

//				console.log(query);

		queryService.getData(query,function(error,data, query){

			if(error){
				console.error("ERROR: ", JSON.stringify(error), JSON.stringify(query));
			}

			if(data){
					parseString(data, function (err, result) {
						if (err) throw err;
						
				    data = result.WQX.Organization[0].Activity;
						response = {"graph":{"series":["Lead"], data:[]}};
						
						var graphData = {};
						data.forEach(function(d){
							
							var year = new Date(d.ActivityDescription[0].ActivityStartDate[0]).getFullYear();
							
							if(!graphData[year])
								graphData[year] = [];
							
							if(d.Result[0].ResultDescription[0].ResultMeasure && 
								 														d.Result[0].ResultDescription[0].ResultMeasure[0].ResultMeasureValue[0] >= 0.15){
								graphData[year].push(d.Result[0].ResultDescription[0].ResultMeasure[0].ResultMeasureValue[0]);
							}
						});
						
						
						for(var key in graphData){
							var obj ={};
							obj.x = key;
							obj.y = [];
							obj.y.push(graphData[key].length);
							response.graph.data.push(obj);
						}
						
						console.log(JSON.stringify(response));
					});
				}else{
				console.log("No Results for: " + JSON.stringify(query));
			}
					
				
					response.graphTitle = "Number of Samples found with "+ dataset.displayName + " for "  + 
						state.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });

			//	console.log('GRAPH RESPONSE: ' + JSON.s for ringify(response));
				callback(null, response);
		});
	});
};
