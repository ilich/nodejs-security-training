"use strict";

var crypto = require("crypto");

var createUserModel = function (db, user) {
	var users = db.collection("users");
	
	function validateUsername(username) {
		return /^[a-z0-9]+$/ig.test(username);	
	}
	
	function validatePassword(password) {
		return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password);
	}
	
	function validate(user, callback) {
		if (!validateUsername(user.username)) {
			return callback("Invlid username", false);
		}
		
		if (user.password !== user.confirmation) {
			return callback("Passwords do not match", false);
		}	
		
		if (!validatePassword(user.password)) {
			return callback("Invaid password", false);
		}
		
		users.findOne({ username: user.username }, function (err, item) {
			if (err) {
				return callback("Database error", false);
			}
			
			if (item != null) {
				return callback("User " + user.username + " exists. Choose different username.", false);
			}
			
			callback(null, true);
		});
	};
	
	function calculateHash(password, salt) {
		var hash = crypto.pbkdf2Sync(password, salt, 4096, 512, "sha256").toString("hex");
		return hash;
	}
	
	function hashPassword(password, callback) {
		crypto.randomBytes(256, function (err, buf) {
			if (err) {
				return callback(err, null);
			}
			
			var salt = buf.toString("hex");
			var pwd = calculateHash(user.password, salt);
			
			callback(null, {
				hash: pwd,
				salt: salt
			});
		});
	}
	
	function verifyPassword(password) {
		if (!user) {
			return false;
		}
		
		var pwd = calculateHash(password, user.salt);
		return pwd === user.password;
	}
	
	return {
		validate: validate,
		hashPassword: hashPassword,
		verifyPassword: verifyPassword
	};
};

module.exports = createUserModel;