formsAndFriendsApp.service("userRepository", ['$http', function($http) {
    var allUsersUrl = "/data/allUsers.json";
    var facebookFriendsUrl = "/data/facebookFriends.json";
    var activeUser = {
        username: null
    };

    var messages = {
        success: "User registered successfully.",
        error: "Error registering user"
    };

    return {
        createUser: function(newUser) {
            return $http.post("", newUser).then(
                function success(response) {
                    console.log(response);
                    this.setActiveUser(newUser);
                    return messages.success;
                },
                function error(response) {
                    console.error("userRepository: Error post new user to respository");
                    console.error(response);
                    return messages.error;
                }
            );
        },
        getActiveUser: function() {
            return activeUser;
        },
        setActiveUser: function(newActiveUser) {
            activeUser.username = newActiveUser;
        },

        getAudiosplitterUsers: function() {
            return $http.get(allUsersUrl).then(
                function success(response) {
                    return response.data;
                },
                function error() {
                    console.error("userRepository: Error getting Audiosplitter users.");
                }
            );
        },

        // I pass in the user email for sake of a more realistic use-case.
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