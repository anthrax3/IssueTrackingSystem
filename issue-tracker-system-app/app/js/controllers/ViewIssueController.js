'use strict';

app.controller('ViewIssueController',
    function($scope, $route, $location, $routeParams, authService, notifyService, issueService, commentService) {

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

        $scope.addIssueComment = function (comment) {
            commentService.addComment(comment, $routeParams.id,
                function success(data){
                    commentService.getCommentForIssueId(
                        $routeParams.id,
                        function success(data) {
                            $scope.issueComments = data;
                        }, function error(err) {
                            notifyService.showError("Failed loading data", err);
                        }
                    );
                    notifyService.showInfo("Successfully added comment")
                },
                function error(err){
                    notifyService.showError("Failed adding comment", err)
                }
            );
        };

        $scope.changeStatus = function(statusId){
            issueService.changeStatus($routeParams.id, statusId,
                function success(data){
                    $route.reload();
                    notifyService.showInfo("Status changed")
                },
                function error(err){
                    notifyService.showError("Failed changing status", err)
                }
            )
        };
    }
);

