formsAndFriendsApp.directive("facebookFriendsOnAudiosplitter", [ function() {
    return {
        restrict: 'E',
        templateUrl: "/angular/facebookFriendsOnAudiosplitter/facebookFriendsOnAudiosplitter.html",
        controller: "facebookFriendsOnAudiosplitterController",
        link : function(scope, el, attrs) {
            // Listens for update on ngModel and searches for available facebook friends when activeUser is set.
            scope.$watch(attrs.ngModel, function(v) {
                if (scope.activeUser != null) {
                    scope.findFriends();
                }
            });

        }
    }
}]);

formsAndFriendsApp.controller("facebookFriendsOnAudiosplitterController", ["$scope", "userRepository", function($scope, userRepository) {
    $scope.facebookFriendsFound = false;

    $scope.findFriends = function() {
        userRepository.getAudiosplitterUsers().then(
            function success (response) {
                $scope.users = response;
            },
            function error() {
                console.error("facebookFriendsOnAudiosplitterController: Error retrieving Audiosplitter users.");
            });

        userRepository.getFacebookFriends().then(
            function success(response) {
                $scope.facebookFriends = response;
            },
            function error() {
                console.error("facebookFriendsOnAudiosplitterController: Error retrieving facebook friends.");
            }
        );

        $scope.facebookFriendsFound = true;
    };

}]);