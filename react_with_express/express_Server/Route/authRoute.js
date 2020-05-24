const passport = require("passport");
const passportAuth = require("../auth_config/passport.js");
const jwt = require("jsonwebtoken");


module.exports=function(app,mongoose){

    passportAuth(app,mongoose);
    app.post("/register",function(req,res){
        passport.authenticate("register",{session:false},function(err,user){
            if(err){
                console.log(err);
            }
            console.log("success");
        })(req,res);
    });

    app.post("/login",function(req,res,next){
        passport.authenticate("login", {session:false},function(err,user){
            if(err){
                console.log(err);
            }else{
                req.logIn(user,function(err){
                    const token = jwt.sign({email:user.email},"temp");//change this later
                    console.log("LOGGED IN!");
                    res.status(200).send({
                        auth:true,
                        token:token,
                        message: "good"
                    })
                })
            }
        })(req,res,next);
    });

    app.get("/findUser",function(req,res){
        passport.authenticate("jwt", {session:false},function(err,user){
            if(err){
                console.log(err)
            }else{
                res.json(user);
            }
        })(req,res);
    })
}