formsAndFriendsApp.directive("facebookFriendsOnAudiosplitter", [ function() {
    return {
        restrict: 'E',
        require: 'ngModel',
        templateUrl: "/angular/facebookFriendsOnAudiosplitter/facebookFriendsOnAudiosplitter.html",
        controller: "facebookFriendsOnAudiosplitterController",
        link : function(scope, el, attrs, ngModel) {
            // Listens for update on ngModel and searches for available facebook friends when the activeUser is set to a value.
            scope.$watch(
                function () {
                    return ngModel.$modelValue;
                }, function(newValue) {
                    if (newValue != null) {
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