var express = require('express');
var router = express.Router();
var cors = require('cors')
var schedule = require('node-schedule');

var SpotifyWebApi = require('spotify-web-api-node');

var credentials = {
    clientId: '7a03a4441fc3426d88dee8d672bcdf27',
    clientSecret: 'c0568d3e10cc4c65bfe4b52e61bf07eb',
    redirectUri: 'http://192.168.178.39:5000/auth'
};

var spotifyApi = new SpotifyWebApi(credentials);

/* GET users listing. */
router.get('/', cors(), async function (req, res, next) {
    var type = parseInt(req.query.timeoutType);
    var codePair = {
        access_token: req.query.accessToken,
        refresh_token: req.query.refreshToken
    };

    var startTime;

    // Setup spotify API with proper token
    spotifyApi.setAccessToken(codePair.access_token);
    spotifyApi.setRefreshToken(codePair.refresh_token);

    var start = new Date();

    switch (type) {
        case 0:
            start.setMinutes(start.getMinutes() + 15);
            console.log('Stop scheduled at ' + start);
            break;
        case 1:
            start.setMinutes(start.getMinutes() + 30);
            console.log('Stop scheduled at ' + start);
            // Reauth after 29 minutes.
            rd = new Date();
            rd.setMinutes(rd.getMinutes() + 29);
            var reauth = schedule.scheduleJob(rd, function () {
                spotifyApi.refreshAccessToken().then(
                    function (data) {
                        console.log("Refreshed." + data.statusCode);
                        spotifyApi.setAccessToken(data.body.access_token);
                    }
                );
            });
            break;
        case 2:
            start.setMinutes(start.getMinutes() + 45);
            console.log('Stop scheduled at ' + start);
            // Reauth after 29 minutes.
            rd = new Date();
            rd.setMinutes(rd.getMinutes() + 29);
            var reauth = schedule.scheduleJob(rd, function () {
                spotifyApi.refreshAccessToken().then(
                    function (data) {
                        console.log("Refreshed." + data.statusCode);
                        spotifyApi.setAccessToken(data.body.access_token);
                    }
                );
            });
            break;
        case 3:
            start.setMinutes(start.getMinutes() + 60);
            console.log('Stop scheduled at ' + start);
            // Reauth after 29 minutes.
            rd1 = new Date();
            rd2 = new Date();
            rd1.setMinutes(rd.getMinutes() + 29);
            rd2.setMinutes(rd.getMinutes() + 59);
            var reauth1 = schedule.scheduleJob(rd1, function () {
                spotifyApi.refreshAccessToken().then(
                    function (data) {
                        console.log("Refreshed." + data.statusCode);
                        spotifyApi.setAccessToken(data.body.access_token);
                    }
                );
            });
            var reauth2 = schedule.scheduleJob(rd2, function () {
                spotifyApi.refreshAccessToken().then(
                    function (data) {
                        console.log("Refreshed." + data.statusCode);
                        spotifyApi.setAccessToken(data.body.access_token);
                    }
                );
            });
            break;
        default:
            console.log('Default');
            break;
    }

    //TODO: Re-auth logic
    var job = schedule.scheduleJob(start, function () {
        console.log("Pausing now.");
        spotifyApi.pause().then(
            function (data) {
                console.log(data.statusCode, data.body);
            }
        );
    });
    res.sendStatus(200);
});

module.exports = router;