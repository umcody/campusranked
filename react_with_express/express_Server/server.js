const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
const port = process.env.PORT || 8000;

mongoose.connect("mongodb+srv://codyum:appalanchia@cluster0-tfxwi.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true })

let itemSchema = new mongoose.Schema({
    rank: Number,
    image: String,
    name: String,
    count: Number
})


app.get("/ranked/:item", (req, res) => {
    let item = req.params.item;
    const Item = new mongoose.model(item, itemSchema);
    Item.find({}).sort({count:-1}).exec(function(err,docs){
        if(err){
            return console.log(err);
        }
        res.json(docs);
    })
});

app.post("/ranked/:item/upvote/:player",function(req,res){
    let item = req.params.item.toString;
    const Item = new mongoose.model(item, itemSchema);
    let player = req.params.player;
    console.log("accessed");
    Item.findOneAndUpdate({name:player}, {$inc: {count:1}},function(err,data){
        if(err){
            return console.log(err);
        }
        console.log("UPDATED: "+data);
    });
})
app.post("/ranked/:item/downvote/:player",function(req,res){
    let item = req.params.item;
    const Item = new mongoose.model(item, itemSchema);

    let player = req.params.player;
    console.log("accessed");
    Item.findOneAndUpdate({name:player}, {$inc: {count:-1}},function(err,data){
        if(err){
            return console.log(err);
        }
        console.log("UPDATED: "+data);
    });
})

app.listen(port, () => {
    console.log("Listening on Port 8000");
})