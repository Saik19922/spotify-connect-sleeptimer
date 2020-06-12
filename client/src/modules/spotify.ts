var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
    clientId: '7a03a4441fc3426d88dee8d672bcdf27',
    clientSecret: 'c0568d3e10cc4c65bfe4b52e61bf07eb',
    redirectUri: 'http://192.168.178.39:5000/auth'
});

function Auth() {
    var scopes = ['user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing'],
        state = '1337State';
    var authUrl = spotifyApi.createAuthorizeURL(scopes, state);
    window.location.href = authUrl;
}

function checkAuth(history: any, code: string): any {
    const url = 'http://192.168.178.39:3001/authenticate?code=' + code;
    console.log(url);
    fetch(url)
        .then(res => {
            console.log(res);
            console.log(res.json());
            return res.json();
        })
        .then(data => {
            console.log(data);
            spotifyApi.setAccessToken(data.access_token);
            accessToken = {
                access_token: data.access_token,
                refresh_token: data.refresh_token
            }
            loggedIn = true;
            history.push("http://192.168.178.39:3001/setTimeout");
        })
        .catch(err => {
            console.log(err);
        });
}

function checkState(): boolean {
    return loggedIn;
}

function getTokens(): AccessToken {
    return accessToken;
}

type AccessToken = {
    access_token: string;
    refresh_token: string;
}

var accessToken: AccessToken;
var loggedIn: boolean = false;

export { spotifyApi, Auth, checkAuth, checkState, getTokens }