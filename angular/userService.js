formsAndFriendsApp.service("userRepository", ['$http', function($http) {
    var that = this;
    var facebookFriendsUrl = "/api/find-user-facebook-friends";
    var createUserUrl = "/api/create-user";
    var loginUserUrl = "/api/user-login";

    var activeUser = {
        username: null
    };

    var messages = {
        success: "User registered successfully.",
        error: "Error registering user"
    };

    return {
        createUser: function(newUser) {
            return $http.post(createUserUrl, newUser).then(
                function success(response) {
                    console.log(response.data);
                    activeUser = response.data;
                    return activeUser;
                },
                function error(response) {
                    console.error("userRepository: Error posting new user to repository");
                    console.error(response);
                    return messages.error;
                }
            );
        },
        loginUser: function(loginUser) {
            return $http.post(loginUserUrl, loginUser).then(
                function success(response) {
                    activeUser = response.data;
                    console.log("new active user:");
                    console.log(activeUser);
                    return activeUser;
                },
                function error(response) {
                    console.error("userRepository: Error trying to login user to repository");
                }
            )
        },
        getActiveUser: function() {
            return activeUser;
        },
        // REMOVE FOLLOWING FUNCTION
        setActiveUser: function(newActiveUser) {
            activeUser.username = newActiveUser;
        },

        getFacebookFriends: function(userEmail) {
            return $http.get(facebookFriendsUrl + "?username=" + userEmail).then(
                function success(response) {
                    return response.data;
                },
                function error() {
                    console.error("userRepository: Error getting facebook friends for " + userEmail + ".");
                }
            );
        }
    }

}]);