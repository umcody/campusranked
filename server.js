const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Cors = require("cors");
const rank = require("./Route/rank.js")
const search = require("./Route/search.js")
const bodyParser = require("body-parser");
const authRoute = require("./Route/authRoute");
const passport = require("passport");
const passportAuth = require("./auth_config/passport.js");



app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(passport.initialize());



const port = process.env.PORT || 8000;

mongoose.connect("mongodb+srv://codyum:appalanchia@cluster0-tfxwi.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true })

passportAuth(app,mongoose);
search(app,mongoose);
authRoute(app,mongoose);
rank(app,mongoose);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


app.listen(port, () => {
    console.log("Listening on Port 8000");
})