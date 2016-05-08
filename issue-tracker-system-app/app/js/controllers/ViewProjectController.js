'use strict';

app.controller('ViewProjectController',
    function ($scope, $routeParams, $location, projectService, notifyService, pageSize, authService) {

        projectService.getProjectById(
            $routeParams.id,
            function success(data) {
                $scope.projectData = data;
                $scope.isProjectLeader = authService.getCurrentUser() === data.Lead.Username;
                $scope.isAssignee = authService.getCurrentUser() === issueData.Assignee.Username;
            },
            function error(err) {
                notifyService.showError("Failed loading data", err);
            });

        projectService.getProjectIssues(
            $routeParams.id,
            function success(data){
                $scope.projectIssues = data;
            },
            function error(err){
                notifyService.showError('Failed loading data', err)
            }
        )
    }
);