const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Cors = require("cors");
const rank = require("./Route/rank.js")
const search = require("./Route/search.js")
const bodyParser = require("body-parser");
const authRoute = require("./Auth/authRoute");
const passport = require("passport");
const passportAuth = require("./auth_config/passport.js");
const reviewPage = require("./Route/itemPage");
const rate = require("./Route/rate");
const temp = require("./Route/tempCreate");

app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(passport.initialize());



const port = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://codyum:appalanchia@cluster0-tfxwi.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true })

passportAuth(app,mongoose);
search(app,mongoose);
authRoute(app,mongoose);
rank(app,mongoose);
reviewPage(app,mongoose);
rate(app,mongoose);
temp(app,mongoose);


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
}



app.listen(port, () => {
    console.log("Listening on Port"+port);
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
})