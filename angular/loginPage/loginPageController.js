formsAndFriendsApp.controller("loginPageController", ["$scope", function($scope) {
    $scope.activeUser = null;

    $scope.setActiveUser = function() {
        $scope.activeUser = "jamie@jamie.com";
    };


}]);