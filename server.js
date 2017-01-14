'use strict';
var express = require('express'),
	fs = require("fs"),
	app = express(),
	session = require('express-session'),
    cors = require('cors'),
	bodyParser = require('body-parser'),
	path = require('path'),
	flash = require('express-flash'),
    FeedParser = require('feedparser'),
    request = require('request');

app.set('port', process.env.PORT || 3000);
app.set('base url', process.env.URL || 'http://localhost');

app.use(cors());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', process.env.allowOrigin || 'http://localhost');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(express.static(__dirname + '/app'));

app.post('/getParsedFeed', function(req, res) {

    var parsedFeed = [];
    var req = request(req.body.url);
    var feedparser = new FeedParser({ normalize : true, addmeta: false  });

    req.on('error', function (error) {
        console.log('Feed xml req error')
    });

    req.on('response', function (res) {
        var stream = this;

        if (res.statusCode !== 200) {
            this.emit('error', new Error('Bad status code'));
        } else {
            stream.pipe(feedparser);
        }
    });

    feedparser.on('error', function (error) {
        console.log("FeedParser error");
    });

    feedparser.on('readable', function () {
        var stream = this,
        meta = this.meta,
        item;
        while (item = stream.read()) {
            parsedFeed.push(item);
            return parsedFeed;
        }
        res.send({
            feed: parsedFeed
        });
    });
});

app.listen(app.get('port'));
module.exports = app;
