const express = require('express');
const app = express();
const path = require('path');
const queryString = require('query-string');
const randomstring = require("randomstring");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const request = require('request');
const fs = require('fs');
const { debug } = require('console');
const router = express.Router();

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

// Variables used for authorization
const client_id = '26de0e4db2204b8fb4860589f4485263';
const redirect_uri = 'http://localhost:3000/callback';
const client_secret = '4e343703cfec4354a327cc82c1302fa4'; // Should be added to env. in the future
var user_id = '';

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.get('/top-artists', async(req, res) => {
  res.redirect('/top-artists')
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

        var tracksOptions = {
          url: 'https://api.spotify.com/v1/me/top/tracks',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(tracksOptions, async (error, response, body) => {
          for (let i in body.items) {
            console.log(body.items[i].name + " - " + body.items[i].artists[0].name);
            artists[body.items[i].name] = body.items[i].artists[0].name;
          };
          var data = JSON.stringify(body.items);
          fs.writeFileSync('data/tracks.json', data, (err) => {
            if (err) throw err;
          })
          
        });

        var artitstsOptions = {
          url: 'https://api.spotify.com/v1/me/top/artists',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
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

const artists = require('./data/artists.json');
app.get('/artists', async (req, res) => 
  res.status(200).json(artists)
)

app.listen(3000, () => {
  console.log("server is runnig on port 3000...");
  console.log("Open your browser and hit url 'localhost:3000'");
 }); 
