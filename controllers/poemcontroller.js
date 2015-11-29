var Poem = require("../models/poemmodel.js")
var User = require("../models/usermodel.js")

var createPoem = function(request,response){

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

	var newPoem = new Poem({
		username        : request.user.username,
		title           : title,
		description     : request.body.description,
		lastRevised     : "not yet revised",
		matureContent   : request.body.mature,
		content         : request.body.content.split("[p]"),
		type            : "poem",
		dateAdded       : n,
		numComments     : +0,
	})

	newPoem.save(function(error){
		if(!error){
			User.update({username: username},{$inc:{numPoems : 1}},function(error,docs){
				if(error){
					return error
				}
			})
			User.update({username: username},{$inc:{numSubmissions : 1}},function(error,docs){
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

var editPoem = function(request,response){
	Poem.update({_id: request.body[0]._id},{$set:{title:request.body[0].title,content:request.body[0].content.split("[p]"),description:request.body[0].description}},function(error){
	})
}

var deletePoem = function(request,response){
	Poem.remove({_id: request.body._id},function(error,docs){
		if(!error){
			User.update({username: request.body.username},{$inc:{numPoems : -1}},function(error,docs){
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
	findPoem    : findPoem,
	createPoem  : createPoem,
	findPoems   : findPoems,
	editPoem    : editPoem,
	deletePoem  : deletePoem,
}