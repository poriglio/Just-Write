var Essay = require("../models/essaymodel.js")

var createEssay = function(request,response){

	var newEssay = new Essay({
		username        : request.body.username,
		title           : request.body.title,
		description     : request.body.description,
		dateAdded       : request.body.added,
		lastRevised     : "not yet revised",
		comments        : [],
		matureContent   : request.body.mature,
		content         : request.body.content,
		type            : "essay",
	})

	newEssay.save(function(error){
		if(!error){
			response.send("Thanks for your submission!")
		}
		else{
			console.log("Error!",error)
		}
	})

}

var findEssay = function(request,response){
	var id = request.params.submission
	Essay.findOne({_id : id},function(error,doc){
		response.send(doc)
	})
}

module.exports = {
	findEssay    : findEssay,
	createEssay  : createEssay,
}