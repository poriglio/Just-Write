var mongoose = require("mongoose")
var bcrypt = require("bcryptjs")

var userSchema = mongoose.Schema({
	username        : {type:String, unique:true, required:true},
	usernameLower   : {type:String},
	password        : {type:String, required:true},
	email           : {type:String, required:true, unique:true},
	age             : {type:Number, required:true},
	birthday        : {type:String, required:true},
	bio             : {type:String},
	favBooks        : {type:Array},
	favWriters      : {type:Array},
	numSubmissions  : {type:Number, default:0},
	numPoems        : {type:Number, default:0},
	numStories      : {type:Number, default:0},
	numEssays       : {type:Number, default:0},
	numComments     : {type:Number, default:0},
	badges          : {type:Array, default:[]},
	admin           : {type:Boolean, default: false},
	private         : {type:Boolean, default: false},
	dateJoined      : {type:Number},
})

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// THE CODE BELOW ENCRYPTS A PASSWORD:
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

userSchema.pre("save",function(next){
	if(!this.isModified("password")) return next()
	var user = this
	bcrypt.genSalt(10,function(error,salt){
		if(error) return next(error)
		bcrypt.hash(user.password,salt,function(error,hash){
			if(error) return next(error)
			user.password = hash
			return next()
		})
	})
})
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// THE CODE BELOW ENCRYPTS THE PASSWORD ENTERED AT LOGIN AND COMPARES IT TO THE STORED ENCRYPTION:
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
userSchema.methods.comparePassword = function(candidatePassword,next){
	bcrypt.compare(candidatePassword,this.password,function(error,isMatch){
		if(error) return next(error)
		return next(null, isMatch)
	})
}

var User = mongoose.model("User",userSchema)
module.exports = User