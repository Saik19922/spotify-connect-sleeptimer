import React from 'react';
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { Auth, checkAuth, checkState } from './modules/spotify';
import Authenticate from './components/authenticate';
import setTimeout from './components/setTimeout';

const queryString = require('query-string');

interface IndexState {
  loggedIn: boolean
}

function loginPrompt() {
  return (
    <div>
      <p>Please login</p>
      <button onClick={Auth}>Auth</button>
    </div>
  )
}

class App extends React.Component {

  componentDidMount() {
    //Logic
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>

          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', minHeight: '80%' }}>
            <Route path="/" exact component={loginPrompt} />
            <Route path="/auth" component={Authenticate} />
            <Route path="/setTimeout" component={setTimeout} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
