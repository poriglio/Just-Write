var bodyParser = require("body-parser")
var express = require("express")

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))

// -=-=-=-=-=-
// CONTROLLERS
// -=-=-=-=-=-

var userController = require("./controllers/usercontroller.js")
var storyController = require("./controllers/storycontroller.js")
var poemController = require("./controllers/poemcontroller.js")
var essayController = require("./controllers/essaycontroller.js")
var commentController = require("./controllers/commentcontroller.js")

app.get("/",function(request,response){
	response.sendFile("/html/index.html",{root:"./public"})
})

var port = 3000

app.listen(port, function(){
	console.log("The server is listening on port " + port + "...")
})