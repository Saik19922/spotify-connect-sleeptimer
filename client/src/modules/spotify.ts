var SpotifyWebApi = require('spotify-web-api-node');


var credentials = {
    clientId: 'clientId',
    clientSecret: 'clientSecret',
    redirectUri: 'http://ip:port/auth'
};

var spotifyApi = new SpotifyWebApi(credentials);

function Auth() {
    var scopes = ['user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing'],
        state = '1337State';
    var authUrl = spotifyApi.createAuthorizeURL(scopes, state);
    window.location.href = authUrl;
}

function checkAuth(history: any, code: string): any {
    const url = 'http://CHANGE_IP_HERE:3001/authenticate?code=' + code;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            spotifyApi.setAccessToken(data.access_token);
            accessToken = {
                access_token: data.access_token,
                refresh_token: data.refresh_token
            }
            loggedIn = true;
            history.push("/setTimeout");
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
