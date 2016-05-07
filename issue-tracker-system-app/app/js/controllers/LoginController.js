'use strict';

app.controller('LoginController',
    function ($scope, $route, $location, authService, notifyService) {

        if (authService.isLoggedIn()) {
            $location.path('/')
        }

        $scope.login = function(userData) {
            authService.login(userData,
                function success() {
                    notifyService.showInfo("Login successful");
                    $location.path("/");
                    $route.reload();
                },
                function error(err) {
                    notifyService.showError("Login failed", err);
                }
            );
        };
    }
);