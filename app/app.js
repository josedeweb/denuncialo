var path    = require('path');
var auth    = require('./config/auth');
var express = require('express');
var passport = require('passport');

var app = module.exports = express();

app.configure(function(){
    app.set('port', 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.set('view cache', false);
    /* env */
    app.set('facebookId', process.env.facebookId);
    app.set('facebookSecret', process.env.facebookSecret);
    app.set('twitterKey', process.env.twitterKey);
    app.set('twitterSecret', process.env.twitterSecret);
    //app.set('googleId', process.env.googleId);
    //app.set('googleSecret', process.env.googleSecret);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.cookieParser());
    app.use(express.session({secret: 'SECRET'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);    
    app.use(express.static(path.join(__dirname, '..', 'public')));
});

/* authentication */
auth.socialAuth( app, passport );