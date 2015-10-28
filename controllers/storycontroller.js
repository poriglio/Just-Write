var Story = require("../models/storymodel.js")

var createStory = function(request,response){
	
	var newStory = new Story({
		username        : request.body.username,
		title           : request.body.title,
		description     : request.body.description,
		dateAdded       : request.body.added,
		lastRevised     : "not yet revised",
		comments        : [],
		matureContent   : request.body.mature,
		content         : request.body.content,
		type            : "story",
	})

	newStory.save(function(error){
		if(!error){
			response.send("Thanks for your submission!")
		}
		else{
			console.log("Error!",error)
		}
	})

}

var findStory = function(request,response){
	var id = request.params.submission
	console.log(id)
	Story.findOne({_id : id},function(error,doc){
		response.send(doc)
	})
}

module.exports = {
	findStory    : findStory,
	createStory  : createStory,
}