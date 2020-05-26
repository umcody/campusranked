const passport = require("passport");
const jwt = require("jsonwebtoken");


module.exports = function (app, mongoose) {
    app.post("/register", function (req, res) { // ROUTING FOR REGISTERATION
        passport.authenticate("register", { session: false }, function (err, user) {
            if (err) {
                console.log(err);
            }
            console.log("success");
        })(req, res);
    });

    app.post("/login", function (req, res, next) { // ROUTING FOR LOGIN
        passport.authenticate("login", { session: false }, function (err, user) {
            if (err) {
                console.log(err);
            } else {
                if (user === false) {
                    res.status(422).send({
                        auth: false,
                        message: "Username or password is wrong"
                    });
                } else {
                    req.logIn(user, function (err) {
                        const token = jwt.sign({ email: user.email }, "temp");//change this later
                        console.log("LOGGED IN!");
                        res.status(200).send({
                            auth: true,
                            token: token,
                            message: "good"
                        })
                    })
                }
            }
        })(req, res, next);
    });

    app.get("/findUser", function (req, res) {
        passport.authenticate("jwt", { session: false }, function (err, user) {
            if (err) {
                console.log(err)
            } else {
                res.json(user);
            }
        })(req, res);
    })
}