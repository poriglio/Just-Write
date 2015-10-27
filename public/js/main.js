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
		controller  : "privateController",
	})
	.when("/profile/:username",{
		templateUrl : "/html/private/profile.html",
		controller  : "mainController"
	})
	.when("/browse",{
		templateUrl : "/html/private/browse.html",
		controller  : "mainController"
	})
	.when("/submission",{
		templateUrl : "/html/private/submission.html",
		controller  : "privateController",
	})


}])

angular.module("storyApp").controller("mainController",["$scope","$http","badgeFactory",function($scope,$http,badgeFactory){

	$scope.badges = badgeFactory.badges

}])

angular.module("storyApp").controller("submissionController",["$scope","$http",function($scope,$http){

	var submissionID = windown.location.pathname.split("/")[2]

	$http.get("/api/story/" + submissionID)
		.then(function(returnData){
			$scope.submission = returnData.data
		})

	$http.get("/api/poem/" + submissionID)
		.then(function(returnData){
			$scope.submission = returnData.data
		})

	$http.get("/api/essay/" + submissionID)
		.then(function(returnData){
			$scope.submission = returnData.data
		})

}])

angular.module("storyApp").controller("userController",["$scope","$http",function($scope,$http){

	$scope.users = []

	var user = window.location.pathname.split("/")[2]

	$http.get("/api/users/" + user).then(function(returnData){
		$scope.users.push(returnData.data)
	})

}])