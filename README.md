# formsAndFriends

Here's my solution to the task you gave me. Hopefully this displays to you my knowledge of Angular, Javascript, CSS, HTML, MySQL and an understanding of both back-end and front-end programming.

## Comments On Implementation

### Form Error Handling
On a larger project, I would likely export all form error messages to a service of some sort so that there is a central location for storing and editing all error messages.

### Passwords

Currently the only password constraints are on length, however I know that on production systems there would need to be checks for capital and numeric values. I would likely create a custom directive for handling and validating more complex constraints.

Also on a production environment; the password would not be stored in a database as a raw string value. My experience of hashing within databases is limited, however I'm familiar with the concept and it's desirability for password fields.

### Server-Side Retrieval Of Facebook Friends

From reading the task I got the impression it was desired to have our client-side code query for all Audiosplitter users and facebook friends, however I find this work-flow to be slightly inefficient.

Given we'll be searching across those data values, I think it makes sense to have the faster server-side to do all the processing, and instead have our client-side query our server-side code to get the result of the search. The client-side is burdened with minimal processing.

## Build

The project was built in an environment using Bower, NPM, Grunt, LESS and Node JS.

With Node JS & Bower installed installed, run:

```
npm install

grunt build

node node-app.js
```
This will build most of the necessary dependencies and run the server at http://localhost:3000. Happy to give an explanation as to what's going on in the grunt tasks if you wish. I frequently re-use tasks *wiredep* and *concat*, both save me a lot of time messing about with imports and / or concatenating files.

Branch "*prod_build*" contains all the files required to execute the application if you don't wish to go through the build processes.

### PHP

I have a PHP server running locally only to serve up the PHP files, the URLs of which are defined in `node-app.js` in the variables `facebookAPIUrl` and `audioSplitterUsersURL`. **These URLs will need to be set appopriately on deployment.**

### Node JS

The idea of running two servers for run a single web application is poor but because I was given the chance to write the back-end code in Javascript, I chose to use it as I feel more confident and proficient with it.

### MySQL

Successfully registered users are written to a MySQL database, the connection of which is configured in `node-app.js`. The schema of the database is as follows:

```
mysql> DESCRIBE user;
+----------+--------------+------+-----+---------+-------+
| Field    | Type         | Null | Key | Default | Extra |
+----------+--------------+------+-----+---------+-------+
| username | varchar(254) | NO   | PRI | NULL    |       |
| password | varchar(64)  | NO   |     | NULL    |       |
+----------+--------------+------+-----+---------+-------+
2 rows in set (0.00 sec)
```

**NOTE**, there is a boolean variable in `node-app.js` called `useDatabase`, you can set this to value false if you want the server to skip any database operations. I thought this might ease deployment and examination.
