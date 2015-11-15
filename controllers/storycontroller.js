var Story = require("../models/storymodel.js")
var User = require("../models/usermodel.js")


var createStory = function(request,response){

	var d = new Date();
	var n = d.getTime();

	var username = request.user.username

	var title

	if(request.body.title===""){
		title = "Untitled"
	}
	else{
		title = request.body.title
	}
	
	var newStory = new Story({
		username        : request.user.username,
		title           : title,
		description     : request.body.description,
		lastRevised     : "not yet revised",
		matureContent   : request.body.mature,
		content         : request.body.content.split("[p]"),
		type            : "story",
		dateAdded       : n,
		numComments     : +0,
	})

	newStory.save(function(error){
		if(!error){
			User.update({username: username},{$inc:{numSubmissions : 1}},function(error,docs){
				if(error){
					return error
				}
			})
			User.update({username: username},{$inc:{numStories : 1}},function(error,docs){
				if(error){
					return error
				}
			})
		}
		else{
			console.log("Error!",error)
		}
		response.redirect("/#/confirm/submission")
	})

}

var findStory = function(request,response){
	var id = request.params.submission
	Story.findOne({_id : id},function(error,doc){
		response.send(doc)
	})
}

var findStories = function(request,response){
	if(request.params.username!=="returnAll"){
		var username = request.params.username
		Story.find({username: username},function(error,docs){
			response.send(docs)
		})
	}
	else if(request.params.username==="returnAll"){
		Story.find({},function(error,docs){
			response.send(docs)
		})
	}
}

var editStory = function(request,response){
	console.log(request.body)
}

var deleteStory = function(request,response){
	console.log(request.body)
}

module.exports = {
	findStory    : findStory,
	createStory  : createStory,
	findStories  : findStories,
	editStory    : editStory,
	deleteStory  : deleteStory,
}