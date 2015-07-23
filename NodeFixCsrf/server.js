"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var routes = require("./app/routes");

var app = express();

app.use(bodyParser.urlencoded({
	extended: false
}));

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