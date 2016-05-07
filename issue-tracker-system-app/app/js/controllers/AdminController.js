'use strict';

app.controller('AdminController',
    function ($scope, $location, userService, authService, notifyService) {

        if (!authService.isAdmin()) {
            $location.path('/')
        }
        
        $scope.showAllUsers = function() {
            userService.getAllUsers(
                function success(data) {
                    $scope.users = data;
                },
                function error(err) {
                    notifyService.showError("Failed loading data...", err);
                });
        };

        $scope.makeAdmin = function (id) {
            var userData = {
                userId: id
            };

            userService.makeAdmin(
                userData,
                function success(data) {
                    $scope.showAllUsers();
                    notifyService.showInfo("Make Admin Successful!");
                },
                function error(err) {
                    notifyService.showError("Failed making Admin!", err);
                });
        };

    }
);
