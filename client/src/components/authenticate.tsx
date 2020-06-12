import React from 'react';
import { useHistory } from "react-router-dom";
import { checkAuth } from '../modules/spotify';

const queryString = require('query-string');

function auth(history: any, code: string) {
    checkAuth(history, code)
}

function Authenticate() {
    const history = useHistory();
    var parsed = queryString.parse(window.location.search);
    auth(history, parsed.code)

    return (
        <h1>Authenticating...</h1>
    )
}

export default Authenticate;