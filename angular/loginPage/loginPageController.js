formsAndFriendsApp.controller("loginPageController", ["$scope", "userRepository",  function($scope, userRepo) {
    $scope.registerFormActive = true;
    $scope.loginFormActive = false;

    $scope.activeUser = userRepo.getActiveUser();
    $scope.userRepo = userRepo;

}]);