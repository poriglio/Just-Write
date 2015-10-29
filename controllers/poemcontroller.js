var Poem = require("../models/poemmodel.js")

var createPoem = function(request,response){

	var newPoem = new Poem({
		username        : request.user.username,
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

var findPoems = function(request,response){
	if(request.params.username!=="returnAll"){
		var username = request.params.username
		Poem.find({username: username},function(error,docs){
			response.send(docs)
		})
	}
	else if(request.params.username==="returnAll"){
		Poem.find({},function(error,docs){
			response.send(docs)
		})
	}
}

module.exports = {
	findPoem    : findPoem,
	createPoem  : createPoem,
	findPoems   : findPoems,
}