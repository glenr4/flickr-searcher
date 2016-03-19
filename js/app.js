angular.module('flickrApp', ['ngMessages'])
.controller('flickrCtrl', function($scope, $http){

	

	$scope.submit = function(){
		var url = "https://api.flickr.com/services/rest";
		var params = {
	    method: 'flickr.photos.search',
	    api_key: 'af1df5d17d123f5acf4da73848a1c8c7',
	    tags: $scope.searchTag,
	    format: 'json',
	    nojsoncallback: 1
		};

		$http({
			url: url,
			params: params
		})
		.then(function(response){
			$scope.photos = response.data.photos.photo;
		});
	};


});