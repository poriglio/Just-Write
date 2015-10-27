var User = require("../models/usermodel.js")

var createUser = function(request,response){

	var newUser = new User({
		username        : request.body.username,
		password        : request.body.password,
		email           : request.body.email,
		age             : +request.body.age,
		birthday        : +request.body.birthday,
		bio             : request.body.bio,
		favBooks        : request.body.favBooks.split(", "),
		favWriters      : request.body.favWriters.split(", "),
		numSubmissions  : 0,
		numPoems        : 0,
		numStories      : 0,
		numEssays       : 0,
		badges          : [],
		poems           : [],
		stories         : [],
		essays          : [],
		admin           : false,
		private         : false,
	})

	newUser.save(function(error){
		if(!error){
			response.send("Thanks for registering! You can now share your writing!")
		}
		else{
			console.log("Error!",error)
		}
	})

}

var findUser = function(request,response){
	if(request.params.username){
		User.findOne({username : request.params.username},function(error,doc){
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