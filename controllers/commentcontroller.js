var PoemComment = require("../models/poemcomment.js")
var StoryComment = require("../models/storycomment.js")
var EssayComment = require("../models/essaycomment.js")
var User = require("../models/usermodel.js")

var createComment = function (request,response){

	var d = new Date();
	var n = d.getTime();

	var username = request.user.username

	if(request.body.type==="stories"){
		var newComment = new StoryComment({

			date            : n,
			username        : request.user.username,
			comment         : request.body.comment,
			submissionId    : request.body.submissionID,
	})
	}

	else if(request.body.type==="essays"){
		var newComment = new EssayComment({

			date            : n,
			username        : request.user.username,
			comment         : request.body.comment,
			submissionId    : request.body.submissionID,
	})
	}
	else if(request.body.type==="poems"){
		var newComment = new PoemComment({

			date            : n,
			username        : request.user.username,
			comment         : request.body.comment,
			submissionId    : request.body.submissionID,
	})
	}

	newComment.save(function(error){
		if(!error){
			User.update({username: username},{$inc:{numComments : 1}},function(error){
				if(error){
					return error
				}
			})
		}
		else{
			console.log("Error!",error)
		}
	})
}

var getComments = function(request,response){
	Comment.find({},function(error,docs){
		if(!error){
			response.send("Thank you for commenting!")
		}
		else{
			console.log("Error!",error)
		}
	})
}

module.exports = {
	createComment    : createComment,
	getComments      : getComments,
}