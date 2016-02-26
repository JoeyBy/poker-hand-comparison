var path = require('path');
var express = require('express');
var http = require('http');

var app = express();
var staticPath = path.join(__dirname, '/static');

app.use(express.static(staticPath));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/static/poker-hand.html'));
});

app.listen(3000, function() {
  console.log("APP listening on port 3000")
});
