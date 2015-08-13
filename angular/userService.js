formsAndFriendsApp.service("userRepository", ['$http', function($http) {
    var messages = {
        success: "User registered successfully.",
        error: "Error registering user"
    };


    return {
        createUser: function(newUser) {
            return $http.post("", newUser).then(
                function success(response) {
                    console.log(response);
                    return messages.success;
                },
                function error(response) {
                    console.error("userRepository: Error post new user to respository");
                    console.error(response);
                    return messages.error;
                }
            )

        }
    }


}]);