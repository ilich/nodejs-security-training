"use strict";

function isValidName(name) {
	return /[A-Z ]+/ig.test(name);
}

function HomeController() {
}

HomeController.prototype.index = function (req, res, next) {
	res.render("home/index", {
		errors: [],
		firstName: "",
		lastName: "",
		token: req.csrfToken()
	});
};

HomeController.prototype.processForm = function (req, res, next) {
	var errors = [];
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	
	if (!isValidName(firstName)) {
		errors.push("First name is required");
	}
	
	if (!isValidName(lastName)) {
		errors.push("Last name is required");
	}
	
	if (errors.length > 0) {
		res.render("home/index", {
			errors: errors,
			firstName: firstName,
			lastName: lastName,
			token: req.csrfToken()
		});
	} else {
		res.render("home/results", {
			msg: "Thank you for registration!"
		});	
	}	
};

HomeController.prototype.badToken = function (req, res, next) {
	res.status(403);
	res.render("home/index", {
		errors: [ "Invalid request" ],
		firstName: "",
		lastName: "",
		token: req.csrfToken()
	});	
};

module.exports = HomeController;