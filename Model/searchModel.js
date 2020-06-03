var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let searchSchema = new mongoose.Schema({
    url:String,
    name:String,
    totalCount: Number,
    category: String
})

module.exports = mongoose.model('items', searchSchema); 