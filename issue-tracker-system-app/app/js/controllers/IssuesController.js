'use strict';

app.controller('IssuesController',
    function($scope, $location, authService, issueService, notifyService, pageSize){
        $scope.issuesParams = {
            'startPage': 1,
            'pageSize': pageSize
        };

        $scope.getIssues = function () {
            if (authService.isLoggedIn()) {
                issueService.getUsersIssues(
                    $scope.issuesParams,
                    function success(data) {
                        $scope.issues = data.Issues;
                        $scope.allIssues = data.TotalPages * $scope.issuesParams.pageSize;
                    },
                    function error(err) {
                        notifyService.showError("Failed loading data...", err);
                    });
            }
        };

        $scope.getIssues();
    }
);