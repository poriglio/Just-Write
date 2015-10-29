var Comment = require("../models/commentmodel.js")

var createComment = function (request,response){

	var d = new Date();
	var n = d.getTime();

	console.log(request.body)

	var newComment = new Comment({

		date            : n,
		username        : request.user.username,
		comment         : request.body.comment,
		submissionId    : request.body.submissionId,
	})

	newComment.save(function(error,doc){
		if(!error){
			response.send("Thank you for commenting!")
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