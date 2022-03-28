const express = require('express');
const app = express();
const path = require('path');
const queryString = require('query-string');
const randomstring = require("randomstring");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const request = require('request');

// Variables used for authorization
const client_id = '26de0e4db2204b8fb4860589f4485263';
const redirect_uri = 'http://localhost:3000/callback';
const client_secret = '4e343703cfec4354a327cc82c1302fa4'; // Should be added to env. in the future
const stateKey = 'spotify_auth_state';

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  console.log("Opening main page...")
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.get('/login', function(req, res) {
  console.log("Opening login page...")
  var state = randomstring.generate(16);
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    queryString.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

// Get callback

app.get('/callback', function(req, res) {
  console.log("Open callback...")
  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    console.log("State is null...")
    res.redirect('/#' +
      queryString.stringify({
        error: 'state_mismatch'
      }));
  } else {
    console.log("State is not null...")
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

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(response);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          queryString.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
            display_name: body.display_name
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

app.get('/refresh_token', function(req, res) {
  console.log("Open refresh token...")
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

  request.post(authOptions, function(error, response, body) {
    //console.log(body)
    console.log(response.statusCode)
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
    console.log("Open your browser and hit url 'localhost:3000'");
 }); 
