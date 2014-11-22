var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var mongoose = require( 'mongoose' );
var jwt = require( 'jwt-simple' );
var passport = require( 'passport' );
var localStrategy = require( './services/localStrategy' );
var emailVerification = require( './services/emailVerification' );
var createSendToken = require( './services/jwt' );
var googleAuth = require( './services/googleAuth' );
var facebookAuth = require( './services/facebookAuth' );
var jobs = require( './services/jobs' );

var app = express();

app.use( bodyParser.json() );
app.use( passport.initialize() );

passport.serializeUser( function (user, done) {
    done( null, user.id );
} );

app.use( function (req, res, next) {
    res.header( 'Access-Control-Allow-Origin', '*' );
    res.header( 'Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE' );
    res.header( 'Access-Control-Allow-Headers', 'Content-Type, Authorization' );
    next();
} );

passport.use( 'local-register', localStrategy.register );
passport.use( 'local-login', localStrategy.login );

app.post( '/auth/register', passport.authenticate( 'local-register' ), function (req, res) {
    console.log(req);
    emailVerification.send( req.user.email );
    createSendToken( req.user, res );
} );

app.get( '/auth/verifyEmail', emailVerification.handler );

app.post( '/auth/login', passport.authenticate( 'local-login' ), function (req, res) {
    createSendToken( req.user, res );
} );

app.post( '/auth/facebook', facebookAuth );

app.get( '/jobs', jobs );

app.post( '/auth/google', googleAuth );

mongoose.connect( 'mongodb://pluralsight:Welkom01@ds055990.mongolab.com:55990/ps_jwt' );

var server = app.listen( 3000, function () {
    console.log( 'psJWT API listening on port', server.address().port );
} );