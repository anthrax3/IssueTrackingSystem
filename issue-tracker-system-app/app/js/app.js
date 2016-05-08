'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap.pagination']);

app.constant('baseServiceUrl', 'http://softuni-issue-tracker.azurewebsites.net/');
app.constant('pageSize', 5);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'app/templates/dashboard.html',
        controller: 'IssuesController'
    });

    $routeProvider.when('/login', {
        templateUrl: 'app/templates/users/login.html',
        controller: 'LoginController'
    });

    $routeProvider.when('/register', {
        templateUrl: 'app/templates/users/register.html',
        controller: 'RegisterController'
    });

    $routeProvider.when('/profile/password', {
        templateUrl: 'app/templates/users/change-password.html',
        controller: 'AppController'
    });

    $routeProvider.when('/admin', {
        templateUrl: 'app/templates/admin/admin-dashboard.html',
        controller: 'AdminController'
    });

    $routeProvider.when('/users/makeadmin', {
        templateUrl: 'app/templates/admin/make-admin.html',
        controller: 'AdminController'
    });

    $routeProvider.when('/projects', {
        templateUrl: 'app/templates/admin/view-all-projects.html',
        controller: 'ViewAllProjectsController'
    });

    $routeProvider.when('/projects/:id', {
        templateUrl: 'app/projects/templates/project-by-id.html',
        controller: 'ViewProjectController'
    });

    $routeProvider.when('/issues/:id', {
        templateUrl: 'app/templates/issues/issue-by-id.html',
        controller: 'ViewIssueController'
    });


    $routeProvider.otherwise({
        redirectTo: '/'
    });
});