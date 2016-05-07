'use strict';

app.controller('AppController',
    function ($scope, $location, authService, notifyService) {

        if (authService.isAnonymous()) {
            $location.path('/')
        }
        
        $scope.authService = authService;

        $scope.logout = function(){
            authService.logout(
                function success(){
                    notifyService.showInfo("Logout successful");
                    $location.path('/');
                },
                function error(err){
                    notifyService.showInfo("Logout failed", err);
                }
            )
        };

        $scope.changePassword = function(userData) {
            authService.changePassword(
                userData,
                function success() {
                    notifyService.showInfo("Password changed successfully");
                    $location.path("/");
                },
                function error(err) {
                    notifyService.showError("Password changing failed", err);
                }
            );
        }
    }
);
