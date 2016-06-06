/**
 * lixiang4u
 * 注入数据到 $rootScope
 */

angular.module('ngApp').controller('HelloController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $rootScope.pageTitle = 'Hello world!';
    $scope.pageTitle = 'Hello world!';

    $scope.getHello = function () {
        console.log('[HEY BOY!]');
    };

}]);