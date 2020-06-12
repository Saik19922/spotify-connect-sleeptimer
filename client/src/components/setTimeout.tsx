import React from 'react';
import { spotifyApi, getTokens } from '../modules/spotify';

const queryString = require('query-string');

class setTimeout extends React.Component {
    constructor(props: any) {
        super(props);

        this.time = this.time.bind(this);
    }

    componentDidMount() {
        spotifyApi.getMe()
            .then(function (data: any) {
                console.log('Some information about the authenticated user', data.body);
            }, function (err: any) {
                console.log('Something went wrong!', err);
            });
    }

    time(event: any) {
        var accessToken = getTokens();
        console.log(accessToken);
        var value = event.target.value;
        fetch('http://192.168.178.39:5000/timeout?timeoutType='+value+"&accessToken="+accessToken.access_token+"&refreshToken="+accessToken.refresh_token);
    }

    render() {
        return (
            <div>
                <h1>How long to stop?</h1>
                <ol>
                    <li>
                        <button onClick={this.time} value={0}>Stop in 15 minutes</button>
                    </li>
                    <li>
                        <button onClick={this.time} value={1}>Stop in 30 minutes</button>
                    </li>
                    <li>
                        <button onClick={this.time} value={2}>Stop in 45 minutes</button>
                    </li>
                    <li>
                        <button onClick={this.time} value={3}>Stop in 60 minutes</button>
                    </li>
                </ol>
            </div>
        )
    }
}

export default setTimeout;