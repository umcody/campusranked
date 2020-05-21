var Search = require('./searchModel.js');

module.exports = function (app, mongoose) {

    let itemSchema = new mongoose.Schema({
        rank: Number,
        image: String,
        name: String,
        count: Number
    })


    app.get("/ranked/:item", (req, res) => {
        let item = req.params.item;
        const Item = new mongoose.model(item, itemSchema);
        Item.find({}).sort({ count: -1 }).exec(function (err, docs) {
            if (err) {
                return console.log(err);
            }
            res.json(docs);
        })
    });



    app.post("/ranked/:title/upvote/:item", function (req, res) {
        let title = req.params.title;
        console.log(req.params);
        let item = req.params.item;
        console.log(req);

        const Item = new mongoose.model(title, itemSchema);
        console.log("accessed");

        Item.findOneAndUpdate({ name: item }, { $inc: { count: 1 } }, function (err, data) {
            if (err) {
                return console.log(err);
            }
            console.log("UPDATED: " + data);
        });
    
        Search.findOneAndUpdate({ url: title }, { $inc: {totalCount: 1} }, function (err, data) {
            if (err) {
                return console.log(err);
            }
            console.log("UPDATED: " + data);
        });
    })

    app.post("/ranked/:title/downvote/:item", function (req, res) {
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
    
        Search.findOneAndUpdate({ url: title }, { $inc: {totalCount: -1} }, function (err, data) {
            if (err) {
                return console.log(err);
            }
            console.log("UPDATED: " + data);
        });
    })
}