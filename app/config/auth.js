'use strict';
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google').Strategy;
var UserModel = require('../models').UserModel;

function findOrCreate ( profile, cb ) {
    UserModel.findOrCreate({ userId: profile.id }, profile, cb);
}

function parserProfile( profile ) {
    return {
        userId 		   : profile.id,
        userName   : profile.userName,
        displayName	: profile.displayName
    };
}

exports.socialAuth = function ( app, passport ){
	passport.use( new FacebookStrategy({
	    clientID: app.get('facebookId'),
	    clientSecret: app.get('facebookSecret'),
	    callbackURL: "/auth/facebook/callback"
	}, function( accessToken, refreshToken, profile, done ) {		
	    profile = parserProfile( profile );
        findOrCreate(profile, done);
	}));

	passport.use( new TwitterStrategy({
	    consumerKey: app.get('twitterKey'),
	    consumerSecret: app.get('twitterSecret'),
	    callbackURL: "/auth/twitter/callback"
	}, function( token, tokenSecret, profile, done ) {		
	    profile = parserProfile( profile );
        findOrCreate(profile, done);
	}));	

	passport.serializeUser( function(user, done){
	    done(null, user);
	});

	passport.deserializeUser( function(obj, done){
	    done(null, obj);
	});
}