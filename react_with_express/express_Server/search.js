
module.exports=function(app,mongoose){

    let searchSchema = new mongoose.Schema({
        url:String,
        name:String
    })

    const SearchModel = new mongoose.model("item", searchSchema);

    app.get("/search",function(req,res){
        SearchModel.find({},function(err,data){
            if(err){
                return err;
            }
            else{
                res.json(data);
            }
        });
    });
    app.get("/search/:item",function(req,res){
        const item = req.params.item;
        SearchModel.find({url:item},function(err,data){
            if(err){
                return err;
            }
            else{
                res.json(data);
            }
        });
    });

    app.get("/getTitle/:item",function(req,res){
        const item = req.params.item;

        SearchModel.find({url:item},function(err,data){
            if(err){
                return err;
            }
            else{
                res.json(data);
            }
        });
    })
}