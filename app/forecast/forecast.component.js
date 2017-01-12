// Register the `phoneList` component on the `phoneList` module,
angular.
  module('forecast').
  component('forecast', {
    templateUrl:'forecast/forecast.template.html',
    controller: function PhoneListController($http) {
	    var self = this;
	    self.visibility = "hidden"

	    self.search = function(city, state) {
	        if (state !== "" && city !== undefined && city!=="") {
	        	$http({
				    method: 'GET',
				    url: 'http://api.wunderground.com/api/d09806e16c9d36eb/conditions/q/' + state + '/' + city + '.json'
				}).then(function successCallback(response) {
				    self.error = response.data.response.error;

	                if(self.error === undefined){
	                	self.visibility = "show";
	                	self.current = response.data.current_observation;

	                	$http.get('http://api.wunderground.com/api/d09806e16c9d36eb/forecast10day/q/' + state + '/' + city + '.json').then(function(response) {
	                    	self.forecast = response.data.forecast.simpleforecast.forecastday;
	               		});
	                }else{
	                	self.visibility = "hidden";
	                	alert('There is no information for the city you are looking for.');
	                }
	                

	                $http.get('./forecast/icons.json').then(function(response) {
	                    self.response = response.data;
	                    self.icon = self.current.icon_url;

	                    angular.forEach(self.response, function(value, key) {
	                        if (self.icon === key) {
	                            self.currentIcon = value;
	                        }
	                    });
	                });
				}, function errorCallback(response) {
				    alert(response.statusText);
				});	           
	        }else{
	        	alert('Please Enter a City and Select a State');
	        }
	    }

	}

  });