'use strict';

app.factory('commentService',
    function($http, baseServiceUrl, authService) {

        function getCommentForIssueId(issueId, success, error) {
            var request = {
                method: 'GET',
                url: baseServiceUrl + 'issues/' + issueId + '/comments',
                headers: authService.getAuthHeaders()
            };

            $http(request).success(function(data) {
                success(data);

            }).error(error);
        }

        return {
            getCommentForIssueId: getCommentForIssueId
        }
    }
);
