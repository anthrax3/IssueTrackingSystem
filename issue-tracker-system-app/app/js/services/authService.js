'use strict';

app.factory('authService',
    function ($http, baseServiceUrl) {

        function getCurrentUser() {
            var userObject = sessionStorage['currentUser'];
            if (userObject) {
                var parseUserObject = JSON.parse(userObject);
                return parseUserObject.userName;
            }
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

        return {
            login: login,

            register: function(userData, success, error) {
                // TODO
            },

            logout: function() {
                // TODO
            },

            getCurrentUser : getCurrentUser,

            isAnonymous : function() {
                // TODO
            },

            isLoggedIn : function() {
                // TODO
            },

            isNormalUser : function() {
                // TODO
            },

            isAdmin : isAdmin,

            getAuthHeaders : function() {
                // TODO
            },

            changePassword: function(){
                // TODO
            }
        }
    }
);
