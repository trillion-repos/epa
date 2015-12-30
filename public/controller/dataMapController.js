openFDA.controller('DataMapCtrl', [ '$rootScope', '$scope', 'FetchOpenFDASrvc', '$routeParams','SharedDataSrvc', '$activityIndicator',
		function($rootScope, $scope , FetchOpenFDASrvc, $routeParams ,SharedDataSrvc, $activityIndicator) {

	var mapDataAll = null;
	var orderedDataAll = null
	var titleAll = null;
	var mapFillsAll = null;
	var mapLegends = null;
	var isTableTop = false;
	var top = {};
	var bottom = {};
	$scope.selectedYear = "1";			
  $scope.characteristics = "lead";
	
	
	
	$scope.theMap = {
			  scope: 'usa',
			  options: {
				  staticGeoData: false,
				  labels: true,
				  labelSize: 10,
			   /* width: 500,*/
			    legendHeight: 60// optionally set the padding for the legend

			  },
			  fills: {/*
				"VH":'#2a4644',
			    "H": '#558C89',
			    "M": '#74AFAD',
			    "L": '#D5E7E6',*/
			    'defaultFill': '#ECECEA', 
			    'selectedFill': '#F5D76E'
			  },
data:{
  "AZ": {
      "fillKey": "defaultFill",
  },
  "CO": {
      "fillKey": "defaultFill",
  },
  "DE": {
      "fillKey": "defaultFill",
  },
  "FL": {
      "fillKey": "defaultFill",
  },
  "GA": {
      "fillKey": "defaultFill",
  },
  "HI": {
      "fillKey": "defaultFill",
  },
  "ID": {
      "fillKey": "defaultFill",
  },
  "IL": {
      "fillKey": "defaultFill",
  },
  "IN": {
      "fillKey": "defaultFill",
  },
  "IA": {
      "fillKey": "defaultFill",
  },
  "KS": {
      "fillKey": "defaultFill",
  },
  "KY": {
      "fillKey": "defaultFill",
  },
  "LA": {
      "fillKey": "defaultFill",
  },
  "MD": {
      "fillKey": "defaultFill",
  },
  "ME": {
      "fillKey": "defaultFill",
  },
  "MA": {
      "fillKey": "defaultFill",
  },
  "MN": {
      "fillKey": "defaultFill",
  },
  "MI": {
      "fillKey": "defaultFill",
  },
  "MS": {
      "fillKey": "defaultFill",
  },
  "MO": {
      "fillKey": "defaultFill",
  },
  "MT": {
      "fillKey": "defaultFill",
  },
  "NC": {
      "fillKey": "defaultFill",
  },
  "NE": {
      "fillKey": "defaultFill",
  },
  "NV": {
      "fillKey": "defaultFill",
  },
  "NH": {
      "fillKey": "defaultFill",
  },
  "NJ": {
      "fillKey": "defaultFill",
  },
  "NY": {
      "fillKey": "defaultFill",
  },
  "ND": {
      "fillKey": "defaultFill",
  },
  "NM": {
      "fillKey": "defaultFill",
  },
  "OH": {
      "fillKey": "defaultFill",
  },
  "OK": {
      "fillKey": "defaultFill",
  },
  "OR": {
      "fillKey": "defaultFill",
  },
  "PA": {
      "fillKey": "defaultFill",
  },
  "RI": {
      "fillKey": "defaultFill",
  },
  "SC": {
      "fillKey": "defaultFill",
  },
  "SD": {
      "fillKey": "defaultFill",
  },
  "TN": {
      "fillKey": "defaultFill",
  },
  "TX": {
      "fillKey": "defaultFill",
  },
  "UT": {
      "fillKey": "defaultFill",
  },
  "WI": {
      "fillKey": "defaultFill",
  },
  "VA": {
      "fillKey": "defaultFill",
  },
  "VT": {
      "fillKey": "defaultFill",
  },
  "WA": {
      "fillKey": "defaultFill",
  },
  "WV": {
      "fillKey": "defaultFill",
  },
  "WY": {
      "fillKey": "defaultFill",
  },
  "CA": {
      "fillKey": "defaultFill",
  },
  "CT": {
      "fillKey": "defaultFill",
  },
  "AK": {
      "fillKey": "defaultFill",
  },
  "AR": {
      "fillKey": "defaultFill",
  },
  "AL": {
      "fillKey": "defaultFill",
  }
},
			  geographyConfig: {
								highlighBorderColor: '#EAA9A8',
			    			highlighBorderWidth: 2,
		            popupTemplate: function(geo, data) {
		            	
		            		return ['<div class="hoverinfo"><strong>',
			                        geo.properties.name,"</strong></div>"
			                       ].join('');
		            	
// 		                return ['<div class="hoverinfo"><strong>',
// 		                        'State: ' + geo.properties.name,
// 		                        '<br/>Total Samples: ' + data.totalSamples,
// 														'<br/>Infected Samples: ' + data.infectedSamples,
// 														'<br/>Infected Percentage: ' + data.infectedPercentage,
// 		                        '</strong></div>'].join('');
		            }
		        }
			};
	
// 	$scope.changeTopStates = function(){
// 		var selectedDataset = SharedDataSrvc.getSelectedDataset();
// 		isTableTop = !isTableTop;
		
// 		if(isTableTop){
			
// 			if(!top[selectedDataset])
// 				top[selectedDataset] = $scope.orderedData.slice(0,10);
			
// 			$scope.glyPos = "down";
// 			$scope.tableTopTitle = "Top ";
// 			$scope.orderedDataTable = top[selectedDataset];
// 		}
// 		else{			

// 			if(!bottom[selectedDataset])
// 				bottom[selectedDataset] = $scope.orderedData.reverse().slice(0,10);
			
// 			$scope.glyPos = "up";
// 			$scope.tableTopTitle = "Bottom ";
// 			$scope.orderedDataTable = bottom[selectedDataset];
// 		}
// 	};
	
// 	$scope.selectedDatasetDrugs = true;
	
	$scope.changeMap = function(dataset, isReload){
		SharedDataSrvc.setSelectedDataset(dataset);
		//isTableTop = false;
		$scope.theMap.data = mapDataAll[dataset];
		$scope.theMap.fills = mapFillsAll[dataset];
		$scope.orderedData = orderedDataAll[dataset];
		//$scope.changeTopStates(dataset);
		$scope.title = titleAll[dataset];
		$scope.theMap.options.mapLegends = mapLegends[dataset];
		$scope.mapPluginData = {customLegend:mapLegends[dataset]};
		
		if (!isReload){
			SharedDataSrvc.removeTableData();
			SharedDataSrvc.setView("mapRps");
			SharedDataSrvc.clearGraph();
		
		
			//un-highlight selected state
			if(SharedDataSrvc.getFillKey()){
				$scope.theMap.data[SharedDataSrvc.getState().stateCode].fillKey = SharedDataSrvc.getFillKey();			
			}
		}
		$scope.isLoading = false;
		$activityIndicator.stopAnimating();
 	};
			
	var getStartDate = function (){
		var now=new Date();
					var oneYearMs = 1000*60*60*24*365;		
					switch(Number($scope.selectedYear)){
						case 1:
							oneYearMs = oneYearMs *3;
							break;
						case 2:
							oneYearMs = oneYearMs *5;
							break;
						case 3:
							oneYearMs = oneYearMs *10;
							break;
					}	
					now.setTime(now.getTime() - oneYearMs);			
					now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
					return pad(now.getMonth()+1,2) + "-" + pad(now.getDate(),2) + "-" + now.getFullYear();	
	};
	
	$scope.makeRequest = function (){
					$routeParams.date = getStartDate();
					//$activityIndicator.startAnimating();
					//$scope.isLoading = true;
// 					SharedDataSrvc.getMapData($routeParams, "mapus", function(err, response, isReload){
// 						//var selectedDataset = SharedDataSrvc.getSelectedDataset();
// 						if(err){
// 							console.error(JSON.stringify(err));
// 							return;
// 						}

// 						mapDataAll = response.mapData;
// 						orderedDataAll = response.orderedData;
// 						titleAll = response.mapDataTitle;
// 						mapFillsAll = response.mapDataFills;
// 						mapLegends = response.mapDataLegends;
// 						$scope.mapPluginData = {customLegend:mapLegends[$scope.characteristics]};

// 						$scope.changeMap($scope.characteristics, isReload);
// 					});
	};
	
	$scope.makeRequest();
	
	$scope.theMap.responsive = true;
			
	
	$scope.mapPlugins = {
			  customLegend: function(layer, data, options) {
				  if(!data)
					  return;
				  //console.log("OPTIONS: ",JSON.stringify(data));
			    var html = ['<ul class="list-inline" style="padding-left:40px">'],
			        label = '';
			    for (var fillKey in this.options.fills) {
			    	if(data[fillKey]){
				      html.push('<li class="key" ',
				                  'style="border-top: 10px solid ' + this.options.fills[fillKey] + '">',
				                  data[fillKey],
				                  '</li>');
			    	}
			    }
			    html.push('</ul>');
			    d3.select(this.options.element).append('div')
			      .attr('class', 'datamaps-legend mobile-legend')
			      .html(html.join(''));
			  }
			};
	
	
	$scope.drillDownToYear = function(geography){
		$activityIndicator.startAnimating();
		$scope.isLoading = true;
		var state = {};
		state.stateName = geography.properties.name;
		state.stateCode = geography.id;
		console.log(state.stateName + " : " +  state.stateCode);
		SharedDataSrvc.removeTableData();
		SharedDataSrvc.setView("graphRpy");		
		
		//un-highlight selected state
		if(SharedDataSrvc.getFillKey()){
			$scope.theMap.data[SharedDataSrvc.getState().stateCode].fillKey = SharedDataSrvc.getFillKey();			
		}				
		
		$routeParams.date = getStartDate();
		var fKeyObj = $scope.theMap.data[geography.id] || {fillKey:'defaultFill'};
		SharedDataSrvc.fetchData("graphRpy", state, $routeParams, null, null, fKeyObj.fillKey, function(){
			
			$scope.isLoading = false;
			$activityIndicator.stopAnimating();
			
		});
		
		//highlight selected state
		$scope.theMap.data[geography.id].fillKey = 'selectedFill'; 
	};
	
	

		} ]);

function pad(num, size) {
    var s = "0" + num;
    return s.substr(s.length-size);
}