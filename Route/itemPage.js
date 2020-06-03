const criterions = require("../Model/campusCategory.json");
module.exports =function(app,mongoose){
    
    
    let itemSchema = new mongoose.Schema({
        rank: Number,
        image: String,
        name: String,
        title: String,
        count: Number,
        category: String,
        ratings: Object,
        reviewCounts: Number,
        reviews:Array
    })

    app.get("/api/detailed/:title/:item", async function(req,res){


        const title = req.params.title;
        const item = req.params.item;

        let Item
        try{
            Item = mongoose.model(title);
        }catch(error){
            Item =  mongoose.model(title, itemSchema);
        }

        Item.findOne({name:item}, function(err,data){
            if(err){
                console.log(err);
                res.status(400);
                return;
            }else{
                if(data === null){
                    res.status(422);
                    return;
                }else{

                    res.status(200).json(data);
                }
            }
        })
    })


}