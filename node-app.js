var express = require('express');
var app = express();
var fs = require('fs'); // Library to read from filesystem
var validator = require('validator');

var bodyParser = require('body-parser'); // adds ease to reading http post bodies.
var jsonParser = bodyParser.json();

app.use("/", express.static(__dirname + '/')); // Allows Angular to handle routing.
app.get('/', function (req, res) {
    res.sendfile('index.html');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});






/** Back-End Code. Above is boiler-plate server setup. **/

// Use this object to encapsulate all my variables, removing them from Javascript's global scope.
var globalScope = {};


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

/**
 * Expects parameter username.
 *
 * Returns JSON array containing all 'usernames' facebook friends who are registered to audiosplitter.
 */
app.get('/api/find-user-facebook-friends', function(req, res) {

    if (req.query.username == null || req.query.username == "") {
        res.sendStatus(400); // Send 400 BAD REQUEST response when required fields aren't given
    }

    // Would now give username to facebook API to retrieve friends.

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


/** User Management **/

/**
 * User object, representing an Audiosplitter user.
 * @param username username (e-mail)
 * @param password
 */
globalScope.User = function(username, password) {
    this.username = username;
    this.password = password;

    // Following function returns the contents of User to share with front-end.
    //  I don't want the password to be visible in the front-end, so don't include.
    this.getPublicUser = function() {
        return {
            username: this.username
        };
    }
};

/**
 * Expects JSON of a user containing fields:
 * * username
 * * password
 * * password_confirmation
 *
 * Returns User object.
 */
app.post('/api/create-user', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(404);
    }

    // Validating user information server-side.
    if ( validator.isEmail(req.body.username) &&
            req.body.username.length > 5 &&
            req.body.password.length <= 50 &&
            req.body.password.length > 7 &&
            req.body.password.length < 15 &&
            req.body.password === req.body.password_confirmation
        ) {
        var newUser = new globalScope.User(req.body.username, req.body.password);
    }

    // write to db

    console.log("User '" + newUser.username + "' created.");
    res.send(newUser.getPublicUser());
});

/**
 * Expects JSON of a user containing fields:
 * * username
 * * password
 *
 * Returns User object.
 */
app.post('/api/user-login', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(404);
    }

    // Search and retrieve user from database

    var loggedInUser = new globalScope.User(req.body.username, req.body.password);

    res.send(loggedInUser.getPublicUser());

});