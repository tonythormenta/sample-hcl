var myApp = angular.module('myApp',[]).
factory('serviceFoodReport',['$http',function($http){
		var serviceFoodReport = {};
		serviceFoodReport.getFoodReport = function(id){
				return $http.get('http://api.nal.usda.gov/ndb/reports/?ndbno=' + id + '&type=f&format=json&api_key=ypJ44EJeNojiUAvoi7gkimYLWcx7Dl4m3E4sDGUe');
			}
		return serviceFoodReport
	}]
);
myApp.controller('foodController',function($scope, $http , serviceFoodReport) {
			//$scope.id = '0';
			$scope.showReport = false;
			$scope.return = function(){
				$scope.showReport = false;
			}
			$scope.callFoodReport = function (index) {
				$scope.id = $scope.foodList[index].id;
				serviceFoodReport.getFoodReport($scope.id)
				.then(function (response) {
					$scope.nutrientList = response.data.report.food.nutrients;;
					$scope.showReport = true;
				}, function (error) {
					$scope.status = 'Unable to load customer data: ' + error.message;
				});
			}
			$http.get('http://api.nal.usda.gov/ndb/list?format=json&lt=f&sort=n&api_key=ypJ44EJeNojiUAvoi7gkimYLWcx7Dl4m3E4sDGUe').
			success(function(data) {
					//var dataArray = $.map(data, function(el) { return el });
			$scope.foodList = data.list.item;
					//alert(data.list.item);
			});
			 //$scope.getFoodList = [ '$scope', '$http', function restFoodList($scope, $http) {
			//alert('dentro de la funcion')
			//$scope.id = '1'
});
