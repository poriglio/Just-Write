var bodyParser = require("body-parser")
var express = require("express")

var app = express()

var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/storyscouts")

// -=-=-=-=-=-=-=-=-=-=-=
// AUTHORIZATION REQUIRES
// -=-=-=-=-=-=-=-=-=-=-=

// var session = require("express-session")
// var passport = require("passport")

// // This loads in our passport configuration that decides how passport actually runs and authenticates.
// var passportConfig = require("./config/passport")

// // -=-=-=-=-=-=-
// // Session Setup
// // -=-=-=-=-=-=-
// app.use(session({
// 	secret            : "wordonfire",
// 	resave            : false,
// 	saveUninitialized : true
// }))

// // Hook passport and passport sessions into the middleware chain...
// app.use(passport.initialize())
// app.use(passport.session())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))

// -=-=-=-=-=-
// CONTROLLERS
// -=-=-=-=-=-

var userController = require("./controllers/usercontroller.js")
var poemController = require("./controllers/poemcontroller.js")
var storyController = require("./controllers/storycontroller.js")
var essayController = require("./controllers/essaycontroller.js")
var commentController = require("./controllers/commentcontroller.js")

// -=-=-=-=-=-=-
// PUBLIC ROUTES
// -=-=-=-=-=-=-

app.get("/",function(request,response){
	response.sendFile("/html/index.html",{root:"./public"})
})

app.post("/auth/signup",function(request,response){
	userController.createUser(request,response)
})

// -=-=-=-=-=-=-=-=-=-=-
// AUTHENTICATION ROUTES
// -=-=-=-=-=-=-=-=-=-=-

// var authenticationController = require("./controllers/authentication")

// Our request for viewing the login page...
// (I don't think I need this part, because the login is always visible at the top, but I'm putting it here just in case...)

// app.get("/auth/login",authenticationController.login)

// Post received from submitting the login form...
// app.post("/auth/login",authenticationController.processLogin)

// // Post received from submitting the signup form...
// // Note that you have a similar one above and may need to switch it around.
// app.post("/auth/signup",authenticationController.processSignup)

// // This route handles requests to log out...
// app.get("/auth/logout",authenticationController.logout)

// // This route will send back the logged in user (or undefined user if they are not logged in)

// app.get("/api/me",function(request,response){
// 	response.send(request.user)
// })

// // Now, we have prevented access to any route handler defined after this call. Magical!
// app.use(passportConfig.ensureAuthenticated)

// -=-=-=-=-=-=-=-=-=-=-=-=-
// END AUTHENTICATION ROUTES
// -=-=-=-=-=-=-=-=-=-=-=-=-

// -=-=-=-=-=-=-=
// PRIVATE ROUTES
// -=-=-=-=-=-=-=

// app.get("/story/:submissionID", storyController.getStory)

// app.get("/poem/:submissionID", poemController.getPoem)

// app.get("/essay/:submissionID", essayController.getEssay)

// app.post("/api/comment",function(request,response){
// 	commentController.createComment(request,response)
// 	response.send("Thank you for your comment!")
// })

// -=-=-=-=-=-=-=-=-=-=
// PARAMETERIZED ROUTES
// -=-=-=-=-=-=-=-=-=-=

app.get("/#/profile/:username",function(request,response){
	response.sendFile("/html/private/profile.html",{root:"./public"})
})

app.get("/#/stories/:submission",function(request,response){
	response.sendFile("/html/private/submission.html",{root:"./public"})
})

app.get("/#/poems/:submission",function(request,response){
	response.sendFile("/html/private/submission.html",{root:"./public"})
})

app.get("/#/essays/:submission",function(request,response){
	response.sendFile("/html/private/submission.html",{root:"./public"})
})

// -=-=-=-=-=
// API ROUTES
// -=-=-=-=-=


app.get("/api/story/:submission",storyController.findStory)

app.get("/api/poem/:submission",poemController.findPoem)

app.get("/api/essay/:submission",essayController.findEssay)

app.get("/api/users/:username",userController.findUser)

app.get("/api/stories/:username",storyController.findStories)

app.get("/api/essays/:username",essayController.findEssays)

app.get("/api/poems/:username",poemController.findPoems)

app.post("/api/submission",function(request,response){
	if(request.body.submissionType==="story"){
		storyController.createStory(request,response)
	}
	else if(request.body.submissionType==="poem"){
		poemController.createPoem(request,response)
	}
	else{
		essayController.createEssay(request,response)
	}
})

var port = 3000

app.listen(port, function(){
	console.log("The server is listening on port " + port + "...")
})