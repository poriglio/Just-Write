var User = require("../models/usermodel.js")

var createUser = function(request,response){

	var d = new Date();
	var n = d.getTime();

	var newUser = new User({
		username        : request.body.username,
		usernameLower   : request.body.username.toLowerCase(),
		password        : request.body.password,
		email           : request.body.email,
		age             : +request.body.age,
		birthday        : request.body.birthday,
		bio             : request.body.bio,
		favBooks        : request.body.favBooks.split(", "),
		favWriters      : request.body.favWriters.split(", "),
		numSubmissions  : 0,
		numPoems        : 0,
		numStories      : 0,
		numEssays       : 0,
		numComments     : 0,
		badges          : [],
		admin           : false,
		private         : false,
		dateJoined      : n,
	})

	newUser.save(function(error){
		if(!error){
			response.redirect("/#/confirm/registration")
		}
		else{
			console.log("Error!",error)
		}
	})
}

var findUser = function(request,response){
	if(request.params.username !== "returnAll"){
		var name = request.params.username.toLowerCase()
		User.findOne({usernameLower : name},function(error,doc){
			response.send(doc)
		})
	}
	else if(request.params.username === "returnAll"){
		User.find({},function(error,doc){
			response.send(doc)
		})
	}
	else{
		response.send("error")
	}
	
}

module.exports = {
	createUser  : createUser,
	findUser    : findUser,
}