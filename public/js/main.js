angular.module("storyApp",["ngRoute","ui.bootstrap"])

angular.module("storyApp").controller("dropdownController",["$scope","$log",function($scope,$log){

  $scope.browseItems = [
  		"users",
  		"stories",
  		"poems",
  		"essays"
  ];

  $scope.accountItems = [
  		"profile",
  		"submissions"
  ]

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

}])

angular.module("storyApp").config(["$routeProvider",function($routeProvider){

	$routeProvider.when("/",{
		templateUrl : "/html/public/intro.html",
		controller  : "mainController"
	})
	.when("/signup",{
		templateUrl : "/html/public/newuser.html",
		controller  : "mainController"
	})
	.when("/loginerror",{
		templateUrl : "/html/confirmation/loginerror.html",
		controller  : "mainController"
	})
	.when("/confirm/comment",{
		templateUrl : "/html/confirmation/comment.html",
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
	.when("/browse/users",{
		templateUrl : "/html/private/browseusers.html",
		controller : "browseController"
	})
	.when("/browse/:type",{
		templateUrl : "/html/private/browsesubmissions.html",
		controller : "browseController"
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
	.when("/account/profile",{
		templateUrl : "/html/private/myaccount.html",
		controller : "accountController"
	})
	.when("/account/submissions",{
		templateUrl : "/html/private/editsubmissions.html",
		controller  : "accountController"
	})
	.when("/account/:type/:id",{
		templateUrl : "/html/private/editsubmission.html",
		controller  : "accountController"
	})

}])

angular.module("storyApp").controller("mainController",["$scope","$http","$location","callFactory",function($scope,$http,$location,callFactory){

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

angular.module("storyApp").controller("userController",["$scope","$http","callFactory",function($scope,$http,callFactory){

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

angular.module("storyApp").controller("submissionController",["$scope","$http","$location","callFactory",function($scope,$http,$location,callFactory){

	var loggedInUser = ""
	$scope.submissionAuthor = ""

	$scope.submissions = []

	var type = window.location.hash.split("/")[1]

	$scope.type = type

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

	var checkAuthor = function(){
		$http.get("/api/me").then(function(returnData){
			loggedInUser = returnData.data.username
			return loggedInUser
		}).then(function(){
			return loggedInUser == $scope.submissions.username
	})
	}

	if(type==="stories"){
		$http.get("/api/story/" + id).then(function(returnData){
			$scope.submissions = returnData.data
		}).then(function(){$scope.submissionAuthor = checkAuthor();return $scope.submissionAuthor})
	}
	else if(type==="poems"){
		$http.get("/api/poem/" + id).then(function(returnData){
			$scope.submissions = returnData.data
		}).then(function(){$scope.submissionAuthor = checkAuthor();return $scope.submissionAuthor})
	}
	else if(type==="essays"){
		$http.get("/api/essay/" + id).then(function(returnData){
			$scope.submissions = returnData.data
		}).then(function(){$scope.submissionAuthor = checkAuthor();return $scope.submissionAuthor})
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

angular.module("storyApp").controller("browseController",["$scope","$http","callFactory",function($scope,$http,callFactory){

	$scope.getUsers = function(user){
		
		$scope.users = []
		$scope.usersProlific = []
		$scope.usersRandom = []
		$scope.usersNewest = []

		$http.get("/api/users/" + user).then(function(returnData){
			angular.copy(returnData.data,$scope.usersProlific)
			angular.copy(returnData.data,$scope.usersRandom)
			angular.copy(returnData.data,$scope.usersNewest)
			angular.copy(returnData.data,$scope.users)
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
	}

	$scope.getStories = function(user){

		$scope.storiesPopular = []
		$scope.storiesRandom = []
		$scope.storiesNewest = []

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
	}

	$scope.getEssays = function(user){

		$scope.essaysPopular = []
		$scope.essaysRandom = []
		$scope.essaysNewest = []

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

	$scope.getPoems = function(user){

		$scope.poemsPopular = []
		$scope.poemsRandom = []
		$scope.poemsNewest = []

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
	}

	$scope.sortUsers = function(query){

		switch(query){
			case "date":
				$scope.users.sort(function(a,b){
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
				break;
			case "submissions":
				$scope.users.sort(function(a,b){
					if(a.numSubmissions == undefined){
						return 1
					}
					else if(b.numSubmissions == undefined){
						return -1
					}
					else{
						return b.numSubmissions - a.numSubmissions
					}
				})
				break;
			case "stories":
				$scope.users.sort(function(a,b){
					if(a.numStories == undefined){
						return 1
					}
					else if(b.numStories == undefined){
						return -1
					}
					else{
						return b.numStories - a.numStories
					}
				})
				break;
			case "poems":
				$scope.users.sort(function(a,b){
					if(a.numPoems == undefined){
						return 1
					}
					else if(b.numPoems == undefined){
						return -1
					}
					else{
						return b.numPoems - a.numPoems
					}
				})
				break;
			case "essays":
				$scope.users.sort(function(a,b){
					if(a.numEssays == undefined){
						return 1
					}
					else if(b.numEssays == undefined){
						return -1
					}
					else{
						return b.numEssays - a.numEssays
					}
				})
				break;
			case "comments":
				$scope.users.sort(function(a,b){
					if(a.numComments == undefined){
						return 1
					}
					else if(b.numComments == undefined){
						return -1
					}
					else{
						return b.numComments - a.numComments
					}
				})
				break;
			case "alpha":
				$scope.users.sort(function(a,b){
					for(var i = 0; i<a.usernameLower.length;i++){
						var sort =  a.usernameLower.charCodeAt(i) - b.usernameLower.charCodeAt(i)
						if(sort!=0){
							return sort
							break
						}
					}
				})
				break;
		}
	}


	$scope.sortSubmissions = function(query){
		switch(query){
			case "newest":
				$scope.submissions.sort(function(a,b){
					if(a.dateAdded == undefined){
						return 1
					}
					else if(b.dateAdded == undefined){
						return -1
					}
					else{
						return b.dateAdded - a.dateAdded
					}
				});
				break;
			case "oldest":
				$scope.submissions.sort(function(a,b){
					if(a.dateAdded == undefined){
						return -1
					}
					else if(b.dateAdded == undefined){
						return 1
					}
					else{
						return a.dateAdded - b.dateAdded
					}
				});
				break;
			case "popular":
				$scope.submissions.sort(function(a,b){
					return b.numComments - a.numComments
				});
				break;
			case "username":
				$scope.submissions.sort(function(a,b){
					for(var i = 0; i<a.username.length;i++){
						var sort =  a.username.toLowerCase().charCodeAt(i) - b.username.toLowerCase().charCodeAt(i)
						if(sort!=0){
							return sort
							break
						}
					}
				});
				break;
			case "title":
				$scope.submissions.sort(function(a,b){
					for(var i=0;i<a.title.length;i++){
						var sort = a.title.toLowerCase().charCodeAt(i)-b.title.toLowerCase().charCodeAt(i)
						if(sort!=0){
							return sort
							break
						}
					}
				});
				break;
		}
	}

	var user = "returnAll"
	$scope.getStories(user)
	$scope.getUsers(user)
	$scope.getPoems(user)
	$scope.getEssays(user)

	if(window.location.hash.split("/")[2]){
		$scope.browseType = window.location.hash.split("/")[2]
		$scope.browseType = $scope.browseType[0].toUpperCase() + $scope.browseType.slice(1,7)
		switch($scope.browseType){
			case "Stories":
				$scope.submissions = $scope.storiesPopular;
				break;
			case "Poems":
				$scope.submissions = $scope.poemsPopular;
				break;
			case "Essays":
				$scope.submissions = $scope.essaysPopular;
				break;

		}
	}

}])

angular.module("storyApp").controller("accountController",["$scope","$http","callFactory",function($scope,$http,callFactory){
	
	$http.get("/api/me").then(function(returnData){
		$scope.me = returnData.data
		var user = returnData.data.username
		if(window.location.hash.split("/")[3]==undefined){
			callFactory.getStories($http,$scope,user)
			callFactory.getPoems($http,$scope,user)
			callFactory.getEssays($http,$scope,user)
		}
		else{
			var type = window.location.hash.split("/")[2]
			var id = window.location.hash.split("/")[3]
			callFactory.getSubmission($http,$scope,type,id,user)
		}
	})

	$scope.editSubmission = function(type){
		switch(type){
			case "story":
				$http({
		            method : 'POST',
		            url    : '/api/story',
		            data   : $scope.submission
	        	}).success(
	        	console.log("success")
	    		);
				break;
			case "poem":
				$http({
		            method : 'POST',
		            url    : '/api/poem',
		            data   : $scope.submission
	        	}).success(
	        	console.log("success")
	    		);
				break;
			case "essay":
				$http({
		            method : 'POST',
		            url    : '/api/essay',
		            data   : $scope.submission
	        	}).success(
	        	console.log("success")
	    		);
				break;
		}
	}

	$scope.deleteSubmission = function(type){
		console.log("function called")
		console.log(type)
		switch(type){
			case "story":
			console.log($scope.story)
				$http({
		            method : 'POST',
		            url    : '/api/story/delete',
		            data   : $scope.story
	        	}).success(
	        	console.log("success")
	    		);
				break;
			case "poem":
				$http({
		            method : 'POST',
		            url    : '/api/poem/delete',
		            data   : $scope.poem
	        	}).success(
	        	console.log("success")
	    		);
				break;
			case "essay":
				$http({
		            method : 'POST',
		            url    : '/api/essay/delete',
		            data   : $scope.essay
	        	}).success(
	        	console.log("success")
	    		);
				break;
		}
	}

}])