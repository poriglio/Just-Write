var bodyParser = require("body-parser")
var express = require("express")

var app = express()

var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/storyscouts")


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))

// -=-=-=-=-=-
// CONTROLLERS
// -=-=-=-=-=-

// var userController = require("./controllers/usercontroller.js")
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

// -=-=-=-=-=-=-=
// PRIVATE ROUTES
// -=-=-=-=-=-=-=

app.get("/story/:submissionID", storyController.getStory)

app.get("/poem/:submissionID", poemController.getPoem)

app.get("/essay/:submissionID", essayController.getEssay)

app.post("/api/comment",function(request,response){
	commentController.createComment(request,response)
	response.send("Thank you for your comment!")
})

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
	// response.send("Thanks for your submission!")
})

var port = 3000

app.listen(port, function(){
	console.log("The server is listening on port " + port + "...")
})