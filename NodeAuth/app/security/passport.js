var LocalStrategy = require("passport-local").Strategy;
var ObjectID = require("mongodb").ObjectID;
var createUserModel = require("../models/user.js");

function configure(passport, db) {
	var users = db.collection("users");
	
	passport.serializeUser(function (user, done) {
		done(null, user._id);
	});
	
	passport.deserializeUser(function (id, done) {
		users.findOne(new ObjectID(id), function (err, user) {
			done(err, user);
		});
	});
	
	// Registration
	
	// Authentication
	passport.use("local-login", new LocalStrategy(
		function (username, password, done) {
			process.nextTick(function () {
				users.findOne({ username: username }, function (err, user) {
					if (err) {
						return done(err);
					}
					
					if (!user) {
						return done(null, false, { message: "Invalid username or password" });	
					}
					
					var model = createUserModel(db, user);
					if (!model.verifyPassword(password)) {
						return done(null, false, { message: "Invalid username or password" });
					}
					
					return done(null, user);
				});
			});
		}));
}

module.exports = configure;