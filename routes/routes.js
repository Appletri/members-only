var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const User = require('../models/user');
const passport = require("passport");

router.get("/", (req, res) => {
  res.render("index", { user: req.user });
});
router.get("/sign-up", (req, res) => res.render("sign-up-form"));
router.get("/log-out", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.post("/sign-up", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) { 
      return next(err);
    }
    const user = new User({
      username: req.body.username,
      password: hashedPassword
    }).save(err => {
      if (err) { 
        return next(err);
      }
      res.redirect("/");
    });
  });
});

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

module.exports = router;