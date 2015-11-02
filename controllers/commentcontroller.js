var PoemComment = require("../models/poemcomment.js")
var StoryComment = require("../models/storycomment.js")
var EssayComment = require("../models/essaycomment.js")
var Poem = require("../models/poemmodel.js")
var Story = require("../models/storymodel.js")
var Essay = require("../models/essaymodel.js")
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
			console.log("it works")
			User.update({username: username},{$inc:{numComments : 1}},function(error){
				if(error){
					return error
				}
			})
			if(request.body.type === "stories"){
				Story.update({_id: request.body.submissionID},{$inc:{numComments:1}},function(error,docs){
					if(error){
						return error
					}
				})
			}
			else if(request.body.type==="poems"){
				Poem.update({_id: request.body.submissionID},{$inc:{numComments:1}},function(error,docs){
					if(error){
						return error
					}
				})
			}
			else if(request.body.type==="essays"){
				Essay.update({_id: request.body.submissionID},{$inc:{numComments:1}},function(error,docs){
					if(error){
						return error
					}
				})
			}
		}
		else{
			console.log("Error!",error)
		}
	})
}

var getComments = function(request,response){

	console.log(request.params.type)
	console.log(request.params.submissionID)

	var type = request.params.type
	var id = request.params.submissionID

	if(type==="stories"){
		StoryComment.find({submissionId:id},function(error,docs){
			if(!error){
				response.send(docs)
			}
			else{
				console.log("Error!")
			}
		})
	}
	else if(type==="poems"){
		PoemComment.find({submissionId:id},function(error,docs){
			if(!error){
				response.send(docs)
			}
			else{
				console.log("Error!")
			}
		})
	}
	else if(type==="essays"){
		EssayComment.find({submissionId:id},function(error,docs){
			if(!error){
				response.send(docs)
			}
			else{
				console.log("Error!")
			}
		})
	}
}

module.exports = {
	createComment    : createComment,
	getComments      : getComments,
}