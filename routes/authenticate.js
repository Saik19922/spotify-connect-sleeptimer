var express = require('express');
var cors = require('cors')
var router = express.Router();

var SpotifyWebApi = require('spotify-web-api-node');

var credentials = {
    clientId: 'clientId',
    clientSecret: 'clientSecret',
    redirectUri: 'http://ip:port/auth'
};

var spotifyApi = new SpotifyWebApi(credentials);

/* GET users listing. */
router.get('/', cors(), async function (req, res, next) {
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
