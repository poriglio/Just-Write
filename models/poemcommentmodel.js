var mongoose = require("mongoose")

var poemCommentSchema = mongoose.Schema({
	date           : {type: Number},
	username       : {type: String},
	comment        : {type: String},
	submissionId   : {type: String},
})

module.exports = mongoose.model("poemComment",poemCommentSchema)