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

    app.get("/api/detailed/:school/:title/:item", async function(req,res){

        const school = req.params.school;
        const title = req.params.title;
        const item = req.params.item;

        let Item
        try {
            Item = mongoose.model(school+"campus");
        } catch (error) {
            Item = new mongoose.model(school+"campus",itemSchema);
        }

        Item.findOne({name:item,title:title}, function(err,data){
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