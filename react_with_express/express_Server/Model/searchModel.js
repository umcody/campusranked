var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let searchSchema = new mongoose.Schema({
    url:String,
    name:String,
    totalCount: Number
})

module.exports = mongoose.model('items', searchSchema); 