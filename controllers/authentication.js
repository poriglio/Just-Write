// Refered to RefactorU passport demo code, week 7, for this file.

var passport = require("passport")

var User = require("../models/usermodel.js")

// This function will be used a couple times to abstract out the login procedure, during authentication or signup. It mirrors the middleware that calls it, so the parameter structure matches. We also need to know the user modle we want to log in.
var performLogin = function(request,response,next,user){
	// Passport injects functionality so that we can call request.login and pass in the user we want logged in.
	// If there is an error, allow execution to move to the next middleware. Otherwise, send the user to the homepage:
	request.login(user,function(error){
		if(error) return next(error)
		return response.redirect("/")
	})
}

var authenticationController = {
	login : function(request,response){
		response.sendFile("/html/public/login.html",{root:"./public"})
	},
	processLogin : function(request,response,next){
		var authFunction = passport.authenticate("local",function(error,user,info){
			if(error) return next(error)
			if(!user){
				return response.send({error:"Error logging in. Please try again."})
			}
			performLogin(request,response,next,user)
		})
		authFunction(request,response,next)
	},

	processSignup : function(request,response,next){
		var user = new User({
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
		user.save(function(error,user){
			if(error){
				if(error.code === 11000){
					return response.send({error : "This user already exists."})
				}
				else{
					return response.send({error: "An error occured, please try again!"})
				}
			}
			performLogin(request,response,next,user);
		})
	},

	logout : function(request,response){
		request.logout()
		response.redirect("/auth/login")
	}
}

module.exports = authenticationController