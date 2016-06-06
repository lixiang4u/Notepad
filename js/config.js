/**
 * lixiang4u
 */

angular.module('ngApp').config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/editor');
    //$locationProvider.hashPrefix('!');

    $stateProvider.state('editor', {
        url: '/editor',
        templateUrl: 'views/partials/editor.html',
        controller: 'EditorController',
        resolve: {
            EditorController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/EditorController.js')
            }],

            BmobEditorService: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/services/BmobEditorService.js')
            }],
            BmobUserService: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/services/BmobUserService.js')
            }],

            tplModal: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/directives/tplModal.js')
            }]

        }
    }).state('editor/:objId', {
        url: '/editor/:objId',
        templateUrl: 'views/partials/editor.html',
        controller: 'EditorController',
        resolve: {
            EditorController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/EditorController.js')
            }],

            BmobEditorService: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/services/BmobEditorService.js')
            }],
            BmobUserService: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/services/BmobUserService.js')
            }],

            tplModal: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/directives/tplModal.js')
            }]

        }
    }).state('shelf', {
        url: '/shelf',
        templateUrl: 'views/partials/shelf.html',
        controller: 'EditorController',
        resolve: {
            EditorController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/EditorController.js')
            }]
        }
    }).state('welcome', {
        url: '/welcome',
        templateUrl: 'views/user/index.html'
    }).state('help', {
        url: '/help',
        templateUrl: 'views/partials/help.html'
    }).state('profile', {
        url: '/profile',
        templateUrl: 'views/user/profile.html',
        controller: 'UserController',
        resolve: {
            UserController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/UserController.js')
            }],
            BmobUserService: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/services/BmobUserService.js')
            }],
            tplModal: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/directives/tplModal.js')
            }]
        }
    }).state('sign', {
        url: '/sign',
        templateUrl: 'views/user/sign.html',
        controller: 'UserController',
        resolve: {
            UserController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/UserController.js')
            }],
            BmobUserService: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/services/BmobUserService.js')
            }],
            tplModal: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/directives/tplModal.js')
            }]
        }
    }).state('logout', {
        url: '/logout',
        templateUrl: 'views/user/logout.html',
        controller: 'UserController',
        resolve: {
            UserController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/UserController.js')
            }],
            BmobUserService: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/services/BmobUserService.js')
            }],
            tplModal: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/directives/tplModal.js')
            }]
        }
    }).state('login', {
        url: '/login',
        templateUrl: 'views/user/login.html',
        controller: 'UserController',
        resolve: {
            UserController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/UserController.js')
            }],
            BmobUserService: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/services/BmobUserService.js')
            }],
            tplModal: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/directives/tplModal.js')
            }]
        }
    }).state('hello', {
        url: '/hello',
        templateUrl: 'views/hello/index.html',
        controller: 'HelloController',
        resolve: {
            HelloController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/HelloController.js')
            }]
        }
    }).state('note/list', {
        url: '/note/list',
        templateUrl: 'views/note/note-list.html',
        controller: 'EditorController',
        resolve: {
            EditorController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/EditorController.js')
            }],

            BmobEditorService: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/services/BmobEditorService.js')
            }],
            BmobUserService: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/services/BmobUserService.js')
            }],

            tplModal: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/directives/tplModal.js')
            }]
        }
    }).state('note/list/:page', {
        url: '/note/list/:page',
        templateUrl: 'views/note/note-list.html',
        controller: 'EditorController',
        resolve: {
            EditorController: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/controllers/EditorController.js')
            }],

            BmobEditorService: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/services/BmobEditorService.js')
            }],
            BmobUserService: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/services/BmobUserService.js')
            }],

            tplModal: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load('js/directives/tplModal.js')
            }]
        }
    });

}]);


ngApp.run(function ($rootScope) {
    $rootScope.pageTitle = 'ngApp';

    $rootScope.modal = {
        id: 0,
        title: 'Tips',
        isModalOkShow: true,
        msg: 'Nothing.'
    };
    $rootScope.user = {
        id: 0,
        username: ''
    };


});

