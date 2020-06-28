const categoryData = require("./categoryData.json");
const schoolModel = require("../../Model/schoolModel.js");
const searchModel = require("../../Model/searchModel.js");
const search = require("../search");

module.exports = function (app, mongoose) {
    app.post("/api/admin/newSchool", function (req, res) {

        console.log(req.body);
        const school = req.body.schoolName;

        //create school in school (collective) document
        schoolModel.create({
            name:school,
            url:school.toLowerCase().replace(/\s/g, "").replace(/'/g, ""),
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

        const Item = mongoose.model(school+"campus", itemSchema);
        category["dininghall"] = req.body.dininghall;
        category["residentialhall"] = req.body.residentialhall;
        category["library"] = req.body.library;
        category["gym"] = req.body.gym;

        for (let key in category) {

            //create in the schools (overall) document
            SearchModel = searchModel(school)
            SearchModel.create({
                url:school.toLowerCase().replace(/\s/g, "").replace(/'/g, ""),
                name: req.body.schoolName,
                totalCount:0,
                category:key
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
                    title: (school+key),
                    category: key,
                    reviews: [],
                    ratings: categoryData[(key+"Query")],
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