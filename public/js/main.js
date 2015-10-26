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

}])

angular.module("storyApp").controller("mainController",["$scope","$http",function($scope,$http){

}])

angular.module("storyApp").controller("privateController",["$scope","$http",function($scope,$http){

}])