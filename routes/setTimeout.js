var express = require('express');
var router = express.Router();
var schedule = require('node-schedule');

var SpotifyWebApi = require('spotify-web-api-node');

var credentials = {
    clientId: '7a03a4441fc3426d88dee8d672bcdf27',
    clientSecret: 'c0568d3e10cc4c65bfe4b52e61bf07eb',
    redirectUri: 'http://192.168.178.39:5000/auth'
};

var spotifyApi = new SpotifyWebApi(credentials);

/* GET users listing. */
router.get('/', async function (req, res, next) {
    var type = parseInt(req.query.timeoutType);
    var codePair = {
        access_token: req.query.accessToken,
        refresh_token: req.query.refreshToken
    };

    const timeMult = 60*1000;
    const reauthTimer = 1740*1000;
    var startTime;

    // Setup spotify API with proper token
    spotifyApi.setAccessToken(codePair.access_token);
    
    switch(type) {
        case 0:
            console.log('Stop in 15 min', codePair);
            startTime = Date(Date.now() + 60000);
            break;
        case 1:
            console.log('Stop in 30 min.', codePair);
            startTime = Date(Date.now() + 120000);
            break;
        case 2:
            console.log('Stop in 45 min.', codePair);
            startTime = Date(Date.now() + 180000);
            break;
        case 3:
            console.log('Stop in 60 min.', codePair);
            startTime = Date(Date.now() + 240000);
            break;
        default:
            console.log('Default');
            break;
    }

    //TODO: Re-auth logic
    var job = schedule.scheduleJob({ start: startTime }, function() {
        spotifyApi.pause();
    });
    res.send(200);
});

module.exports = router;