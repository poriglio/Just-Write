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
	.when("/submissionform",{
		templateUrl : "/html/private/submissionform.html",
		controller  : "privateController",
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