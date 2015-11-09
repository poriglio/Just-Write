var passport = require("passport")

var User = require("../models/usermodel.js")

var performLogin = function(request,response,next,user){
	request.login(user,function(error){
		if(error) return next(error)
		return response.redirect("/#/profile")
	})
}

var processLogin = function(request,response,next){
	var authFunction = passport.authenticate("local",function(error,user,info){
		if(error) return next(error)
		if(!user){
			return response.redirect("/#/loginerror")
		}
		performLogin(request,response,next,user)
	})
	authFunction(request,response,next)
}

var logout = function(request,response){
	request.logout()
	response.redirect("/")
}

module.exports = {
	processLogin  : processLogin,
	logout        : logout, 
}