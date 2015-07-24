"use strict";

function HomeController() {
}

HomeController.prototype.index = function (req, res, next) {
	res.render("home/index");
};

module.exports = HomeController;