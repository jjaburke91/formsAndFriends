var express = require('express');
var app = express();
var fs = require('fs'); // Library to read from filesystem

var bodyParser = require('body-parser'); // adds ease to reading http post bodies.
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false }); // TO REMOVE: need this?

app.use("/", express.static(__dirname + '/')); // Allows Angular to handle routing.
app.get('/', function (req, res) {
    res.sendfile('index.html');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


/**
 * Binary searches across allUsers and returns a list of those users which within facebookFriends.
 * Matching is based on a facebookId property.
 *
 * Returns empty array when none around found.
 *
 * NOTE: This could be made recursive.
 *
 * @param allUsers List of all Audiosplitter users
 * @param facebookFriends List of all a user's facebook friends
 * @returns {Array} List of all facebook friends of whom are Audiosplitter users
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


/* API End-Points */

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

app.post('/api/create-user', function(req, res) {
    console.log(req.body);


});

app.post('/api/user-login', jsonParser, function(req, res) {
    if (!req.body)
        return res.sendStatus(404);

    // Set user object and return it

    console.log(req.body);

    res.send(req.body);

});

