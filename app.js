var bodyParser = require("body-parser")
var express = require("express")

var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/storyscouts")

var session = require("express-session")
var passport = require("passport")

var passportConfig = require("./config/passport.js")

var app = express()

app.use(session({
	secret            : "campfirestories",
	resave            : true,
	saveUninitialized : true
}))

app.use(passport.initialize())

app.use(passport.session())

app.use(express.static(__dirname + "/public"))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

var authenticationController = require("./controllers/authentication.js")

app.get("/",function(request,response){
	response.sendFile("/html/index.html",{root:"./public"})
})

app.post("/auth/signup",function(request,response){
	userController.createUser(request,response)
})

app.post("/auth/login",authenticationController.processLogin)


var userController = require("./controllers/usercontroller.js")
var poemController = require("./controllers/poemcontroller.js")
var storyController = require("./controllers/storycontroller.js")
var essayController = require("./controllers/essaycontroller.js")
var commentController = require("./controllers/commentcontroller.js")


// -=-=-=-=-=-=-=-=-=-=
// LOGGED OUT ROUTES
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


// -=-=-=-=-=-=-=-=-=-=-=-
// API ROUTES - logged out
// -=-=-=-=-=-=-=-=-=-=-=-

app.get("/api/story/:submission",storyController.findStory)

app.get("/api/poem/:submission",poemController.findPoem)

app.get("/api/essay/:submission",essayController.findEssay)

app.get("/api/users/:username",userController.findUser)

app.get("/api/stories/:username",storyController.findStories)

app.get("/api/essays/:username",essayController.findEssays)

app.get("/api/poems/:username",poemController.findPoems)

app.get("/api/comments/:type/:submissionID",function(request,response){
	commentController.getComments(request,response)
})

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// BELOW THIS, MUST BE AUTHENTICATED!
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

app.use(passportConfig.ensureAuthenticated)

app.get("/auth/logout",authenticationController.logout)

app.get("/api/me",function(request,response){
	response.send(request.user)
})

// -=-=-=-=-=-=-=-=-=-=-=
// API ROUTES - logged in
// -=-=-=-=-=-=-=-=-=-=-=

app.post("/api/profile",userController.editUser)

app.post("/api/story",storyController.editStory)

app.post("/api/poem",poemController.editPoem)

app.post("/api/essay",essayController.editEssay)

app.post("/api/story/delete",storyController.deleteStory)

app.post("/api/poem/delete",poemController.deletePoem)

app.post("/api/essay/delete",essayController.deleteEssay)

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

app.post("/api/comment",function(request,response){
	commentController.createComment(request,response)
})

var port = 80

app.listen(port, function(){
	console.log("The server is listening on port " + port + "...")
})
