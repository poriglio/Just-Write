angular.module("storyApp",["ngRoute"])

angular.module("storyApp").config(["$routeProvider",function($routeProvider){

	$routeProvider.when("/",{
		templateUrl : "/html/public/intro.html",
		controller  : "mainController"
	})
	.when("/guidelines",{
		templateUrl : "/html/public/guidelines.html",
		controller  : "mainController"
	})
	.when("/faqs",{
		templateUrl : "/html/public/faqs.html",
		controller  : "mainController"
	})
	.when("/about",{
		templateUrl : "/html/public/about.html",
		controller  : "mainController"
	})
	.when("/contact",{
		templateUrl : "/html/public/contact.html",
		controller  : "mainController"
	})
	.when("/signup",{
		templateUrl : "/html/public/newuser.html",
		controller  : "mainController"
	})
	.when("/submit",{
		templateUrl : "/html/private/submissionform.html",
		controller  : "mainController",
	})
	.when("/profile/:username",{
		templateUrl : "/html/private/profile.html",
		controller  : "userController"
	})
	.when("/browse",{
		templateUrl : "/html/private/browse.html",
		controller  : "mainController"
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

}])

angular.module("storyApp").controller("mainController",["$scope","$http","badgeFactory",function($scope,$http,badgeFactory){

	$scope.badges = badgeFactory.badges

}])

angular.module("storyApp").controller("userController",["$scope","$http",function($scope,$http){

	$scope.users = []

	var user = window.location.hash.split("/")[2]

	$http.get("/api/users/" + user).then(function(returnData){
		$scope.users.push(returnData.data)
	})

}])

angular.module("storyApp").controller("submissionController",["$scope","$http",function($scope,$http){

	$scope.submissions = []

	var type = window.location.hash.split("/")[1]

	var id = window.location.hash.split("/")[2]

	if(type==="stories"){
		$http.get("/api/stories/" + id).then(function(returnData){
			$scope.submissions.push(returnData.data)
		})
	}
	else if(type==="poems"){
		$http.get("/api/poems/" + id).then(function(returnData){
			$scope.submissions.push(returnData.data)
		})
	}
	else if(type==="essays"){
		$http.get("/api/essays/" + id).then(function(returnData){
			$scope.submissions.push(returnData.data)
		})
	}

}])