var passport = require("passport")

var User = require("../models/usermodel.js")

var performLogin = function(request,response,next,user){
	request.login(user,function(error){
		if(error) return next(error)
		return response.redirect("/")
	})
}

var processLogin = function(request,response,next){
	var authFunction = passport.authenticate("local",function(error,user,info){
		if(error) return next(error)
		if(!user){
			return response.send({error:"Error logging in. Please try again!"})
		}
		performLogin(request,response,next,user)
	})
	authFunction(request,response,next)
}

// For now, usercontroller.js is handling registration, but you can set up this route here if necessary. See the week 7 passport demo on github for help.
var processSignup = function(){

}

var logout = function(request,response){
	request.logout()
	response.redirect("/")
}

module.exports = {
	processLogin  : processLogin,
	processSignup : processSignup,
	logout        : logout, 
}