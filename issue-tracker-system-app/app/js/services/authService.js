'use strict';

app.factory('authService',
    function ($http, baseServiceUrl) {

        function getCurrentUser() {
            var userObject = localStorage['currentUser'];
            if (userObject) {

                return JSON.parse(userObject);
            }
        }

        function getAuthHeaders(){
            var headers = {};
            var currentUser = getCurrentUser();
            if (currentUser) {
                headers['Authorization'] = 'Bearer ' + currentUser.access_token;
            }

            return headers;
        }

        function isAnonymous(){
            return localStorage['currentUser'] == undefined;
        }

        function isLoggedIn(){
            return localStorage['currentUser'] != undefined;
        }

        function isAdmin() {
            var userObject = localStorage['currentUser'];
            if (userObject) {
                var parseUserObject = JSON.parse(userObject);

                return parseUserObject.isAdmin;
            }
        }

        function login(userData, success, error) {
            var request = {
                method: 'POST',
                url: baseServiceUrl + 'api/Token',
                data: "grant_type=password&username=" + userData.Email + "&password=" + userData.Password,
                headers: {
                    ContentType: "application/x-www-form-urlencoded"
                }
            };

            $http(request).success(function (userData) {
                var userInfoRequest = {
                    method: 'GET',
                    url: baseServiceUrl + 'users/me',
                    headers: {
                        Authorization: 'Bearer ' + userData.access_token
                    }
                };

                $http(userInfoRequest).success(function (data) {
                    userData.isAdmin = data.isAdmin;
                    localStorage['username'] = userData.userName;
                    localStorage['currentUser'] = JSON.stringify(userData);
                    success(data);

                }).error(error);

            }).error(error);
        }

        function register(userData, success, error){
            var request = {
                method: 'POST',
                url: baseServiceUrl + 'api/Account/Register',
                data: userData
            };

            $http(request).success(function (data) {
                login(userData, success, error);

            }).error(error);
        }

        function logout(success, error) {
            var request = {
                method: 'POST',
                url: baseServiceUrl + 'api/Account/Logout',
                headers: getAuthHeaders()
            };

            $http(request).success(function (data) {
                delete localStorage['currentUser'];
                delete localStorage['username'];
                success(data);
            }).error(error);
        }

        function changePassword(userData, success, error){
            var request = {
                method: 'POST',
                url: baseServiceUrl + 'api/Account/ChangePassword',
                data: userData,
                headers: getAuthHeaders()
            };

            $http(request).success(function (data) {
                success(data);
            }).error(error);
        }

        return {
            getCurrentUser : getCurrentUser,
            getAuthHeaders : getAuthHeaders,
            isAnonymous : isAnonymous,
            isLoggedIn : isLoggedIn,
            isAdmin : isAdmin,
            login: login,
            register: register,
            logout: logout,
            changePassword: changePassword
        }
    }
);
