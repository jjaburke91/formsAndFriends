formsAndFriendsApp.directive("loginForm", [ function() {
    return {
        restrict: 'E',
        scope : {}, // isolating directive scope
        templateUrl: "/angular/loginForm/loginForm.html",
        controller: "loginFormController"
    }
}]);


formsAndFriendsApp.controller("loginFormController", ["$scope", "userRepository", function($scope, userRepository) {
    $scope.loginUser = {
        username: "",
        password: ""
    };

    $scope.formSubmit = function(valid) {
        if (valid) {
            userRepository.loginUser($scope.loginUser);
        }

    }

}]);