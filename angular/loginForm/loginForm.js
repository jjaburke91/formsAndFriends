formsAndFriendsApp.directive("loginForm", [ function() {
    return {
        restrict: 'E',
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
            userRepository.userLogin($scope.loginUser);
        }

    }

}]);