'use strict';

app.controller('ViewAllProjectsController',
    function ($scope, $routeParams, $location, projectService, notifyService, authService) {

        if (authService.isAnonymous()) {
            $location.path('/')
        }
        
        if (!authService.isAdmin()) {
            $location.path('/')
        }

        projectService.getAllProjects(
            function success(data) {
                $scope.allProjects = data;
            },
            function error(err) {
                notifyService.showError("Failed loading data", err);
            }
        );
    }
);