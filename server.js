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
const artists = require('./data/artists.json');

// Variables used for authorization
const client_id = '26de0e4db2204b8fb4860589f4485263';
const redirect_uri = 'http://192.168.0.178:3000/callback';
const client_secret = '4e343703cfec4354a327cc82c1302fa4'; // Should be added to env. in the future

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

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.get("/lyrics", async (req, res) => {
  const { artist, track } = req.query
  const lyrics = (await lyricsFinder(artist, track)) || "No Lyrics Found"
  res.json({ lyrics })
})

app.get('/login', async (req, res) => {
  var state = randomstring.generate(16);
  var scope = 'user-read-private user-read-email user-library-read user-top-read';

  res.redirect('https://accounts.spotify.com/authorize?' +
    queryString.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
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
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
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

        // Use the access token to access the Spotify Web API
        request.get(personalOptions, async (error, response, body) => {
          user_id = body.id;
          var data = JSON.stringify(body);
          fs.writeFileSync('data/user.json', data, (err) => {
            if (err) throw err;
          })
        });

        var tracksOptions = {
          url: 'https://api.spotify.com/v1/me/top/tracks',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // Get tracks data
        request.get(tracksOptions, async (error, response, body) => {
          var data = JSON.stringify(body.items);
          fs.writeFileSync('data/tracks.json', data, (err) => {
            if (err) throw err;
          })

        });

        // Get artists data
        var artitstsOptions = {
          url: 'https://api.spotify.com/v1/me/top/artists',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        request.get(artitstsOptions, async (error, response, body) => {
          var data = JSON.stringify(body.items);
          fs.writeFileSync('data/artists.json', data, (err) => {
            if (err) throw err;
          })

        });
      }
    });
  }

});

// Refresh token
app.get('/refresh_token', async (req, res) => {
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')) },
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
