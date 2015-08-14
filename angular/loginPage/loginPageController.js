formsAndFriendsApp.controller("loginPageController", ["$scope", "userRepository",  function($scope, userRepo) {
    $scope.activeUser = userRepo.getActiveUser();
    $scope.userRepo = userRepo;

}]);