var Essay = require("../models/essaymodel.js")
var User = require("../models/usermodel.js")

var createEssay = function(request,response){

	var username = request.user.username

	var title

	if(request.body.title===""){
		title = "Untitled"
	}
	else{
		title = request.body.title
	}

	var newEssay = new Essay({
		username        : request.user.username,
		title           : title,
		description     : request.body.description,
		dateAdded       : request.body.added,
		lastRevised     : "not yet revised",
		matureContent   : request.body.mature,
		content         : request.body.content.split("[p]"),
		type            : "essay",
	})

	newEssay.save(function(error){
		if(!error){
			User.update({username: username},{$inc:{numSubmissions : 1}},function(error,docs){
				if(error){
					return error
				}
			})
			User.update({username: username},{$inc:{numEssays : 1}},function(error,docs){
				if(error){
					return error
				}
			})
			response.redirect("/#/confirm/submission")
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

var findEssays = function(request,response){
	if(request.params.username!=="returnAll"){
		var username = request.params.username
		Essay.find({username: username},function(error,docs){
			response.send(docs)
		})
	}
	else if(request.params.username==="returnAll"){
		Essay.find({},function(error,docs){
			response.send(docs)
		})
	}
}

module.exports = {
	findEssay    : findEssay,
	createEssay  : createEssay,
	findEssays   : findEssays,
}