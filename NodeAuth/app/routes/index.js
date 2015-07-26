"use strict";

var HomeController = require("./home");

var routes = function (app, db, passport) {
	var homeController = new HomeController(db);
	
	app.get("/", homeController.index);
	app.post("/", passport.authenticate("local", {
		successRedirect: "/account",
		failureRedirect: "/",
		failureFlash: true	
	}));
	
	app.get("/register", homeController.register);
	app.get("/account", isLoggedIn, homeController.account);
	app.get("/logout", homeController.logout);
	app.post("/register", homeController.createAccount);
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect("/");	
	}
}

module.exports = routes;