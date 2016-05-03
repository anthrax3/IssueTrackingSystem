'use strict';

app.controller('AppController',
    function ($scope, authService) {
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
        }
    }
);
