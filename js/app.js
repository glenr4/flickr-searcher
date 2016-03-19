angular.module('flickrApp', ['ngMessages', 'ngAnimate'])
.controller('flickrCtrl', function($scope, $http, $timeout){

	$scope.imgFade = false;

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

			$timeout(function() {
				$scope.imgFade = true;	
			}, 0);
			
			// Update search status
			foundStatus(response);
			},

			function(){
				searchError();
			}
		);

		// Update search status
		searchStatus();
	};

	searchStatus = function(){
		$scope.searchStatus = "Searching Flickr for photos tagged with '"+ $scope.searchTag +"'";

		// Reset form
		$scope.searchTag = "";
		$scope.searchForm.$setPristine();
	};

	foundStatus = function(response){
		$scope.searchStatus = "We found "+ response.data.photos.total +" results for '"+ response.config.params.tags +"'";
	};

	searchError = function(){
		$scope.searchStatus = "Sorry there was an unexpected error from the Flickr server, please try again later";
	}

	// Testing
	$scope.fade = function(){
		if ($scope.imgFade){
			$scope.imgFade = false;
		} else {
			$scope.imgFade = true;
		}
	};
});