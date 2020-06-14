// THIS FILE IS USED TO CREATE DOUCMENTS.. DO NOT MODIFY
module.exports = function (app, mongoose) {
    app.get("/api/create/dininghall", function (req, res) {

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
        const Item = mongoose.model("uwmadisondininghall", itemSchema);
        let diningHalls = ["Carson's Market", "Four Lakes Market", "Gordon Avenue Market", "Liz's Market", "Newell's Deli", "Rheta's Market"];

        let diningHallsModified = [];

        for (let i = 0; i < diningHalls.length; i++) {
            diningHallsModified[i] = diningHalls[i].toLowerCase().replace(/\s/g, "").replace(/'/g, "");
        }

        for (let i = 0; i < diningHalls.length; i++) {
            Item.create({
                rank: 1,
                image: "../asset/" + diningHallsModified[i] + ".jpg",
                name: diningHalls[i],
                category: "uwmadisondininghall",
                reviews: [],
                ratings: {
                    overall: 0,
                    taste: 0,
                    hygiene: 0,
                    variety: 0,
                    nutrition: 0,
                    price: 0
                },
                count: 0,
                reviewCounts: 0,
                __v: 1
            }, function (err, data) {
                if (err) {
                    console.log(err);
                }
                console.log(data);
            })
        }
    })



    app.get("/api/create/library", function (req, res) {

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
        const Item = mongoose.model("uwmadisonlibrary", itemSchema);
        let diningHalls = ["College Library", "Steenbock Library", "Ebling Library",
            "Business Library", "Social Work Library", "Woodman Astronomical Library",
            "Law Library", "Math Library", "Memorial Library", "AMP Library", "Art Library",
            "Mills Music Library", "Geology and Geophysics Library",
            "Arboretum Research Library"];

        let diningHallsModified = [];

        for (let i = 0; i < diningHalls.length; i++) {
            diningHallsModified[i] = diningHalls[i].toLowerCase().replace(/\s/g, "").replace(/'/g, "");
        }

        for (let i = 0; i < diningHalls.length; i++) {
            Item.create({
                rank: 1,
                image: "../asset/" + diningHallsModified[i] + ".jpg",
                name: diningHalls[i],
                category: "uwmadisonlibrary",
                reviews: [],
                ratings: {
                    overall: 0,
                    noise: 0,
                    space: 0,
                    accessibility: 0,
                    resource: 0,
                },
                count: 0,
                reviewCounts: 0,
                __v: 1
            }, function (err, data) {
                if (err) {
                    console.log(err);
                }
                console.log(data);
            })
        }
    })

    app.get("/api/create/gym", function (req, res) {

        let itemSchema = new mongoose.Schema({
            rank: Number,
            image: String,
            name: String,
            title: String,
            count: Number,
            category: String,
            ratings: Object,
            reviewCounts: Number,
            reviews: Array,
            tags:Object
        })

        const Item = mongoose.model("uwmadisongym", itemSchema);
        let gyms = ["Natatorium", "Nicholas Recreation Center", "The Shell", "Nielsen Tennis Stadium"];

        let gymsModified = [];

        for (let i = 0; i < gyms.length; i++) {
            gymsModified[i] = gyms[i].toLowerCase().replace(/\s/g, "").replace(/'/g, "");
        }

        for (let i = 0; i < gyms.length; i++) {
            Item.create({
                rank: 1,
                image: "https://campusranked.s3.us-east-2.amazonaws.com/uwmadison/gym/"+gymsModified[i]+".jpg",
                name: gyms[i],
                title: "uwmadisongym",
                category:"gym",
                reviews: {},
                ratings: {
                    overall: 0,
                    space: 0,
                    equipment: 0,
                    cleanliness: 0,
                    community: 0
                },
                count: 0,
                reviewCounts: 0,
                __v: 1
            }, function (err, data) {
                if (err) {
                    console.log(err);
                }
                console.log(data);
            })
        }
    })
}