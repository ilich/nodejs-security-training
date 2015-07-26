"use strict";

var util = require("util");
var createUsersModel = require("../models/user");

function HomeController(db) {
	this.index = function (req, res, next) {
		if (req.isAuthenticated()) {
			res.redirect("/account");
		} else if (req.query.c == 1) {
			res.render("home/index", {
				message: "Account has been created",
				css: "bg-success"
			});	
		} else {
			res.render("home/index", {
				message: req.flash("error"),
				css: "bg-danger"
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
	
	this.createAccount = function (req, res, next) {
		var model = createUsersModel(db, {
			username: req.body.username,
			password: req.body.password,
			confirmation: req.body.confirmation
		});
		
		model.createAccount(function (err) {
			if (err === null) {
				res.redirect("/?c=1");
			} else {
				res.render("home/register", {
					message: err
				});
			}
		});
	};
}

module.exports = HomeController;