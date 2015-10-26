var Essay = require("../models/essaymodel.js")

var createEssay = function(request,response){

	var newEssay = new Essay({
		username        : request.body.username,
		title           : request.body.title,
		description     : request.body.description,
		dateAdded       : request.body.added,
		lastRevised     : request.body.revised,
		comments        : [],
		matureContent   : request.body.mature,
	})

	newEssay.save(function(error,doc){
		if(!error){
			response.send(docs)
		}
		else{
			console.log("Error!",error)
		}
	})

}

var getEssays = function(request,response){
	Essay.find({},function(error,docs){
		if(error){
			console.log("Error!",error)
		}
		response.send(docs)
	})
}

module.exports = {
	getEssays    : getEssays,
	createEssay  : createEssay,
}