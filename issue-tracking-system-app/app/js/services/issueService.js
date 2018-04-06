'use strict';

app.factory('issueService',
    function ($http, baseServiceUrl, authService) {

        function getUsersIssues(params, success, error) {
            var request = {
                method: 'GET',
                url: baseServiceUrl + 'issues/me?orderBy=DueDate desc, IssueKey&pageSize=' + params.pageSize + '&pageNumber=' + params.startPage,
                headers: authService.getAuthHeaders()
            };

            $http(request).success(function (data) {
                success(data);

            }).error(error);
        }

        function getIssueById(id, success, error) {
            var request = {
                method: 'GET',
                url: baseServiceUrl + 'issues/' + id,
                headers: authService.getAuthHeaders()
            };

            $http(request).success(function(data) {
                success(data);

            }).error(error);
        }

        function changeStatus(issueId, statusId, success, error){
            var request = {
                method: 'PUT',
                url: baseServiceUrl + 'issues/' + issueId + '/changestatus?statusid=' + statusId,
                headers: authService.getAuthHeaders()
            };

            $http(request).success(function (data) {
                success(data);

            }).error(error);
        }

        return {
            getUsersIssues: getUsersIssues,
            getIssueById: getIssueById,
            changeStatus: changeStatus
        }
    }
);
