var mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    username:{type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    gender: {type:String}
})

module.exports = mongoose.model("User",userSchema);