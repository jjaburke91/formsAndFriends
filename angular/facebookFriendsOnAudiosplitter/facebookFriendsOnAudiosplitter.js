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
                        scope.searchUser = userRepo.getActiveUser().username;
                    }
                }
            );
        }
    }
}]);

formsAndFriendsApp.controller("facebookFriendsOnAudiosplitterController", ["$scope", "userRepository", function($scope, userRepository) {
    $scope.searchUser = "";

    $scope.findFriends = function() {
        userRepository.getFacebookFriends($scope.searchUser).then(
            function success(response) {
                if (typeof response === undefined) {
                    console.error("facebookFriendsOnAudiosplitterController: Error retrieving facebook friends");
                } else {
                    $scope.facebookFriends = response;
                }
            },
            function error() {
                console.error("facebookFriendsOnAudiosplitterController: Error retrieving facebook friends.");
            }
        );

    };

}]);