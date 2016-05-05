'use strict';

app.controller('AdminController',
    function ($scope, $location, userService, authService, notifyService) {

        $scope.showAllUsers = function() {
            userService.getAllUsers(
                function success(data) {
                    $scope.users = data;
                },
                function error(err) {
                    notifyService.showError("Failed loading data...", err);
                });
        };
    }
);
