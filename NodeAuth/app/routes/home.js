"use strict";

var util = require("util");
var createUsersModel = require("../models/user");

function HomeController(db) {
	var users = createUsersModel(db);
	
	this.index = function (req, res, next) {
		if (req.isAuthenticated()) {
			res.redirect("/account");
		} else {
			res.render("home/index", {
				message: req.flash("error")
			});	
		}
	};
	
	this.register = function (req, res, next) {
		res.render("home/register", {
			message: req.flash("error")
		});
	};
	
	this.account = function (req, res, next) {
		res.render("home/account", {
			username: req.user.username
		});
	};
	
	this.logout = function (req, res, next) {
		req.logout();
		res.redirect("/");	
	};
	
	/*this.createAccount = function (req, res, next) {
		users.create({
			username: req.body.username,
			password: req.body.password,
			confirmation: req.body.confirmation
		}, function (err) {
			if (err === null) {
				res.redirect("/?c=1");
			} else {
				var errors = util.isArray(err) ? err : [ err ];
				res.render("home/register", {
					errors: errors
				});
			}
		});
	};*/
}

module.exports = HomeController;