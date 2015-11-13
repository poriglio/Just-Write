var mongoose = require("mongoose")

var storySchema = mongoose.Schema({
	username        : {type: String},
	title           : {type: String, default: "Untitled"},
	description     : {type: String},
	lastRevised     : {type: String},
	matureContent   : {type: Boolean},
	content         : {type: Array, required: true},
	type            : {type: String, required: true},
	dateAdded       : {type: Number},
	numComments     : {type: Number, default: 0},
})

module.exports = mongoose.model("Story",storySchema)