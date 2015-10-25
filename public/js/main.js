angular.module("storyApp",["ngRoute"])

angular.module("storyApp").config(["$routeProvider",function($routeProvider){

	$routeProvider.when("/",{
		templateUrl : "/html/intro.html",
		controller  : "mainController"
	})
	.when("/guidelines",{
		templateUrl : "/html/guidelines.html",
		controller  : "mainController"
	})
	.when("/faqs",{
		templateUrl : "/html/faqs.html",
		controller  : "mainController"
	})
	.when("/about",{
		templateUrl : "/html/about.html",
		controller  : "mainController"
	})
	.when("/contact",{
		templateUrl : "/html/contact.html",
		controller  : "mainController"
	})

}])

angular.module("storyApp").controller("mainController",["$scope","$http",function($scope,$http){

}])