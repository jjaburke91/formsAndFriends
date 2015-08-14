formsAndFriendsApp.directive("facebookFriendsOnAudiosplitter", [ 'userRepository', function(userRepo) {
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
                        scope.findFriends();
                    }
                }
            );
        }
    }
}]);

formsAndFriendsApp.controller("facebookFriendsOnAudiosplitterController", ["$scope", "userRepository", function($scope, userRepository) {
    $scope.facebookFriendsFound = false;

    $scope.findFriends = function() {
        userRepository.getFacebookFriends().then(
            function success(response) {
                if (response.length > 0) {
                    $scope.facebookFriends = response;
                    $scope.facebookFriendsFound = true;
                }
            },
            function error() {
                console.error("facebookFriendsOnAudiosplitterController: Error retrieving facebook friends.");
            }
        );

    };

}]);