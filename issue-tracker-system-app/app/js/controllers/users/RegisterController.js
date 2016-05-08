'use strict';

app.controller('RegisterController',
    function ($scope, $location, authService, notifyService) {

        if (authService.isLoggedIn()) {
            $location.path('/')
        }
        
        $scope.userData = {};

        $scope.register = function(userData) {
            authService.register(userData,
                function success() {
                    notifyService.showInfo("User registered successfully");
                    $location.path("/");
                },
                function error(err) {
                    notifyService.showError("User registration failed", err);
                }
            );
        };
    }
);
