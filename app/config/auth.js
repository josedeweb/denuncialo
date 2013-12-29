'use strict';
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google').Strategy;

exports.socialAuth = function ( app, passport ){
	passport.use( new FacebookStrategy({
	    clientID: app.get('facebookId'),
	    clientSecret: app.get('facebookSecret'),
	    callbackURL: "/auth/facebook/callback"
	}, function( accessToken, refreshToken, profile, done ) {		
	    return done(null, profile);
	}));

	passport.use( new TwitterStrategy({
	    consumerKey: app.get('twitterKey'),
	    consumerSecret: app.get('twitterSecret'),
	    callbackURL: "/auth/twitter/callback"
	}, function( token, tokenSecret, profile, done ) {		
	    return done(null, profile);
	}));

	/*passport.use( new GoogleStrategy({
	    clientID: app.get('googleId'),
	    clientSecret: app.get('googleSecret'),
	    callbackURL: "/auth/google/callback"
	}, function( identifier, profile, done ) {
		console(profile);
	    return done(null, profile);
	}));*/

	passport.serializeUser( function(user, done){
	    done(null, user);
	});

	passport.deserializeUser( function(obj, done){
	    done(null, obj);
	});
}