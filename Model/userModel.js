var mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    username:{type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    gender: {type:String},
    voted: [],
    resetPasswordToken: {type:String},
    resetPasswordExpiration: {type:Date}
},{strict: false});

module.exports = mongoose.model("User",userSchema);