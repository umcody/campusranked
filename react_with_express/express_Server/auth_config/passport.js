const bcrypt = require("bcrypt");
const passport = require("passport"),
    LocalStrategy = require("passport-local"),
    UserModel = require("../Model/userModel"),
    JWTStrategy = require("passport-jwt").Strategy,
    ExtractJWT = require("passport-jwt").ExtractJwt;

module.exports = function (app, mongoose) {

    passport.use("register", new LocalStrategy({
        
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, function (req,email, password, done) {
        UserModel.findOne({ email: email },
            function (err, account) {
                if (err) { // if error, done(err)
                    done(err);
                } else { // If no error, check if the email already exists in the database or not.
                    if (account !== null) { //User already exists
                        console.log("User with the email already exists");
                        //HAVE TO RETURN A JSON FILE THAT SAYS ERROR
                        return done(null, false);
                    } else { // User does not exist
                        bcrypt.hash(password, 12, function (err, hashed) { //HASH
                            if (err) {
                                done(err);
                            } else {
                                UserModel.create({ //CREATE
                                    username: req.body.username,
                                    email: email,
                                    password: hashed
                                }).then(user => {
                                    console.log("Created User");
                                    return (done(null, user));
                                });
                            }
                        });
                    }
                }
            });
    }));

    passport.use("login", new LocalStrategy({
        usernameField:"email",
        passwordField:"password",
        session: false 
    },function (email,password,done){
        UserModel.findOne({email:email},function(err,account){
            if(err){
                done(err);
            }
            if(account=== null){
                console.log("NO SUCH USER")
                done(null,false);
            }else{
                console.log(password+" "+ account.password);
                bcrypt.compare(password,account.password,function(err,response){
                    if(err){
                        done(err);
                        console.log(err);
                    }
                    console.log(response);
                    if(!response){
                        console.log("Password does not match");
                        done(null,false);
                    }else{
                        console.log("correct");
                        done(null,account);
                    }
                });
            }
        });
    }));

    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: "temp" // modify and secure this in .env
    },function(jwt_payload,done){

        UserModel.findOne({email:jwt_payload.email}, function(err,account){
            if(err){
                done(err);
            }
            if(account){
                console.log("found user");
                done(null,account);
            }else{
                console.log("did not find user");
                done(null,false);
            }
        })
    }))
}
