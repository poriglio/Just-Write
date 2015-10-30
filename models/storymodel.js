var mongoose = require("mongoose")

var storySchema = mongoose.Schema({
	username        : {type: String},
	title           : {type: String},
	description     : {type: String},
	dateAdded       : {type: String},
	lastRevised     : {type: String},
	matureContent   : {type: Boolean},
	content         : {type: Array},
	type            : {type: String},
})

module.exports = mongoose.model("Story",storySchema)