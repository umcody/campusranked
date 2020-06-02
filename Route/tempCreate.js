// THIS FILE IS USED TO CREATE DOUCMENTS.. DO NOT MODIFY
module.exports = function(app,mongoose){
    app.get("/api/create",function(req,res){

        let itemSchema = new mongoose.Schema({
            rank: Number,
            image: String,
            name: String,
            title: String,
            count: Number,
            category: String,
            ratings: Object,
            reviewCounts: Number,
            reviews:Object
        })
            const Item =  mongoose.model("uwmadisondininghall", itemSchema);
            let diningHalls = ["Carson's Market", "Four Lakes Market", "Gordon Avenue Market", "Liz's Market", "Newell's Deli", "Rheta's Market"];
    
            let diningHallsModified =[];
    
            for (let i = 0; i < diningHalls.length; i++) {
                diningHallsModified[i] = diningHalls[i].toLowerCase().replace(/\s/g, "").replace(/'/g, "");
            }
    
            for (let i = 0; i < diningHalls.length; i++) {
                Item.create({
                    rank: 1,
                    image: "../asset/" + diningHallsModified[i] + ".jpg",
                    name: diningHalls[i],
                    category: "uwmadisondininghall",
                    reviews: {Test:"test"},
                    ratings: {
                        taste:0,
                        hygiene:0,
                        variety:0,
                        nutrition:0,
                        price:0
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
    }