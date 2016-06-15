/**
 * Created by lixiang4u on 2016/5/29.
 */

angular.module('ngApp').controller('AppController', ['$scope', function ($scope) {

    var notepadBody = document.querySelector('#notepadBody');
    /**
     * 写数据到 localStorage
     */
    $scope.log = function () {
        localStorage['notepadContent'] = notepadBody.innerHTML;
    };

    $scope.init = function () {
        notepadBody.innerHTML = localStorage['notepadContent'];
    }

}]);