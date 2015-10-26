var Poem = require("../models/poemmodel.js")

var createPoem = function(request,response){

	var newPoem = new Poem({
		username        : request.body.username,
		title           : request.body.title,
		description     : request.body.description,
		dateAdded       : request.body.added,
		lastRevised     : request.body.revised,
		comments        : [],
		matureContent   : request.body.mature,
	})

	newPoem.save(function(error,doc){
		if(!error){
			response.send(docs)
		}
		else{
			console.log("Error!",error)
		}
	})

}

var getPoems = function(request,response){
	Poem.find({},function(error,docs){
		if(error){
			console.log("Error!",error)
		}
		response.send(docs)
	})
}

module.exports = {
	getPoems    : getPoems,
	createPoem  : createPoem,
}