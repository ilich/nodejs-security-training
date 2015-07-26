"use strict";

var basicAuth = require("basic-auth");
var config = require("../../config/config");

var httpAuth = function (req, res, next) {
	function isAuthenticated(user) {
		return user && 
			user.name === config.basicAuth.username && 
			user.pass === config.basicAuth.password; 
	}
	
	function unauthorized() {
		res.set('WWW-Authenticate', 'Basic realm=NodeJsSecurity');
		res.sendStatus(401);
	}
	
	var user = basicAuth(req);
	if (isAuthenticated(user)) {
		next();
	} else {
		unauthorized();
	}
};

module.exports = httpAuth;