/**
 * lixiang4u
 * 注入数据到 $rootScope
 */

angular.module('ngApp').controller('WelcomeController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $rootScope.pageTitle = 'Hello world!';
}]);