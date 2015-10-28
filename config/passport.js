var passport = require("passport")

var LocalStrategy = require("passport-local").Strategy

var User = require("../models/usermodel.js")

passport.serializeUser(function(user,done){
	done(null,user.id)
})

passport.deserializeUser(function(id,done){
	User.findById(id,function(error,user){
		done(error,user)
	})
})

var localStrategy = new LocalStrategy(function(username,password,done){
	User.findOne({username: username},function(error,user){
		if(error) return done(error)
		if(!user) return done(null,false)
		user.comparePassword(password,function(error,isMatch){
			if(error) return done(error)
			if(isMatch){
				return done(error,user)
			}
			else{
				return done(null,false)
			}
		})
	})
})

passport.use(localStrategy)

var ensureAuthenticated = function(request,response,next){
	if(request.isAuthenticated()){
		return next()
	}
	response.redirect("/")
}

module.exports = {
	ensureAuthenticated : ensureAuthenticated
}