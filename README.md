

## Spotify-Connect-SleepTimer

This is a simple reactJS/Node+Express setup to implement a sleeptimer for Spotify Connect enabled devices if the App's sleeptimer doesn't work (for example raspotify/librespot).

Simply replace any occurence of `credentials` to fit your credentials (obtained through creating a project at developers.spotify.com). `redirectUri` is the IP where the app is hosted followed by :5000/auth or just /auth if you plan to host on port 80. `redirectUri` has to match accross all occurencies in the app.

Then run npm run-scripts build and serve the react part of the app, and npm start in the projects root to serve the backend. Should any errors arise write an Issue (I just made this as a quick fix for missing sleeptimers and it's working as-is but I'll try to give support).
