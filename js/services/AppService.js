/**
 * lixiang4u
 */

//用于存放一些全局数据
angular.module('ngApp').factory('AppService', ['$http', '$rootScope', function ($http, $rootScope) {
    //缓存xxx
    return {
        init: function () {
            console.log('ngApp is running.');
        }
    };
}]);