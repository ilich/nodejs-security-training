"use strict";

var auth = require("../middleware/auth");
var HomeController = require("./home");

var routes = function (app) {
	var homeController = new HomeController();
	app.get("/", auth, homeController.index);
};

module.exports = routes;