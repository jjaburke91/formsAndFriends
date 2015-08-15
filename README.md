# formsAndFriends

## To-Do
* ~~Registration Form.~~
* ~~Run PHP files and have Angular retrieve content.~~ Using Node server-side
* Create MySQL DB.
* Service or otherwise for writing to DB.
* ~~Get facebook friends search exported to server-side.~~
* Set up PHP environment.
* Ensure only 1 error message is displayed at a time on a form.

## Comments

* Don't usually do any styling early on. Usually wait till content and functionality is complete.
* Form error messages should be kept in a library somewhere as opposed to scattered across HTML.
* Password constraints
* Bad request on username unavailable on facebook friend request
* email validators client and server side aren't same. Client accepts "jamie@jamie", server doesn't.
* Update PHP file URLs on build / deployment.
* Password hashing in Database would be required on a live website.

## Build

### Node JS

~~Using JSON files instead of PHP.~~

### MYSQL Schema

mysql> DESCRIBE user;
+----------+--------------+------+-----+---------+-------+
| Field    | Type         | Null | Key | Default | Extra |
+----------+--------------+------+-----+---------+-------+
| username | varchar(254) | NO   | PRI | NULL    |       |
| password | varchar(64)  | NO   |     | NULL    |       |
+----------+--------------+------+-----+---------+-------+
2 rows in set (0.00 sec)

