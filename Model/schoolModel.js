var mongoose = require("mongoose");

let schoolSchema = new mongoose.Schema({
    name:{type:String, required:true},
    url:{type:String, required:true},
    fullName: {type:String, required: false},
    state: {type:String, required:true},
    public: {type:String, required:true},
    location:{
        latitude:Number,
        longitude:Number,
    }
},{strict: true});

module.exports = mongoose.model("School",schoolSchema);