'use strict';

app.factory('userService',
    function ($http, baseServiceUrl, authService) {

        function getAllUsers(success, error) {
            var request = {
                method: 'GET',
                url: baseServiceUrl + 'users',
                headers: authService.getAuthHeaders()
            };

            $http(request).success(function (data) {
                success(data);

            }).error(error);
        }

        function makeAdmin(userData, success, error){
            var request = {
                method: 'PUT',
                url: baseServiceUrl + 'users/makeadmin',
                data: userData,
                headers: authService.getAuthHeaders()
            };

            $http(request).success(function(data){
                success(data);
            }).error(error)
        }

        return {
            getAllUsers: getAllUsers,
            makeAdmin: makeAdmin
        }
    }
);
