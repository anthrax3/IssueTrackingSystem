'use strict';

app.controller('ViewIssueController',
    function($scope, $location, $routeParams, authService, notifyService, issueService, commentService) {

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

        commentService.getCommentForIssueId(
            $routeParams.id,
            function success(data) {
                $scope.issueComments = data;
            }, function error(err) {
                notifyService.showError('Failed loading data', err);
            }
        );
    }
);

