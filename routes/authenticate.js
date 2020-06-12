var express = require('express');
var router = express.Router();

var SpotifyWebApi = require('spotify-web-api-node');

var credentials = {
    clientId: '7a03a4441fc3426d88dee8d672bcdf27',
    clientSecret: 'c0568d3e10cc4c65bfe4b52e61bf07eb',
    redirectUri: 'http://192.168.178.39:5000/auth'
};

var spotifyApi = new SpotifyWebApi(credentials);

/* GET users listing. */
router.get('/', async function (req, res, next) {
    var code = req.query.code;
    spotifyApi.authorizationCodeGrant(code).then(
        function (data) {
            var tokenPair = {
                access_token: data.body['access_token'],
                refresh_token: data.body['refresh_token']
            }
            res.send(tokenPair);
        },
        function (err) {
            console.log('Something went wrong', err);
            res.status(500).send('Something went wrong!');
        }
    )
});

module.exports = router;