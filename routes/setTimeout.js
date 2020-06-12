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

    const timeMult = 60 * 1000;
    const reauthTimer = 1740 * 1000;
    var startTime;

    // Setup spotify API with proper token
    spotifyApi.setAccessToken(codePair.access_token);
    spotifyApi.setRefreshToken(codePair.refresh_token);

    switch (type) {
        case 0:
            startTime = Date(Date.now() + (timeMult * 15));
            console.log('Stop scheduled at ' + startTime);
            break;
        case 1:
            startTime = Date(Date.now() + (timeMult * 30));
            console.log('Stop scheduled at ' + startTime);
            // Reauth after 29 minutes.
            reauthDelay = Date(Date.now() + reauthTimer);
            var reauth = schedule.scheduleJob({ start: reauthDelay }, function () {
                spotifyApi.refreshAccessToken().then(
                    function (data) {
                        spotifyApi.setAccessToken(data.body.access_token);
                    }
                );
            });
            break;
        case 2:
            startTime = Date(Date.now() + (timeMult * 45));
            console.log('Stop scheduled at ' + startTime);
            // Reauth after 29 minutes.
            reauthDelay = Date(Date.now() + reauthTimer);
            var reauth = schedule.scheduleJob({ start: reauthDelay }, function () {
                spotifyApi.refreshAccessToken().then(
                    function (data) {
                        spotifyApi.setAccessToken(data.body.access_token);
                    }
                );
            });
            break;
        case 3:
            startTime = Date(Date.now() + (timeMult * 60));
            console.log('Stop scheduled at ' + startTime);
            // Reauth after 29 and 58 minutes.
            reauthDelay1 = Date(Date.now() + reauthTimer);
            reauthDelay2 = Date(Date.now() + (reauthTimer * 2));
            var reauth1 = schedule.scheduleJob({ start: reauthDelay1 }, function () {
                spotifyApi.refreshAccessToken().then(
                    function (data) {
                        spotifyApi.setAccessToken(data.body.access_token);
                    }
                );
            });
            var reauth2 = schedule.scheduleJob({ start: reauthDelay2 }, function () {
                spotifyApi.refreshAccessToken().then(
                    function (data) {
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
    var job = schedule.scheduleJob({ start: startTime }, function () {
        spotifyApi.pause();
    });
    res.send(200);
});

module.exports = router;