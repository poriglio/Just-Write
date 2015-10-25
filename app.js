var bodyParser = require("body-parser")
var express = require("express")

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))

app.get("/",function(request,response){
	response.sendFile("/html/index.html",{root:"./public"})
})

var port = 3000

app.listen(port, function(){
	console.log("The server is listening on port " + port + "...")
})