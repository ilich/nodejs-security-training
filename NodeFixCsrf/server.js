"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var session = require("express-session");
var helmet = require("helmet");
var routes = require("./app/routes");

var app = express();

app.use(express.static(__dirname + "/app/assets"));

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: "7AtubraDgRrDdrabRafr8Pr_q",
	key: "sid",
	cookie: {
		httpOnly: true
	}
}));

app.use(helmet.hidePoweredBy());

app.engine("html", ejs.renderFile);
app.set("view cache", false);
app.set("view engine", "html");
app.set("views", __dirname + "/app/views");

routes(app);

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("Node.js CSRF prevention sample is running at http://%s:%s", host, port);
});

// Errors handler

app.use(function (err, req, res, next) {
	if (err.code !== 'EBADCSRFTOKEN') {
		return next(err);
	}
	
	// handle CSRF token errors here
	res.redirect("/bad-token");
})