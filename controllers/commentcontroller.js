var Comment = require("../models/commentmodel.js")
var StoryComment = require("../models/storycommentmodel.js")
var EssayComment = require("../models/essaycommentmodel.js")
var PoemComment = require("../models/poemcommentmodel.js")
var User = require("../models/usermodel.js")

var createComment = function (request,response){

	var d = new Date();
	var n = d.getTime();

	var username = request.user.username

	var newComment = new Comment({

		date            : n,
		username        : request.user.username,
		comment         : request.body.comment,
		submissionId    : request.body.submissionId,
	})

	newComment.save(function(error,doc){
		if(!error){
			User.update({username: username},{$inc:{numComments : 1}},function(error,docs){
				if(error){
					return error
				}
			})
			response.redirect("/#/confirm/comment")
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