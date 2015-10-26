var Comment = require("../modles/commentmodel.js")

var createComment = function (request,response){

	var newComment = new Comment({

		date            : request.body.date,
		username        : request.body.username,
		submissionType  : request.body.submissionType,
		submissionId    : request.body.submissionId,

	})

	newComment.save(function(error,doc){
		if(!error){
			response.send(doc)
		}
		else{
			console.log("Error!",error)
		}
	})
}

var getComments = function(request,response){
	Comment.find({},function(error,docs){
		if(!error){
			response.send(docs)
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