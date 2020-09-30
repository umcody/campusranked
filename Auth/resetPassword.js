let User = require("../Model/userModel.js");
const Crypto = require("crypto");
const NodeMailer  = require("nodemailer");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt")


module.exports = function (app, mongoose) {
    dotenv.config();
    app.post("/api/forgotpassword", function (req, res) {
        console.log(req.body);
        const email = req.body.email;

        console.log("EXISTS");

        User.findOne({ email: email }, function (err, user) {
            if (err) {

                console.log(err);
                //send error
            } else if (user) {
                console.log("EXISTS");
                Crypto.randomBytes(20, function (err, buf) {
                    let token = buf.toString("hex"); // *********

                    user.resetPasswordToken = token;
                    user.resetPasswordExpiration = Date.now() + 3600000;
                    console.log(user.email);
                    user.save(function (err) {
    
                        var smtpTransport = NodeMailer.createTransport({
                            service:"gmail",
                            auth:{
                                user: "campusranked@gmail.com",
                                pass: process.env.emailPassword
                            }
                        });
    
                        var mailOptions = {
                            from: "campusranked@gmail.com",
                            to: user.email,
                            from: "Reset Password for Campus Ranked",
                            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                            'https://www.campusranked/reset/' + token + '\n\n' +
                            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                        }

                        smtpTransport.sendMail(mailOptions, function(err,info){
                            //send err
                            if(err){
                                console.log(err);
                                res.status(422).send({
                                    success:false
                                })
                            }else{
                                console.log(info);
                                console.log("SUCESS!")
                                res.status(200).send({
                                    success:true
                                })
                            }
                        })
                    })

                })


            } else {
                res.status(422).send({
                    success:false
                })
            }
        })

    });

    app.post("/api/reset/:token", function(req,res){
        const token = req.params.token;

        User.findOne({resetPasswordToken:token,resetPasswordExpiration:{$gt: Date.now()}}, function (err,user){
            
            if(user){
                bcrypt.hash(req.body.password,12, function(err,hashed){
                    user.password = hashed;
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpiration = undefined;
                    user.save(function(err){
                        if(!err){
                            console.log("user password successfully reset");
                            res.status(200).send({
                                success:true
                            })
                        }
                    })
                })
               
            }else{
               console.log("user not found");
               res.status(422).send({
                   success:false
               })
            }
        })
    })

}