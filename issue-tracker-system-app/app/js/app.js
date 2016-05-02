'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource']);

app.constant('baseServiceUrl', 'http://softuni-issue-tracker.azurewebsites.net');
app.constant('pageSize', 2);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'app/templates/home.html',
        controller: 'IssuesController'
    });

    $routeProvider.when('/login', {
        templateUrl: 'app/templates/login.html',
        controller: 'LoginController'
    });

    $routeProvider.when('/register', {
        templateUrl: 'app/templates/register.html',
        controller: 'RegisterController'
    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });
});