var mongoose = require("mongoose")

var essaySchema = mongoose.Schema({
	username        : {type: String},
	title           : {type: String},
	description     : {type: String},
	dateAdded       : {type: String},
	lastRevised     : {type: String},
	comments        : {type: Array},
	matureContent   : {type: Boolean},
	content         : {type: String},
})

module.exports = mongoose.model("Essay",essaySchema)