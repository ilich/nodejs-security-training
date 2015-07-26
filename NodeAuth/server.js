"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var session = require("express-session");
var MongoClient = require("mongodb").MongoClient;
var passport = require("passport");
var flash = require("express-flash");
var config = require("./config/config");
var configurePassport = require("./app/security/passport");
var httpAuth = require("./app/middleware/http-auth");
var routes = require("./app/routes");

MongoClient.connect(config.db, function (err, db) {
	if (err) {
		console.log("Errror: cannot connect to " + config.db);
		console.log(err);
		
		process.exit(1);
	}
	
	console.log("Connected to " + config.db);
	
	var app = express();

	app.use(express.static(__dirname + "/app/assets"));
	
	app.use(session({
		resave: false,
		saveUninitialized: false,
		secret: "7AtubraDgRrDdrabRafr8Pr_q",
		key: "sid",
		cookie: {
			httpOnly: true
		}
	}));
	
	app.use(bodyParser.urlencoded({
		extended: false
	}));
	
	app.engine("html", ejs.renderFile);
	app.set("view cache", false);
	app.set("view engine", "html");
	app.set("views", __dirname + "/app/views");
	
	// Initialize Passport
	configurePassport(passport, db);
	
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());
	
	// Register basic HTTP authentication
	app.use(httpAuth);
	
	routes(app, db, passport);
	
	var server = app.listen(3000, function () {
		var host = server.address().address;
		var port = server.address().port;
		
		console.log("Node.js Authentication sample is running at http://%s:%s", host, port);
	});	
});
