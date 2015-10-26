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

var getPoem = function(request,response){
	Poem.find({},function(error,docs){
		if(error){
			console.log("Error!",error)
		}
		response.send(docs)
	})
}

module.exports = {
	getPoem    : getPoem,
	createPoem  : createPoem,
}