/**
 * lixiang4u
 */

angular.module('ngApp').directive('tplFooter', ['$rootScope', function ($rootScope) {
    return {
        //restrict: 'AE',
        //scope: {
        //    name: "@"
        //},
        controller: function ($scope) {
            $scope.modal = $rootScope.modal;
        },
        templateUrl: 'views/partials/bs-modal.html'
    };
}]);