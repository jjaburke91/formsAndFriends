var express = require('express');
var app = express();
var fs = require('fs');

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

app.get('/api/find-user-facebook-friends', function(req, res) {

    // All users array is already sorted
    var allUsers = JSON.parse(
        fs.readFileSync(__dirname + '/data/allUsers.json', 'utf8')
    );

    // Facebook friends array is NOT sorted.
    var facebookFriends = JSON.parse(
        fs.readFileSync(__dirname + '/data/facebookFriends.json', 'utf8')
    );

    var registeredFacebookFriends = getRegisteredFacebookFriends(allUsers, facebookFriends);

    res.send(registeredFacebookFriends);

});

/**
 * Binary searches across allUsers and returns a list of those users which are in facebookFriends.
 * Comparison is based on a facebookId property.
 *
 * Returns empty array when none around found.
 *
 * NOTE: This could be made recursive.
 *
 * @param allUsers
 * @param facebookFriends
 * @returns {Array}
 */
var getRegisteredFacebookFriends = function(allUsers, facebookFriends) {
    var foundFriends = [];
    var leftIndex, rightIndex, midIndex;

    for (var i=0 ; i < facebookFriends.length; i++) {

        leftIndex = 0;
        rightIndex = allUsers.length - 1;
        midIndex = Math.floor(rightIndex/2);

        while (midIndex >= leftIndex && midIndex <= rightIndex) {

            if (allUsers[midIndex].facebookId == facebookFriends[i].facebookId) {
                foundFriends.push(allUsers[midIndex]);
                break;
            } else if (facebookFriends[i].facebookId < allUsers[midIndex].facebookId) {
                rightIndex = midIndex - 1;
                midIndex = Math.floor((leftIndex + rightIndex) / 2);
            } else if (facebookFriends[i].facebookId > allUsers[midIndex].facebookId) {
                leftIndex = midIndex + 1;
                midIndex = Math.floor((leftIndex + rightIndex) / 2);
            }

        }
    }
    return foundFriends;
};