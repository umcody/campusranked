const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const rank = require("./rank.js")
const search = require("./search.js")
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.PORT || 8000;

mongoose.connect("mongodb+srv://codyum:appalanchia@cluster0-tfxwi.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true })


rank(app,mongoose);
search(app,mongoose);

app.listen(port, () => {
    console.log("Listening on Port 8000");
})