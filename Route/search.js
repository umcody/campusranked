var Search = require('../Model/searchModel.js');

module.exports=function(app,mongoose){



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