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
                        scope.findFriends(userRepo.getActiveUser().username);
                    }
                }
            );
        }
    }
}]);

formsAndFriendsApp.controller("facebookFriendsOnAudiosplitterController", ["$scope", "userRepository", function($scope, userRepository) {
    $scope.facebookFriendsFound = false;

    $scope.findFriends = function(username) {
        userRepository.getFacebookFriends(username).then(
            function success(response) {
                if (typeof response === undefined) {
                    console.error("facebookFriendsOnAudiosplitterController: Error retrieving facebook friends");
                    return;
                }
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