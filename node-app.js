var express = require('express');
var app = express();

app.use("/", express.static(__dirname + '/'));

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

/* API End-Points */

app.get('/api/users', function(req, res) {
   res.sendFile(__dirname + '/data/allUsers.json');
});

app.get('/api/facebook-friends', function(req, res) {
   res.sendFile(__dirname + '/data/facebookFriends.json');
});

