'use strict';

app.controller('ViewAllProjectsController',
    function ($scope, $routeParams, $location, projectService, notifyService, pageSize) {

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