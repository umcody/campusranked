const { Schema,model } = require("mongoose");

// THIS FILE IS USED TO CREATE DOUCMENTS.. DO NOT MODIFY
module.exports = function (app, mongoose) {
    app.get("/api/create/:school/dininghall", function (req, res) {
        const school = req.params.school;

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
        const Item = mongoose.model("uwmadisoncampus",itemSchema);
        let diningHalls = ["Carson's Market", "Four Lakes Market", "Gordon Avenue Market", "Liz's Market", "Newell's Deli", "Rheta's Market"];

        let diningHallsModified = [];

        for (let i = 0; i < diningHalls.length; i++) {
            diningHallsModified[i] = diningHalls[i].toLowerCase().replace(/\s/g, "").replace(/'/g, "");
        }

        for (let i = 0; i < diningHalls.length; i++) {
            Item.create({
                rank: 1,
                image: `https://campusranked.s3.us-east-2.amazonaws.com/${school}/dininghall/${diningHallsModified[i]}.jpg`,
                name: diningHalls[i],
                category:"dininghall",
                title: "uwmadisondininghall",
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


    app.get("/api/create/:school/library", function (req, res) {
        const school = req.params.school;

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
        const Item = mongoose.model("uwmadisoncampus", itemSchema);
        let libraries = ["College Library", "Steenbock Library", "Ebling Library",
            "Business Library", "Social Work Library", "Woodman Astronomical Library",
            "Law Library", "Math Library", "Memorial Library", "AMP Library", "Art Library",
            "Mills Music Library", "Geology and Geophysics Library",
            "Arboretum Research Library"];

        let librariesModified = [];

        for (let i = 0; i < libraries.length; i++) {
            librariesModified[i] = libraries[i].toLowerCase().replace(/\s/g, "").replace(/'/g, "");
        }

        for (let i = 0; i < libraries.length; i++) {
            Item.create({
                rank: 1,
                image: `https://campusranked.s3.us-east-2.amazonaws.com/${school}/library/${librariesModified[i]}.jpg`,
                name: libraries[i],
                category: "library",
                reviews: [],
                title:"uwmadisonlibrary",
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

    app.get("/api/create/:school/gym", function (req, res) {
        const school = req.params.school;

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

        const Item = mongoose.model("uwmadisoncampus", itemSchema);
        let gyms = ["Natatorium", "Nicholas Recreation Center", "The Shell", "Nielsen Tennis Stadium"];

        let gymsModified = [];

        for (let i = 0; i < gyms.length; i++) {
            gymsModified[i] = gyms[i].toLowerCase().replace(/\s/g, "").replace(/'/g, "");
        }

        for (let i = 0; i < gyms.length; i++) {
            Item.create({
                rank: 1,
                image: `https://campusranked.s3.us-east-2.amazonaws.com/${school}/gym/${gymsModified[i]}.jpg`,
                name: gyms[i],
                title: "uwmadisongym",
                category:"gym",
                reviews: [],
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

    app.get("/api/create/:school/residentialhall", function (req, res) {
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

        const school = req.params.school;
        console.log("HEY?");
        const Item = mongoose.model("uwmadisoncampus", itemSchema);
        let residentialHalls = ["Adams", "Humphrey", "Sellery", "Barnard",
                                "Jorns", "Slichter", "Bradley", "Kronshage",
                                "Smith", "Chadbourne", "Leopold", "Sullivan",
                                "Cole", "Merit", "Tripp", "Davis",
                                "Ogg", "Waters", "Dejope", "Phillips",
                                "Witte"];

        let residentialHallsModified =[];

        for (let i = 0; i < residentialHalls.length; i++) {
            residentialHallsModified[i] = residentialHalls[i].toLowerCase().replace(/\s/g, "").replace(/'/g,"");
        }

        for (let i = 0; i < residentialHalls.length; i++) {
            Item.create({
                rank: 1,
                image: `https://campusranked.s3.us-east-2.amazonaws.com/${school}/residentialhall/${residentialHallsModified[i]}.jpg`,
                name: residentialHalls[i],
                category: "residentialhall",
                title: "uwmadisonresidentialhall",
                reviews: [],
                ratings: {
                    overall:0,
                    cleanliness:0,
                    location:0,
                    noise:0,
                    privacy:0,
                    bathroom:0
                },
                count: 0,
                reviewCounts:0,
                __v: 1
            },function(err,data){
                if(err){
                    console.log(err);
                }
                console.log(data);
            })
        }
    })

    app.get("/api/test/test",function(req,res){
        let testSchema = new Schema({
            test:Object
        },{strict:false})
        let testModel =  model("test",testSchema);
        console.log("HEYEHEY");
        testModel.findOne({"noway.what.whatever":"ddd"},function(err,data){
            if(err){
                console.log(err);
            }
            if(data){
                console.log(data);
            }else{
                console.log("NOPE");
            }
        })
    })
}