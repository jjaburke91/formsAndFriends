formsAndFriendsApp.service("userRepository", ['$http', function($http) {
    var facebookFriendsUrl = "/api/find-user-facebook-friends";
    var createUserUrl = "/api/create-user";
    var loginUserUrl = "/api/user-login";

    var activeUser = {
        username: null
    };

    return {
        createUser: function(newUser) {
            return $http.post(createUserUrl, newUser).then(
                function success(response) {
                    console.log(response);

                    if (response.data.success) {
                        angular.copy(response.data.content, activeUser); // CONFIRM WHY THIS IS NEEDED
                        return activeUser;
                    } else {
                        console.error(response.data.message || "userRepository: Error creating new user.");
                        if (response.data.message) {
                            return response.data.message;
                        }
                    }

                },
                function error(response) {
                    console.error("userRepository: Error posting new user to repository");
                    console.error(response);
                }
            );
        },
        loginUser: function(loginUser) {
            return $http.post(loginUserUrl, loginUser).then(
                function success(response) {
                    if (response.data.success) {
                        angular.copy(response.data.content, activeUser); // CONFIRM WHY THIS IS NEEDED
                        return activeUser;
                    }
                },
                function error() {
                    console.error("userRepository: Error trying to login user to repository");
                }
            )
        },
        getActiveUser: function() {
            return activeUser;
        },

        getFacebookFriends: function(userEmail) {
            return $http.get(facebookFriendsUrl + "?username=" + userEmail).then(
                function success(response) {
                    if (response.data.success) {
                        return response.data.content;
                    } else {
                        console.error(response.data.message || "userRepository: Error finding facebook friends.");
                    }
                },
                function error() {
                    console.error("userRepository: Error getting facebook friends for " + userEmail + ".");
                }
            );
        }
    }

}]);