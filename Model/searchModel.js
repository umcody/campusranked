var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(schoolName){
    let searchSchema = new mongoose.Schema({
        url:String,
        name:String,
        totalCount: Number,
        category: String
    })
    return mongoose.model(schoolName, searchSchema); 
}

