var express = require('express');
var router = express.Router();
var InstagramGetFeed = require('./instagramGetFeed').InstagramGetFeed;
var RealTime = require('./realtime').RealTime;

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

////////////////////////////////////
// Feeder config:
// tag
// interval
// record 
////////////////////////////////////
var config = require('../config.json');
var instafeeder = new InstagramGetFeed(config.tag, config.take);

/* GET search page for instagram tag. */
router.get('/search', function(req, res, next) {
    var realtime = new RealTime(io).onLogin(instafeeder.feed).run();
    res.render('index', { title: 'Instagram Tag Search' });
});

//Possiamo migliorare questa policy not in scope al momento
router.get('/', function(req, res, next) {
    res.end("Route Errore Policy");
});

module.exports = router;
