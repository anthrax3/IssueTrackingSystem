'use strict';

app.controller('ViewIssueController',
    function($scope, $location, $routeParams, authService, notifyService, issueService) {

        issueService.getIssueById(
            $routeParams.id,
            function success(data) {
                data.DueDate = new Date(data.DueDate);
                data.StringLabels = data.Labels;
                $scope.currentProject = data.Project;
                $scope.issueData = data;
                $scope.isAssignee = data.Assignee.Username === authService.getCurrentUser().userName;

            }, function error(err) {
                notifyService.showError("Failed loading data", err);
            }
        );
    }
);

