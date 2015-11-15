angular.module("storyApp").factory("callFactory",function(){

	var getStories = function($http,$scope,user){
		$http.get("/api/stories/" + user).then(function(returnData){
			$scope.stories = returnData.data
		})	
	}

	var getEssays = function($http,$scope,user){
		$http.get("/api/essays/" + user).then(function(returnData){
			$scope.essays = returnData.data
		})	
	}

	var getPoems = function($http,$scope,user){
		$http.get("/api/poems/" + user).then(function(returnData){
			$scope.poems = returnData.data
		})	
	}

	return {
		getStories : getStories,
		getPoems   : getPoems,
		getEssays  : getEssays,
	}

})