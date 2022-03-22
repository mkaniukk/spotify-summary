const express = require('express');
const app = express();
const path = require('path');
const queryString = require('query-string');
const randomstring = require("randomstring");

// Variables used for authorization
const client_id = '26de0e4db2204b8fb4860589f4485263';
const redirect_uri = 'http://localhost:3000/callback';
const client_secret = '4e343703cfec4354a327cc82c1302fa4'; // Should be added to env. in the future

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  console.log("Opening main page...")
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.get('/login', function(req, res) {
  console.log("Opening login page...")
  var state = randomstring.generate(16);
  var scope = 'user-read-private user-read-email user-read-playback-position user-top-read user-read-recently-played';
  
  res.redirect('https://accounts.spotify.com/authorize?' +
    queryString.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/authorize', function(req, res){
    console.log("Authorization...")
    res.get()
})

// Get callback

app.get('/callback', function(req, res) {
  console.log("Open callback...")
  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    console.log("State is null...")
    res.redirect('/#' +
      querystring.stringify({
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
    res.redirect('/')
    console.log(authOptions)
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
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

app.listen(3000, () => {
    console.log("server is runnig on port 3000...");
    console.log("Open your browser and hit url 'localhost:3000'");
 }); 

//var request = require('request'); // "Request" library

// // your application requests authorization
// var authOptions = {
//   url: 'https://accounts.spotify.com/api/token',
//   headers: {
//     'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//   },
//   form: {
//     grant_type: 'client_credentials'
//   },
//   json: true
// };

// request.post(authOptions, function(error, response, body) {
//   if (!error && response.statusCode === 200) {

//     // use the access token to access the Spotify Web API
//     var token = body.access_token;
//     var options = {
//       url: 'https://api.spotify.com/v1/users/jmperezperez',
//       headers: {
//         'Authorization': 'Bearer ' + token
//       },
//       json: true
//     };
//     request.get(options, function(error, response, body) {
//       console.log(body);
//     });
//   }
// });