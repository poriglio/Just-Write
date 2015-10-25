var mongoose = require("mongoose")
var bcrypt = require("bcryptjs")

var userSchema = mongoose.Schema({
	username        : {type:String, unique:true, required:true},
	password        : {type:String, required:true},
	email           : {type:String, required:true, unique:true},
	age             : {type:Number, required:true},
	birthday        : {type:Number, required:true},
	bio             : {type:String},
	favBooks        : {type:Array},
	favWriters      : {type:Array},
	numSubmissions  : {type:Number, default:0},
	numPoems        : {type:Number, default:0},
	numStories      : {type:Number, default:0},
	numEssays       : {type:Number, default:0},
	badges          : {type:Array, default:[]},
	poems           : {type:Array, default:[]},
	stories         : {type:Array, default:[]},
	essays          : {type:Array, default:[]},
	admin           : {type:Boolean, default: false},
	private         : {type:Boolean, default: false},
})

module.exports = mongoose.model("User", userSchema)