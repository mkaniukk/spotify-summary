const express = require('express');
const app = express();
const path = require('path');
const queryString = require('query-string');
const randomstring = require("randomstring");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const request = require('request');
const fs = require('fs');
const fsPromises = require('fs').promises;
const { debug } = require('console');
const router = express.Router();

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

// Send artist data.
app.get('/artists-data', (req, res, next) => {
  fsPromises.readFile('./data/artists.json')
    .then(data => res.status(200).send(data))
    .catch(err => next(err))
})

// Send user data.
app.get('/user-data', (req, res, next) => {
  fsPromises.readFile('./data/user.json')
    .then(data => res.status(200).send(data))
    .catch(err => next(err))
})

// Send tracks data.
app.get('/tracks-data', (req, res, next) => {
  fsPromises.readFile('./data/tracks.json')
    .then(data => res.status(200).send(data))
    .catch(err => next(err))
})

// Variables used for authorization
const CLIENT_ID = '26de0e4db2204b8fb4860589f4485263';
const REDIRECT_URI = 'http://192.168.0.178:3000/callback';
const CLIENT_SECRET = process.env.SPOTIFY_SECRET;
const SCOPE = 'user-read-private user-read-email user-library-read user-top-read';
var USER_ID = '';

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.get("/create-playlist", async (req, res) => {

  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }

    var playlistInfo = {
      url: 'https://api.spotify.com/v1/me/playlists',
      headers: { 'Authorization': 'Bearer ' + access_token },
      body: { "name": "New Playlist", "description": "New playlist description", "public": false },
      json: true,
    };

    request.post(playlistInfo, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
      } else {
        console.log(error);
      }
    });

  });

})

app.get('/login', async (req, res) => {
  var state = randomstring.generate(16);

  res.redirect('https://accounts.spotify.com/authorize?' +
    queryString.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: SCOPE,
      redirect_uri: REDIRECT_URI,
      state: state
    }));
});

app.get('/callback', async (req, res) => {
  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      queryString.stringify({
        error: 'state_mismatch'
      }));
  } else {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, async (error, response, body) => {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var personalOptions = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(personalOptions, async (error, response, body) => {
          USER_ID = body.id;
        });

        // Use the access token to access the Spotify Web API
        request.get(personalOptions, async (error, response, body) => {
          USER_ID = body.id;
          var data = JSON.stringify(body);
          fs.writeFileSync('data/user.json', data, (err) => {
            if (err) throw err;
          })
        });

        var tracksOptions = {
          url: 'https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(tracksOptions, async (error, response, body) => {
          var data = JSON.stringify(body.items);
          fs.writeFileSync('data/tracks.json', data, (err) => {
            if (err) throw err;
          })
        });

        var artitstsOptions = {
          url: 'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(artitstsOptions, async (error, response, body) => {
          for (let i in body.items) {
            localStorage.setItem(toString(i), body.items[i].name)
          };
          var data = JSON.stringify(body.items);
          fs.writeFileSync('data/artists.json', data, (err) => {
            if (err) throw err;
          })

        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          queryString.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));

      } else {
        res.redirect('/#' +
          queryString.stringify({
            error: 'invalid_token'
          }));
      }

    });
  }

});

// Refresh token

app.get('/refresh_token', async (req, res) => {
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, async (error, response, body) => {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
  res.redirect('/')
});

app.listen(3000, () => {
  console.log("server is runnig on port 3000...");
  console.log("Open your browser and hit url '192.168.0.178:3000'");
}); 