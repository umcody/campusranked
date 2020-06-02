

module.exports = function (app, mongoose) {
    let itemSchema = new mongoose.Schema({
        rank: Number,
        image: String,
        name: String,
        title: String,
        count: Number,
        category: String,
        ratings: Object,
        reviewCounts: Number,
        reviews: Array
    })

    app.post("/api/rate/gym/:title/:item", function (req, res) {
        const title = req.params.title;
        const item = req.params.item;

        let Item
        try {
            Item = mongoose.model(title);
        } catch (error) {
            Item = mongoose.model(title, itemSchema);
        }

        console.log(req.body);


        Item.findOne({ name: item }, function (err, data) {
            console.log(data);
            const tempRatings = Object.entries(data.ratings);
            console.log(tempRatings);
            let tempOverall = 0;

            tempOverall = tempRatings[0][1] * data.reviewCounts;
            tempOverall = (tempOverall + parseInt(req.body.overall) * 100) / (data.reviewCounts + 1);



            let tempSpace = tempRatings[1][1] * data.reviewCounts;
            tempSpace = (tempSpace + parseInt(req.body.space) * 100) / (data.reviewCounts + 1);

            let tempFriendliness = tempRatings[2][1] * data.reviewCounts;
            tempFriendliness = (tempFriendliness + parseInt(req.body.friendliness) * 100) / (data.reviewCounts + 1);

            let name = "";

            if (req.body.name === "") {
                name = "anonymous";
            } 
                name = req.body.name;
                const review = req.body.review;
                const reviews = [[name,review]]
            

            Item.findOneAndUpdate({ name: item }, {
                "ratings.Overall": tempOverall,
                "ratings.Space": tempSpace,
                "ratings.Friendliness": tempFriendliness,
                $inc: { reviewCounts: 1 },
                $push: {
                    reviews
                }
            }, function (err, data) {
                if (err) {
                    console.log(err);
                }
            })
        })
    })
}