var Search = require('./searchModel.js');

module.exports=function(app,mongoose){

    let searchSchema = new mongoose.Schema({
        url:String,
        name:String
    })


    app.get("/search",function(req,res){

        Search.find({},function(err,data){
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
        Search.find({url:item},function(err,data){
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

        Search.find({url:item},function(err,data){
            if(err){
                return err;
            }
            else{
                res.json(data);
            }
        });
    })
}