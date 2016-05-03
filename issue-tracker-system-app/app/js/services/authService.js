'use strict';

app.factory('authService',
    function ($http, baseServiceUrl) {

        function getCurrentUser() {
            var userObject = sessionStorage['currentUser'];
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
            return sessionStorage['currentUser'] == undefined;
        }

        function isLoggedIn(){
            return sessionStorage['currentUser'] != undefined;
        }

        function isAdmin() {
            var userObject = sessionStorage['currentUser'];
            if (userObject) {
                var parseUserObject = JSON.parse(userObject);

                return parseUserObject.isAdmin;
            }
        }

        function login(userData, success, error) {
            var request = {
                method: 'POST',
                url: baseServiceUrl + 'api/Token',
                data: "grant_type=password&username=" + userData.username + "&password=" + userData.password,
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
                    sessionStorage['username'] = userData.userName;
                    sessionStorage['currentUser'] = JSON.stringify(userData);
                    success(data);

                }).error(error);

            }).error(error);
        }

        function logout(success, error) {
            var request = {
                method: 'POST',
                url: baseServiceUrl + 'api/Account/Logout',
                headers: getAuthHeaders()
            };

            $http(request).success(function (data) {
                delete sessionStorage['currentUser'];
                delete sessionStorage['username'];
                success(data);
            }).error(error);
        }

        return {
            login: login,

            register: function(userData, success, error) {
                // TODO
            },

            logout: logout,

            getCurrentUser : getCurrentUser,

            isAnonymous : isAnonymous,

            isLoggedIn : isLoggedIn,

            isNormalUser : function() {
                // TODO
            },

            isAdmin : isAdmin,

            getAuthHeaders : getAuthHeaders,

            changePassword: function(){
                // TODO
            }
        }
    }
);
