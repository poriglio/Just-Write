var mongoose = require("mongoose")

var commentSchema = mongoose.Schema({
	date           : {type: Number},
	username       : {type: String},
	comment        : {type: String},
	submissionId   : {type: String},
})

module.exports = mongoose.model("Comment",commentSchema)