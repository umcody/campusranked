var Search = require('../Model/searchModel.js');
const passport = require("passport");
const jwt = require("jsonwebtoken");
var UserModel = require("../Model/userModel");
const VOTELIMIT = 3;
let shouldInc = false;

module.exports = function (app, mongoose) {

    let itemSchema = new mongoose.Schema({
        rank: Number,
        image: String,
        name: String,
        category: String,
        count: Number
    })


    //Get information of the items in the appropriate title
    app.get("/api/ranked/:title", (req, res) => {
        let title = req.params.title;
        const Item = new mongoose.model(title, itemSchema);
        Item.find({}).sort({ count: -1 }).exec(function (err, docs) {
            if (err) {
                return console.log(err);
            }
            res.json(docs);
        })
    });


    // API call when the user votes up for the selected item. 
    app.get("/ranked/api/:title/upvote/:item", function (req, res) {

        let title = req.params.title;
        let item = req.params.item;

        console.log("LOOKING FOR IT");


        // Check How many votes the user has already used in the selected title. If none, create. If limit, do not allow voting
        passport.authenticate("jwt", { session: false }, function (err, user) {
            if (err) {
                console.log(err);
            } else {
                UserModel.findOne({ email: user.email, "voted.title": title }, function (err, data) {
                    console.log(data);
                    if (err) {
                        return console.log(err);
                    } else {
                        if (data === null) { // IF user has not voted on the title
                            UserModel.findOneAndUpdate({ email: user.email }, {
                                $push:
                                {
                                    voted: {
                                        title: title,
                                        count: 1,
                                        lastVoted: new Date()
                                    }
                                }
                            }, function (err, data) {
                                if (err) {
                                    return console.log(err);
                                }
                                console.log("User has not voted on this title yet. Created a new title");
                            })
                            shouldInc = true;
                            res.json({ count: 1 });
                        } else { // If user has already voted on the title
                            let i = 0;
                            for (i; i < data.voted.length; i++) { // search for the index where the title resides
                                if (data.voted[i].title === title) {
                                    break;
                                }
                            }
                            if (data.voted[i].count < VOTELIMIT) {
                                console.log("IT IS HERE");
                                UserModel.findOneAndUpdate({ email: data.email, "voted.title": title }, {
                                    $inc: { "voted.$.count": 1 }
                                }, function (err, doc) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    console.log("Count successfully incremented");
                                    shouldInc = true; // set to True to update all the doc.
                                    res.send({ count: data.voted[i].count++, increment: true});
                                })
                            } else res.send({ count: data.voted[i].count, increment: false});
                        }

                    }
                })
            }
        })(req, res);

        if (shouldInc == true) { // IF shouldInc is true, update the documents.

            const Item = new mongoose.model(title, itemSchema);
            console.log("accessed");

            //Update the item votes
            Item.findOneAndUpdate({ name: item }, { $inc: { count: 1 } }, function (err, data) {
                if (err) {
                    return console.log(err);
                }
                console.log("UPDATED: " + data);
            });

            Search.findOneAndUpdate({ url: title }, { $inc: { totalCount: 1 } }, function (err, data) {
                if (err) {
                    return console.log(err);
                }
                console.log("UPDATED: " + data);
            });
            shouldInc = false;
        }
    })

    // TO BE DEVELOPED. DOWN VOTE SYSTEM.
    app.post("/ranked/api/:title/downvote/:item", function (req, res) {
        let title = req.params.title;
        console.log(req.params);
        let item = req.params.item;
        console.log(req);

        const Item = new mongoose.model(title, itemSchema);
        console.log("accessed");

        Item.findOneAndUpdate({ name: item }, { $inc: { count: -1 } }, function (err, data) {
            if (err) {
                return console.log(err);
            }
            console.log("UPDATED: " + data);
        });

        Search.findOneAndUpdate({ url: title }, { $inc: { totalCount: -1 } }, function (err, data) {
            if (err) {
                return console.log(err);
            }
            console.log("UPDATED: " + data);
        });
    })
}