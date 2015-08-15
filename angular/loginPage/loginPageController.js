formsAndFriendsApp.controller("loginPageController", ["$scope", "userRepository", function($scope, userRepository) {
    $scope.registerFormActive = true;
    $scope.findFriendsActive = false;
    $scope.userRepo = userRepository;

    $scope.$watch('userRepo.getActiveUser().username', function() {
        if ($scope.userRepo.getActiveUser().username != null) {
            $scope.findFriendsActive = true;
            $scope.registerFormActive = false;
        }
    });

}]);