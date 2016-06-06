/**
 * lixiang4u
 */

angular.module('ngApp').directive('tplModal', function () {
    return {
        restrict: 'A',
        //replace: true,
        //template: '<div style="background-color: #00AA88;">Header{{model.name}}</div>'
        templateUrl: 'views/frame/header.html'
    };
});