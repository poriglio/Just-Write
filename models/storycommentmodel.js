var mongoose = require("mongoose")

var storyCommentSchema = mongoose.Schema({
	date           : {type: Number},
	username       : {type: String},
	comment        : {type: String},
	submissionId   : {type: String},
})

module.exports = mongoose.model("storyComment",storyCommentSchema)