var Poem = require("../models/poemmodel.js")

var createPoem = function(request,response){

	var newPoem = new Poem({
		username        : request.body.username,
		title           : request.body.title,
		description     : request.body.description,
		dateAdded       : request.body.added,
		lastRevised     : "not yet revised",
		comments        : [],
		matureContent   : request.body.mature,
		content         : request.body.content,
		type            : "poem",
	})

	newPoem.save(function(error){
		if(!error){
			response.send("Thanks for your submission!")
		}
		else{
			console.log("Error!",error)
		}
	})

}

var findPoem = function(request,response){
	var id = request.params.submission
	Poem.findOne({_id : id},function(error,doc){
		response.send(doc)
	})
}

module.exports = {
	findPoem    : findPoem,
	createPoem  : createPoem,
}