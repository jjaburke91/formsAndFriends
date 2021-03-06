var express = require('express');
var app = express();
var validator = require('validator');
var request = require('request');

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

/** Database Connections **/
var useDatabase = true; // Make this falsy to ignore all database operations. Useful for testing sometimes.

if (useDatabase) {
    var mysql = require('mysql');
    var connection = mysql.createConnection( {
        host: 'localhost',
        user: 'aSplitterAdmin',
        password: 'rubbishpassword',
        database: 'audiosplitter'
    });

    connection.connect( function(err) {
        if (!err) {
            console.log("Database successfully connected.");
        } else {
            console.error("Error connecting to database.");
        }
    });
}



/**
 * Binary searches across allUsers and returns a list of those users which within facebookFriends.
 * Matching is based on a facebookId property.
 *
 * Returns empty array when none around found.
 *
 * @param allUsers : List of all Audiosplitter users
 * @param facebookFriends : List of all a user's facebook friends
 * @returns {Array} : List of all facebook friends of whom are Audiosplitter users
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

/**
 * User object, representing an Audiosplitter user.
 * @param username : username (e-mail)
 * @param password
 */
var User = function(username, password) {
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
 * JSON structure of every response given to front-end
 * @param success : Boolean signifiying if required operation was successfull or not.
 * @param message : String message describing success or failure.
 * @param content : field to store response content.
 */
var ResponseMessage = function(success, message, content) {
    this.success = success && true; // defaults to false
    this.message = message;
    this.content = content ;
};





/** API End-Points **/

/**
 * Requires username parameter in get request.
 *
 * Returns array of 'username's facebook friends of whom are registered to audiosplitter
 */
app.get('/api/find-user-facebook-friends', function(req, res) {
    // These URLs will need changed to whichever server you have configured for PHP.
    var facebookAPIUrl = "http://localhost/api/facebookFriends.php";
    var audioSplitterUsersURL = "http://localhost/api/allUsers.php";

    if (req.query.username == null) {
        res.sendStatus(400); // Send BAD REQUEST response when required fields aren't given
    }

    var allUsers, facebookFriends, registeredFacebookFriends;
    // Request audiosplitter users first
    request(audioSplitterUsersURL, function(err, response, body) {
        allUsers = JSON.parse(body);

        // On response, request facebook friends
        request(facebookAPIUrl + "?username=" + req.query.username, function(err, response, body) {
            facebookFriends = JSON.parse(body);

            // On this final response, find which friends are registered and give result to client.
            registeredFacebookFriends = getRegisteredFacebookFriends(allUsers, facebookFriends);
            res.send( new ResponseMessage(
                true,
                "",
                registeredFacebookFriends
            ));
        })
    });

});

/**
 * Expects JSON of user containing fields:
 * * username
 * * password
 * * password_confirmation
 *
 * Returns Json object of user.
 */
app.post('/api/create-user', jsonParser, function(req, res) {
    if (!req.body) {
        res.sendStatus(404);
        return;
    }

    // Validating user information server-side.
    if ( validator.isEmail(req.body.username) &&
            req.body.username.length > 5 &&
            req.body.password.length <= 50 &&
            req.body.password.length > 7 &&
            req.body.password.length < 15 &&
            req.body.password === req.body.password_confirmation
        ) {
        var newUser = new User(req.body.username, req.body.password);

        if (useDatabase) {
            connection.query("INSERT INTO user " +
                "(username, password)" +
                "VALUES" +
                "(\"" + newUser.username + "\",\"" + newUser.password + "\")"
                , function(err, result) {
                    if (!err) {
                        console.log("User '" + newUser.username + "' created.");
                        res.send( new ResponseMessage(
                            true,
                            "User successfully created.",
                            newUser.getPublicUser()
                        ));
                    } else {
                        console.error("Error inserting new user to database.");
                        console.error(err);

                        // Errno 1062 is a "Duplicate Entry" error.
                        if (err.errno == 1062) {
                            res.send( new ResponseMessage(false, "Username already in use."));
                        } else {
                            res.send( new ResponseMessage(false, "Error creating User."));
                        }

                    }
                });
        } else {
            res.send( new ResponseMessage(
                true,
                "User successfully created.",
                newUser.getPublicUser()
            ));
        }


    } else {
        res.send( new ResponseMessage(
            false,
            "User credentials failed validation."
        ));
    }


});
