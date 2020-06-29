const categoryData = require("./categoryData.json");
const schoolModel = require("../../Model/schoolModel.js");
const searchModel = require("../../Model/searchModel.js");
const search = require("../search");

module.exports = function (app, mongoose) {
    app.post("/api/admin/newSchool", function (req, res) {

        console.log(req.body);
        const school = req.body.schoolName;
        const schoolLowered = school.toLowerCase().replace(/\s/g, "").replace(/'/g, "");

        //create school in school (collective) document
        schoolModel.create({
            name:school,
            url:schoolLowered,
            fullName: req.body.schoolFullName,
            state: req.body.state,
            public: req.body.public,
            location: {
                latitude:req.body.latitude,
                longitude:req.body.longitude
            }
        })

        let category = {};

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
            tags: Object
        })

        let Item;
        try{
            Item = mongoose.model(schoolLowered+"campus");
        }catch{
            Item = new mongoose.model(schoolLowered+"campus", itemSchema);
        }
        category["Dining Hall"] = req.body.dininghall;
        category["Residential Hall"] = req.body.residentialhall;
        category["Library"] = req.body.library;
        category["Gym"] = req.body.gym;

        for (let key in category) {
            let keyLowered = key.toLowerCase().replace(/\s/g, "").replace(/'/g, "");
            //create in the schools (overall) document
            SearchModel = searchModel(schoolLowered)
            SearchModel.create({
                url:schoolLowered + keyLowered,
                name: school + " "+key,
                totalCount:0,
                category:keyLowered
            })

            let modified = [];

            for (let i = 0; i < category[key].length; i++) {
                modified[i] = category[key][i].toLowerCase().replace(/\s/g, "").replace(/'/g, "");
            }

            for (let i = 0; i < category[key].length; i++) {
                Item.create({
                    rank: 1,
                    image: `https://campusranked.s3.us-east-2.amazonaws.com/${school}/gym/${modified[i]}.jpg`,
                    name: category[key][i],
                    title: (schoolLowered+keyLowered),
                    category: keyLowered,
                    reviews: [],
                    ratings: categoryData[(keyLowered+"Query")],
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
        }
    })
}