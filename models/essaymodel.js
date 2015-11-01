var mongoose = require("mongoose")

var essaySchema = mongoose.Schema({
	username        : {type: String},
	title           : {type: String, default: "Untitled"},
	description     : {type: String},
	dateAdded       : {type: String},
	lastRevised     : {type: String},
	matureContent   : {type: Boolean},
	content         : {type: Array, required: true},
	type            : {type: String, required: true},
})

module.exports = mongoose.model("Essay",essaySchema)