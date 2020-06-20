var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(schoolName){
    let searchSchema = new mongoose.Schema({
        url:String,
        name:String,
        totalCount: Number,
        category: String
    });

    let tempModel;

    try {
        tempModel = mongoose.model(schoolName);
    }catch{
        tempModel = new mongoose.model(schoolName, searchSchema);
    }

    return tempModel;
}

