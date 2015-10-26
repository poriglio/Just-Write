var mongoose = require("mongoose")

var storySchema = mongoose.Schema({
	username        : {type: String},
	title           : {type: String},
	description     : {type: String},
	dateAdded       : {type: String},
	lastRevised     : {type: String},
	comments        : {type: Array},
	matureContent   : {type: Boolean},
})

module.exports = mongoose.Schema({"Story",storySchema})