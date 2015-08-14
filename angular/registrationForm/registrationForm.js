formsAndFriendsApp.directive("registrationForm", [ function() {
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

    $scope.passwordContainsNumber = function() {
        return $scope.newUser.password.match(/\d+/g);
    };

    $scope.passwordsMatch = function() {
        return $scope.newUser.password === $scope.newUser.password_confirmation;
    };

    $scope.formSubmit = function(isValid) {
        // Deliberately validating again before post.
        if (isValid && $scope.passwordsMatch() && $scope.passwordContainsNumber() ) {
            userRepository.createUser($scope.newUser);
        }
        else {
            console.error("registrationFormController: Form invalid.");
        }
    }

}]);