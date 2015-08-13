
formsAndFriendsApp = angular.module('formsAndFriendsApp', ['ui.router']);

formsAndFriendsApp.config( ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/', "/login");
    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "/angular/loginPage/loginPage.html",
            controller: "loginPageController"
        });

}]);