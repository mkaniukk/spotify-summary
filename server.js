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

// app.get('/top-artists', async (req, res) => {
//   res.status(200).json(artists).catch(err => { // error handling logic 1
//     console.error(err) // logging error
//     res.status(500).send(err)
//   })
// })

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
const client_id = '26de0e4db2204b8fb4860589f4485263';
const redirect_uri = 'http://192.168.0.178:3000/callback';
const client_secret = process.env.SPOTIFY_SECRET;
var user_id = '';

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.get("/lyrics", async (req, res) => {
  const { artist, track } = req.query
  const lyrics = (await lyricsFinder(artist, track)) || "No Lyrics Found"
  res.json({ lyrics })
})

app.get('/login', async(req, res) => {
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

        // use the access token to access the Spotify Web API
        request.get(personalOptions, async (error, response, body) => {
          user_id = body.id;
        });

        // Use the access token to access the Spotify Web API
        request.get(personalOptions, async (error, response, body) => {
          user_id = body.id;
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
          
          // for (let i in body.items) {
          //   console.log(body.items[i].name + " - " + body.items[i].artists[0].name);
          //   artists[body.items[i].name] = body.items[i].artists[0].name;
          // };
          
          var data = JSON.stringify(body.items);
          fs.writeFileSync('data/tracks.json', data, (err) => {
            if (err) throw err;
          })
          
        });

        var artitstsOptions = {
          url: 'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term',
          headers: { 'Authorization': 'Bearer ' + access_token},
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