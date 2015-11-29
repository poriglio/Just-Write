var Essay = require("../models/essaymodel.js")
var User = require("../models/usermodel.js")

var createEssay = function(request,response){

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

	var newEssay = new Essay({
		username        : request.user.username,
		title           : title,
		description     : request.body.description,
		lastRevised     : "not yet revised",
		matureContent   : request.body.mature,
		content         : request.body.content.split("[p]"),
		type            : "essay",
		dateAdded       : n,
		numComments     : +0,
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

var editEssay = function(request,response){
	Essay.update({_id: request.body[0]._id},{$set:{title:request.body[0].title,content:request.body[0].content.split("[p]"),description:request.body[0].description}},function(error){
	})
}

var deleteEssay = function(request,response){
	Essay.remove({_id: request.body._id},function(error,docs){
		if(!error){
			User.update({username: request.body.username},{$inc:{numEssays : -1}},function(error,docs){
				if(error){
					return error
				}
			})
			User.update({username: request.body.username},{$inc:{numSubmissions : -1}},function(error,docs){
				if(error){
					return error
				}
			})
		}		
	})
}

module.exports = {
	findEssay    : findEssay,
	createEssay  : createEssay,
	findEssays   : findEssays,
	editEssay    : editEssay,
	deleteEssay  : deleteEssay,
}