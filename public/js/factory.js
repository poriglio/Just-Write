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

	var getSubmission = function($http,$scope,type,id,user){
		$http.get("/api/" + type + "/" + id).then(function(returnData){
			$scope.submission = []
			if(user === returnData.data.username){
				$scope.submission.push(returnData.data)
			}
			else{
				$scope.message = "You are not allowed to view this page."
			}
		})
	}

	return {
		getStories    : getStories,
		getPoems      : getPoems,
		getEssays     : getEssays,
		getSubmission : getSubmission,
	}

})