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