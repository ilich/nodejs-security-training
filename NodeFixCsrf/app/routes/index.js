"use strict";

var csurf = require("csurf");
var HomeController = require("./home");

var routes = function (app) {
	var csrfProtection = csurf();
	
	var homeController = new HomeController();
	app.get("/", csrfProtection, homeController.index);
	app.post("/", csrfProtection, homeController.processForm);
	app.get("/bad-token", csrfProtection, homeController.badToken);
};

module.exports = routes;