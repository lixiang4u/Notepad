/**
 * Created by lixiang4u on 2016/5/29.
 */

angular.module('ngApp').controller('UserController', ['$scope', '$rootScope', '$http', '$q', 'BmobUserService', function ($scope, $rootScope, $http, $q, BmobUserService) {

    //这是什么鬼？ 已经ocLazyLoad 了，为何还会出现一次依赖的服务为空，然后又加载了一次？
    $scope.firstRun = function () {
        if (BmobUserService && BmobUserService.hasOwnProperty('getCurrentUser')) {
            $rootScope.user.username = BmobUserService.getCurrentUser()['username'];
        }
    };

    $scope.firstRun();


    $scope.data = {
        user: {
            username: '',
            password: '',
            email: ''
        }
    };

    $scope.submitSign = function () {
        BmobUserService.userSign({
            username: $scope.data['user']['username'],
            password: $scope.data['user']['password'],
            email: $scope.data['user']['email']
        }).then(function (result) {
            $rootScope.modal.id = '';
            $rootScope.modal.title = '完成';
            $rootScope.modal.isModalOkShow = false;
            $rootScope.modal.msg = '请点击继续。';
        }, function (error) {
            $rootScope.modal.id = '';
            $rootScope.modal.title = '未完成';
            $rootScope.modal.isModalOkShow = false;
            $rootScope.modal.msg = error['message'];
        }, function (progress) {
            //$scope.progress = progress;
            //$scope.show = false;
        });
        $rootScope.user.username = $scope.data['user']['username'];
        $('#myModal').modal({keyboard: true});
    };


    $scope.submitLogin = function () {
        BmobUserService.userLogin({
            username: $scope.data['user']['username'],
            password: $scope.data['user']['password']
        }).then(function (result) {
            $rootScope.modal.id = '';
            $rootScope.modal.title = '完成';
            $rootScope.modal.isModalOkShow = false;
            $rootScope.modal.msg = '登陆完成，请点击继续。';
        }, function (error) {
            $rootScope.modal.id = '';
            $rootScope.modal.title = '未完成';
            $rootScope.modal.isModalOkShow = false;
            $rootScope.modal.msg = error['message'];
        }, function (progress) {
            //$scope.progress = progress;
            //$scope.show = false;
        });
        $rootScope.user.username = $scope.data['user']['username'];
        $('#myModal').modal({keyboard: true});
    };

    $scope.submitLogout = function () {
        delete localStorage['notepadContent'];
        Bmob.User.logOut();
        location.href = "#/";
    };


}]);