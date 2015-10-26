var Story = require("../models/storymodel.js")

var createStory = function(request,response){

	var newStory = new Story({
		username        : request.body.username,
		title           : request.body.title,
		description     : request.body.description,
		dateAdded       : request.body.added,
		lastRevised     : request.body.revised,
		comments        : [],
		matureContent   : request.body.mature,
	})

	newStory.save(function(error,doc){
		if(!error){
			response.send(docs)
		}
		else{
			console.log("Error!",error)
		}
	})

}

var getStories = function(request,response){
	story.find({},function(error,docs){
		if(error){
			console.log("Error!",error)
		}
		response.send(docs)
	})
}

module.exports = {
	getStories    : getStories,
	createStory  : createStory,
}