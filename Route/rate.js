

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
            console.log(req.body.friendliness + req.body.space + req.body.overall);

            tempOverall = tempRatings[0][1] * data.reviewCounts;
            tempOverall = (tempOverall + parseFloat(req.body.overall) * 100) / (data.reviewCounts + 1);



            let tempSpace = tempRatings[1][1] * data.reviewCounts;
            tempSpace = (tempSpace + parseFloat(req.body.space) * 100) / (data.reviewCounts + 1);

            let tempFriendliness = tempRatings[2][1] * data.reviewCounts;
            tempFriendliness = (tempFriendliness + parseFloat(req.body.friendliness) * 100) / (data.reviewCounts + 1);


            let name = req.body.name;
            if (req.body.review === " " || req.body.review === "") { // If there is no review, empty the name too. 
                name = "";
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
            } else {
                if (req.body.name === "") {
                    name = "anonymous";
                }
                const review = req.body.review;
                const reviews = [[name, review]]
    
    
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
            }
           
        })
    })
    app.post("/api/rate/dininghall/:title/:item", function (req, res) {
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

            // Average calculations for each criterions
            
            let tempOverall = tempRatings[0][1] * data.reviewCounts;
            console.log(tempOverall);
            tempOverall = (tempOverall + parseFloat(req.body.overall) * 100) / (data.reviewCounts + 1);
            console.log(tempOverall);

            let tempTaste = tempRatings[1][1] * data.reviewCounts;
            tempTaste = (tempTaste + parseFloat(req.body.taste) * 100) / (data.reviewCounts + 1);

            let tempHygiene = tempRatings[2][1] * data.reviewCounts;
            tempHygiene = (tempHygiene + parseFloat(req.body.hygiene) * 100) / (data.reviewCounts + 1);

            let tempVariety = tempRatings[3][1] * data.reviewCounts;
            tempVariety = (tempVariety + parseFloat(req.body.variety) * 100) / (data.reviewCounts + 1);

            let tempNutrition = tempRatings[4][1] * data.reviewCounts;
            tempNutrition = (tempNutrition + parseFloat(req.body.nutrition) * 100) / (data.reviewCounts + 1);

            let tempPrice = tempRatings[5][1] * data.reviewCounts;
            tempPrice = (tempPrice + parseFloat(req.body.price) * 100) / (data.reviewCounts + 1);



            let name = req.body.name;
            if (req.body.review === ' ' || req.body.review === "") { // If there is no review, empty the name too.

                name = "";
                console.log("HEREEE");
                Item.findOneAndUpdate({ name: item }, {
                    "ratings.overall": tempOverall,
                    "ratings.taste": tempTaste,
                    "ratings.hygiene": tempHygiene,
                    "ratings.variety": tempVariety,
                    "ratings.nutrition": tempNutrition,
                    "ratings.price": tempPrice,
    
                    $inc: { reviewCounts: 1 },

                }, function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                })
            } else {
                console.log("HERE");
                console.log(req.body.name);
                if (req.body.name === "" || req.body.name === undefined) {
                    name = "Anonymous";
                }
                const review = req.body.review;
            const reviews = [[name, review]]


            Item.findOneAndUpdate({ name: item }, {
                "ratings.overall": tempOverall,
                "ratings.taste": tempTaste,
                "ratings.hygiene": tempHygiene,
                "ratings.variety": tempVariety,
                "ratings.nutrition": tempNutrition,
                "ratings.price": tempPrice,

                $inc: { reviewCounts: 1 },
                $push: {
                    reviews
                }
            }, function (err, data) {
                if (err) {
                    console.log(err);
                }
            })
            }
            
        })
    })
    app.post("/api/rate/library/:title/:item", function (req, res) {
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

            // Average calculations for each criterions

            let tempOverall = tempRatings[0][1] * data.reviewCounts;
            tempOverall = (tempOverall + parseFloat(req.body.overall) * 100) / (data.reviewCounts + 1);

            let tempNoise = tempRatings[1][1] * data.reviewCounts;
            tempNoise = (tempNoise + parseFloat(req.body.noise) * 100) / (data.reviewCounts + 1);

            let tempSpace = tempRatings[2][1] * data.reviewCounts;
            tempSpace = (tempSpace + parseFloat(req.body.space) * 100) / (data.reviewCounts + 1);

            let tempAccessibility = tempRatings[3][1] * data.reviewCounts;
            tempAccessibility = (tempAccessibility + parseFloat(req.body.accessibility) * 100) / (data.reviewCounts + 1);

            let tempResource = tempRatings[4][1] * data.reviewCounts;
            tempResource = (tempResource + parseFloat(req.body.resource) * 100) / (data.reviewCounts + 1);


            let name = req.body.name;
            if (req.body.review === ' '  || req.body.review === "") { // If there is no review, empty the name too. 
                name = "";
                Item.findOneAndUpdate({ name: item }, {
                    "ratings.overall": tempOverall,
                    "ratings.noise": tempNoise,
                    "ratings.space": tempSpace,
                    "ratings.accessibility": tempAccessibility,
                    "ratings.resource": tempResource,

                    $inc: { reviewCounts: 1 },
                    
                }, function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                })
                
            } else {
                console.log("HERE");
                console.log(req.body.name);
                if (req.body.name === "" || req.body.name === undefined) {
                    name = "Anonymous";
                }
                const review = req.body.review;
                const reviews = [[name, review]]
    
    
                Item.findOneAndUpdate({ name: item }, {
                    "ratings.overall": tempOverall,
                    "ratings.noise": tempNoise,
                    "ratings.space": tempSpace,
                    "ratings.accessibility": tempAccessibility,
                    "ratings.resource": tempResource,
    
                    $inc: { reviewCounts: 1 },
                    $push: {
                        reviews
                    }
                }, function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                })
            }
           
        })
    })
}