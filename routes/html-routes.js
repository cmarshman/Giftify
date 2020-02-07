// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the app page
    if (req.user) {
      res.redirect("/app");
    }
    res.render(path.join(__dirname, "../public/search.handlebars"));
    // ../public/signup.html
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the app page
    if (req.user) {
      res.redirect("/app");

    }
    res.render(path.join(__dirname, "../public/login.handlebars"));
    // ../public/login.html
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/app", isAuthenticated, function(req, res) {
    db.GiftList.findAll({}).then(function (data) {
      res.render("search",{GiftList: data});
      });
    // ../public/app.html
  });

};
