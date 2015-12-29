'use strict';

var queryService = require("./queryOfda.server.service");
var config = require("./../../config/config");
var states = config.states;
var logger = require('./../utils/logger.js')(module);
var parseString = require('xml2js').parseString;



module.exports.mapus = function(params, callback){
	var response = {};
	response.mapData = {};
	response.orderedData = {};
	response.mapDataTitle = {};
	response.mapDataFills = {};
	response.mapDataLegends = {};
    var completeQueries = 0;


    var datasets = [{name:"Lead",title:"Drug Recalls Per State", defaultFill:"#ECECEA", selectedFill:'#f5d76e', thresholds:[{val:200, color:"#D5E7E6", key:"L"}, {val:300, color:"#74AFAD", key:"M"}, {val:400, color:"#558C89", key:"H"}, {val:400, color:"#2a4644", key:"VH"}]}];


    datasets.forEach(function(dataset){
    	var results = {};
        var resultsArray = [];

		var allTermQuery = {
		    queryId: 1,
		    noun:'Result',
		    endpoint:'search?mimeType=xml',
		    params:{
		      statecode:'US%3A51',
		      characteristicName:'Lead',
		      startDateLo:'07-28-2015'
		    }
		  }

		queryService.getData(allTermQuery,function(error,data, query){
				completeQueries++;

				if(error){
					logger.error("ERROR: ", JSON.stringify(error), JSON.stringify(allTermQuery));
				}

				if(data){
					parseString(data, function (err, result) {
						if (err) throw err;
				    data = result;
					});
				}else{
					data = {};
				}

				if(!data.results){
					logger.info("No Results for: " + JSON.stringify(allTermQuery));
					data.results = [];
				}

				logger.debug("RAW DATA: ", data);

				var stateCounts = {};
				data.results.forEach(function(entry){
					logger.info("Chirag");
				});

				/*for(var state in stateCounts){
					var th = findKeyFill(dataset, stateCounts[state] );
					results[state.toUpperCase()] = { fillKey: th.key, count: stateCounts[state], label: th.val};
					resultsArray.push({state:state, count:stateCounts[state]});
				}

				resultsArray.sort(compareCount);

				response.mapData[dataset.name] = results;
				response.orderedData[dataset.name] = resultsArray;
				response.mapDataTitle[dataset.name] = dataset.title;
				response.mapDataFills[dataset.name] = getFills(dataset);
				response.mapDataLegends[dataset.name] = getLegends(dataset);

				if (completeQueries == datasets.length){
					logger.debug('results: ' + JSON.stringify(response));
					callback(null, response);
				}
*/
			});
    });//end dataset iteration


	 function findKeyFill(dataset, count){
	    	var max = {};
	    	for(var i = 0; i < dataset.thresholds.length; i++){
	    		var th = dataset.thresholds[i];
	    		if(count < th.val)
	    			return th;
	    		else
	    			max = th;
	    	}

	    	return max;
	    }

	    function getFills(dataset){
	    	var fills = {};
	    	dataset.thresholds.forEach(function(th){
	    		fills[th.key] = th.color;
	    	});
	    	fills['defaultFill'] = dataset.defaultFill;
	    	fills['selectedFill'] = dataset.selectedFill;
	    	return fills;
	    }

	    function getLegends(dataset){
	    	var labels = {};
	    	var i =0;
	    	dataset.thresholds.forEach(function(th){

	    		if(++i == dataset.thresholds.length)
	    			labels[th.key] =  th.val + " >= ";
	    		else
	    			labels[th.key] = " < " + th.val;

	    	});
	    	labels['defaultFill'] = 'unknown';
	    	return labels;
	    }

	    function compareCount(a,b) {
	  	  if (a.count > b.count){
	      	return -1;
	    	}
	  	  if (a.count < b.count){
	      	return 1;
	    	}
	  	  return 0;
	  }
};
