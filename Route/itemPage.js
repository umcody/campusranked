const criterions = require("../Model/campusCategory.json");
module.exports =function(app,mongoose){
    
    
    let itemSchema = new mongoose.Schema(criterions.category)

    app.get("/api/detailed/:title/:item",function(req,res){


        const title = req.params.title;
        const item = req.params.item;

        const Item = new mongoose.model(title,itemSchema);

        Item.findOne({name:item}, function(err,data){
            if(err){
                console.log(err);
                res.status(400);
                return;
            }else{d
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