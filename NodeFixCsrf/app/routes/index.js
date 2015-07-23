"use strict";

var HomeController = require("./home");

var routes = function (app) {
	var homeController = new HomeController();
	app.get("/", homeController.index);
};

module.exports = routes;