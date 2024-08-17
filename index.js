// index.js
// where your node app starts

require('dotenv').config();
var express = require('express');
var app = express();
var cors = require('cors');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// serve static files
app.use(express.static('public'));

// base route to serve the index.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint to return the IP address, language, and software information
app.get('/api/whoami', function (req, res) {
  const ipaddress = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];

  const responseObject = {
    ipaddress: ipaddress,
    language: language,
    software: software
  };

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(responseObject, null, 2)); // Format JSON with 2 spaces for indentation
});

// listen for requests
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
