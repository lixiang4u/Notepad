/**
 * lixiang4u
 */

angular.module('ngApp').directive('tplFooter', function () {
    return {
        restrict: 'AE',
        controller: function ($scope) {
            $scope.pageFooter = '***pageFooter @2016***';
        },
        templateUrl: 'views/frame/footer.html'
    };
});