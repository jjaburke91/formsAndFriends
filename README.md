# formsAndFriends

## To-Do
* ~~Registration Form.~~
* ~~Run PHP files and have Angular retrieve content.~~
* ~~Create MySQL DB.~~
* ~~Service or otherwise for writing to DB.~~
* ~~Get facebook friends search exported to server-side.~~
* ~~Set up PHP environment.~~
* ~~Ensure only 1 error message is displayed at a time on a form.~~
* Get error message passing organised
* ~~Displayed registration error~~
* ~~Feedback on successful registration.~~
* ~~Re-arrange facebook friend search - it's not a login page!~~
* Get login / registtration page names and route consistent.

## Comments

* Don't usually do any styling early on. Usually wait till content and functionality is complete.
* Form error messages should be kept in a library somewhere as opposed to scattered across HTML. **ngMessages looks ideal.**
* Password constraints
* Bad request on username unavailable on facebook friend request
* email validators client and server side aren't same. Client accepts "jamie@jamie", server doesn't.
* Update PHP file URLs on build / deployment.
* Password hashing in Database would be required on a live website.
* Decent method of handling error messages from server - quite messy just now.
* useDatabase variable
* Keeping track of ActiveUser.
* Talk about back-end making requests to the APIs and not front-end, why this is a better work-flow.

## Build

### Node JS

~~Using JSON files instead of PHP.~~

### MYSQL
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
