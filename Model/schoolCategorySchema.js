var mongoose = require("mongoose");

let schoolCategoryModel = new mongoose.Schema({
    url:{type:String, required:true},
    title: {type:String, required: false},
    totalCount: Number,
    category: String
},{strict: false});

module.exports = schoolCategoryModel;