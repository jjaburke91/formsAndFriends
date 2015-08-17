
formsAndFriendsApp = angular.module('formsAndFriendsApp', ['ui.router']);

formsAndFriendsApp.config( ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/', "/login");
    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "/angular/loginPage/loginPage.html",
            controller: "loginPageController"
        });

}]);;formsAndFriendsApp.service("userRepository", ['$http', function($http) {
    var facebookFriendsUrl = "/api/find-user-facebook-friends";
    var createUserUrl = "/api/create-user";

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
                        return {
                            success: true
                        }
                    } else {
                        console.error(response.data.message || "userRepository: Error creating new user.");
                        return {
                            success: false,
                            message: response.data.message || "Error registering user, please check credentials."
                        };
                    }
                },
                function error(response) {
                    console.error("userRepository: Error posting new user to repository");
                    console.error(response);
                }
            );
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

}]);;formsAndFriendsApp.directive("facebookFriendsOnAudiosplitter", [ 'userRepository', function(userRepo) {
    return {
        restrict: 'E',
        templateUrl: "/angular/facebookFriendsOnAudiosplitter/facebookFriendsOnAudiosplitter.html",
        controller: "facebookFriendsOnAudiosplitterController",
        link : function(scope, el, attrs) {
            scope.$watch(
                function() {
                    return userRepo.getActiveUser().username;
                }, function() {
                    if (userRepo.getActiveUser().username != null) {
                        scope.searchUser = userRepo.getActiveUser().username;
                    }
                }
            );
        }
    }
}]);

formsAndFriendsApp.controller("facebookFriendsOnAudiosplitterController", ["$scope", "userRepository", function($scope, userRepository) {
    $scope.searchUser = "";

    $scope.findFriends = function() {
        userRepository.getFacebookFriends($scope.searchUser).then(
            function success(response) {
                if (typeof response === undefined) {
                    console.error("facebookFriendsOnAudiosplitterController: Error retrieving facebook friends");
                } else {
                    $scope.facebookFriends = response;
                }
            },
            function error() {
                console.error("facebookFriendsOnAudiosplitterController: Error retrieving facebook friends.");
            }
        );

    };

}]);;formsAndFriendsApp.controller("loginPageController", ["$scope", "userRepository", function($scope, userRepository) {
    $scope.registerFormActive = true;
    $scope.findFriendsActive = false;
    $scope.userRepo = userRepository;

    $scope.$watch('userRepo.getActiveUser().username', function() {
        if ($scope.userRepo.getActiveUser().username != null) {
            $scope.findFriendsActive = true;
            $scope.registerFormActive = false;
        }
    });

}]);;formsAndFriendsApp.directive("registrationForm", [ function() {
    return {
        restrict: 'E',
        scope : {}, // isolating directive scope
        templateUrl: "/angular/registrationForm/registrationForm.html",
        controller: "registrationFormController"
    }
}]);


formsAndFriendsApp.controller("registrationFormController", ["$scope", "userRepository", function($scope, userRepository) {
    $scope.newUser = {
        username : "",
        password : "",
        password_confirmation: ""
    };
    $scope.registrationError = "";

    $scope.passwordsMatch = function() {
        if ($scope.newUser.password && $scope.newUser.password_confirmation)
            return $scope.newUser.password === $scope.newUser.password_confirmation;
        else
            return false;
    };

    $scope.formSubmit = function(isValid) {
        // Deliberately validating again before posting.
        if (isValid && $scope.passwordsMatch() ) {
            userRepository.createUser($scope.newUser).then(
                function (response) {
                    if (response.success) {
                        $scope.registrationError = "";
                    } else {
                        $scope.registrationError = response.message;
                    }
                }
            );
        }
        else {
            console.error("registrationFormController: Form invalid.");
        }
    }

}]);