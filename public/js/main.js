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
	.when("/submit",{
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
		controller  : "browseController"
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

angular.module("storyApp").controller("mainController",["$scope","$http","$location",function($scope,$http,$location){

	$scope.loggedIn = false

	$http.get("/api/me").then(function(returnData){
			if(returnData.data.username){
				$scope.loggedIn = true
				return true
			}
			else{
				$scope.loggedIn = false
				// $location.path("/")
				return false
			}
		})
}])

angular.module("storyApp").controller("userController",["$scope","$http",function($scope,$http){

	$scope.users = []
	$scope.poems   = []
	$scope.stories   = []
	$scope.essays   = []

	var buildProfile = function(user){
		$http.get("/api/users/" + user).then(function(returnData){
			$scope.users.push(returnData.data)
		})

		$http.get("/api/stories/" + user).then(function(returnData){
			angular.copy(returnData.data,$scope.stories)
			$scope.stories.sort(function(a,b){
				return b.dateAdded - a.dateAdded
			})
		})

		$http.get("/api/poems/" + user).then(function(returnData){
			$scope.poems = returnData.data
			$scope.poems.sort(function(a,b){
				return a.dateAdded - b.dateAdded
			})
		})

		$http.get("/api/essays/" + user).then(function(returnData){
			$scope.essays = returnData.data
			$scope.essays.sort(function(a,b){
				return a.dateAdded - b.dateAdded
			})
		})
	}

	if(window.location.hash.split("/")[2]==undefined){
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

	var type = window.location.hash.split("/")[1]

	var id = window.location.hash.split("/")[2]

	$http.get("/api/comments/"+type+"/"+id).then(function(returnData){
		$scope.comments = []
		angular.copy(returnData.data,$scope.comments)
		$scope.comments.sort(function(a,b){
			if(b.date>a.date){
				return 1
			}
			else if(a.date>b.date){
				return -1
			}
			else{
				return 0 
			}
		})
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
	    
		$scope.$parent.comment = ""

	    $http({
	            method : 'POST',
	            url    : '/api/comment',
	            data   : newComment
	        }).success(
	        	
	        	$location.path("/confirm/comment")
	    )
	}

}])

angular.module("storyApp").controller("browseController",["$scope","$http",function($scope,$http){

	$scope.usersProlific = []
	$scope.usersRandom = []
	$scope.usersNewest = []

	$scope.poemsPopular = []
	$scope.poemsRandom = []
	$scope.poemsNewest = []

	$scope.storiesPopular = []
	$scope.storiesRandom = []
	$scope.storiesNewest = []

	$scope.essaysPopular = []
	$scope.essaysRandom = []
	$scope.essaysNewest = []

	var buildProfile = function(user){
		$http.get("/api/users/" + user).then(function(returnData){
			angular.copy(returnData.data,$scope.usersProlific)
			angular.copy(returnData.data,$scope.usersRandom)
			angular.copy(returnData.data,$scope.usersNewest)
			$scope.usersRandom.sort(function(a,b){
				return Math.random() - Math.random()
			})
			$scope.usersProlific.sort(function(a,b){
				return b.numSubmissions - a.numSubmissions
			})
			$scope.usersNewest.sort(function(a,b){
				if(a.dateJoined == undefined){
					return 1
				}
				else if(b.dateJoined == undefined){
					return -1
				}
				else{
					return b.dateJoined - a.dateJoined
				}
			})
		})

		$http.get("/api/stories/" + user).then(function(returnData){
			angular.copy(returnData.data,$scope.storiesPopular)
			angular.copy(returnData.data,$scope.storiesRandom)
			angular.copy(returnData.data,$scope.storiesNewest)
			$scope.storiesRandom.sort(function(a,b){
				return Math.random() - Math.random()
			})
			$scope.storiesPopular.sort(function(a,b){
				return b.numComments - a.numComments
			})
			$scope.storiesNewest.sort(function(a,b){
				if(a.dateAdded == undefined){
					return 1
				}
				else if(b.dateAdded == undefined){
					return -1
				}
				else{
					return b.dateAdded - a.dateAdded
				}
			})
		})

		$http.get("/api/poems/" + user).then(function(returnData){
			angular.copy(returnData.data,$scope.poemsPopular)
			angular.copy(returnData.data,$scope.poemsRandom)
			angular.copy(returnData.data,$scope.poemsNewest)
			$scope.poemsRandom.sort(function(a,b){
				return Math.random() - Math.random()
			})
			$scope.poemsPopular.sort(function(a,b){
				return b.numComments - a.numComments
			})
			$scope.poemsNewest.sort(function(a,b){
				if(a.dateAdded == undefined){
					return 1
				}
				else if(b.dateAdded == undefined){
					return -1
				}
				else{
					return b.dateAdded - a.dateAdded
				}
			})
		})

		$http.get("/api/essays/" + user).then(function(returnData){
			angular.copy(returnData.data,$scope.essaysPopular)
			angular.copy(returnData.data,$scope.essaysRandom)
			angular.copy(returnData.data,$scope.essaysNewest)
			$scope.essaysRandom.sort(function(a,b){
				return Math.random() - Math.random()
			})
			$scope.essaysPopular.sort(function(a,b){
				return b.numComments - a.numComments
			})
			$scope.essaysNewest.sort(function(a,b){
				if(a.dateAdded == undefined){
					return 1
				}
				else if(b.dateAdded == undefined){
					return -1
				}
				else{
					return b.dateAdded - a.dateAdded
				}
			})
		})
	}

	var user = "returnAll"
	buildProfile(user)

}])