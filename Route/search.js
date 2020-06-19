var SchoolModel = require('../Model/schoolModel.js');
var SearchModel = require('../Model/searchModel.js');

module.exports=function(app,mongoose){



    app.get("/search",function(req,res){

        SchoolModel.find({},function(err,data){
            if(err){
                return err;
            }
            else{
                res.json(data);
            }
        });
    });

    /*
    app.get("/search/:school/:item",function(req,res){

        const item = req.params.item;
        const school = req.params.item;
        SchoolModel.find({name:item},function(err,data){
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
    */
}