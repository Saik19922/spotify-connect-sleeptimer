

## Spotify-Connect-SleepTimer

This is a simple reactJS/Node+Express setup to implement a sleeptimer for Spotify Connect enabled devices if the App's sleeptimer doesn't work (for example raspotify/librespot).

Simply replace any occurence of `credentials` to fit your credentials (obtained through creating a project at developers.spotify.com). `redirectUri` is the IP where the app is hosted followed by :5000/auth or just /auth if you plan to host on port 80. `redirectUri` has to match accross all occurencies in the app.
