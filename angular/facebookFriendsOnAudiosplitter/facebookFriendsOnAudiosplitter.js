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

        userRepository.getFacebookFriends().then(
            function success(response) {
                $scope.facebookFriends = response;
                console.log(response);
                $scope.facebookFriendsFound = true;
            },
            function error() {
                console.error("facebookFriendsOnAudiosplitterController: Error retrieving facebook friends.");
            }
        );

    };

}]);