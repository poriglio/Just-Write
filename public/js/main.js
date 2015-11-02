angular.module("storyApp",["ngRoute"])

angular.module("storyApp").config(["$routeProvider",function($routeProvider){

	$routeProvider.when("/",{
		templateUrl : "/html/public/intro.html",
		controller  : "mainController"
	})
	.when("/signup",{
		templateUrl : "/html/public/newuser.html",
		controller  : "mainController"
	})
	.when("/confirm/comment",{
		templateUrl : "/html/confirmation/comment.html",
		controller  : "mainController"
	})
	.when("/confirm/login",{
		templateUrl : "/html/confirmation/login.html",
		controller  : "mainController"
	})
	.when("/confirm/logout",{
		templateUrl : "/html/confirmation/logout.html",
		controller  : "mainController"
	})
	.when("/confirm/registration",{
		templateUrl : "/html/confirmation/registration.html",
		controller  : "mainController"
	})
	.when("/confirm/submission",{
		templateUrl : "/html/confirmation/submission.html",
		controller  : "mainController"
	})

	// var viewFullSite = function(){
		$routeProvider.when("/submit",{
			templateUrl : "/html/private/submissionform.html",
			controller  : "mainController",
		})
		.when("/profile/:username",{
			templateUrl : "/html/private/profile.html",
			controller  : "userController"
		})
		.when("/profile",{
			templateUrl : "/html/private/profile.html",
			controller  : "userController"
		})
		.when("/browse",{
			templateUrl : "/html/private/browse.html",
			controller  : "userController"
		})
		.when("/stories/:submission",{
			templateUrl : "/html/private/submission.html",
			controller  : "submissionController"
		})
		.when("/essays/:submission",{
			templateUrl : "/html/private/submission.html",
			controller  : "submissionController"
		})
		.when("/poems/:submission",{
			templateUrl : "/html/private/submission.html",
			controller  : "submissionController"
		})
	// }

}])

angular.module("storyApp").controller("mainController",["$scope","$http","badgeFactory",function($scope,$http,badgeFactory){

	$scope.badges = badgeFactory.badges

	$scope.loggedIn = false

	$http.get("/api/me").then(function(returnData){
			if(returnData.data.username){
				$scope.loggedIn = true
				return true
			}
			else{
				$scope.loggedIn = false
				return false
			}
		})
}])

angular.module("storyApp").controller("userController",["$scope","$http",function($scope,$http){

	$scope.users = []
	$scope.poems   = []
	$scope.stories = []
	$scope.essays  = []
	$scope.badges = []

	var buildProfile = function(user){
		$http.get("/api/users/" + user).then(function(returnData){
			$scope.users.push(returnData.data)
		})

		$http.get("/api/stories/" + user).then(function(returnData){
			$scope.stories.push(returnData.data)
			if($scope.stories[0].length===0){
				$scope.storyMessage = "This user has not yet submitted a story."
			}
		})

		$http.get("/api/poems/" + user).then(function(returnData){
			$scope.poems.push(returnData.data)
			if($scope.poems[0].length===0){
				$scope.poemMessage = "This user has not yet submitted a poem."
			}
		})

		$http.get("/api/essays/" + user).then(function(returnData){
			$scope.essays.push(returnData.data)
			if($scope.essays[0].length===0){
				$scope.essayMessage = "This user has not yet submitted a story."
			}
		})
	}

	if(window.location.hash.split("/")[1]==="browse"){
		var user = "returnAll"
		buildProfile(user)
	}
	else if(window.location.hash.split("/")[2]==undefined){
		$http.get("api/me").then(function(returnData){
			var user = returnData.data.username
			buildProfile(user)
		})
	}
	else{
		var user = window.location.hash.split("/")[2]
		buildProfile(user)
	}

}])

angular.module("storyApp").controller("submissionController",["$scope","$http","$location",function($scope,$http,$location){

	$scope.submissions = []
	$scope.comments = []


	var type = window.location.hash.split("/")[1]

	var id = window.location.hash.split("/")[2]

	$http.get("/api/comments/"+type+"/"+id).then(function(returnData){
		$scope.comments.push(returnData.data)
		console.log($scope.comments)
	})

	if(type==="stories"){
		$http.get("/api/story/" + id).then(function(returnData){
			$scope.submissions.push(returnData.data)
		})
	}
	else if(type==="poems"){
		$http.get("/api/poem/" + id).then(function(returnData){
			$scope.submissions.push(returnData.data)
		})
	}
	else if(type==="essays"){
		$http.get("/api/essay/" + id).then(function(returnData){
			$scope.submissions.push(returnData.data)
		})
	}

	var Comment = function (type,comment,submissionId) {
		this.type         = type
		this.comment      = comment
		this.submissionID = submissionId
	}

	$scope.submitComment = function(){

		var comment 	 = $scope.comment
		var type 		 = window.location.hash.split("/")[1]
		var submissionId = window.location.hash.split("/")[2]

		var newComment = new Comment(type,comment,submissionId)

		$scope.comment = ""
	    
	    $http({
	            method : 'POST',
	            url    : '/api/comment',
	            data   : newComment
	        }).success(
	        	$location.path("/confirm/comment")
	    )
	}
}])