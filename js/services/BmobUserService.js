/**
 * lixiang4u
 */

//用于存放一些全局数据
angular.module('ngApp').factory('BmobUserService', ['$http', '$q', function ($http, $q) {
    //初始化数据存取
    Bmob.initialize("e66999eb25e74e7d01db56d6a5234c7f", "df05804622fa050f69cdd7547d65e06b", '');
    var NgNote = Bmob.Object.extend("NgNote");

    var userSign = function (data) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var progress;
        var user = new Bmob.User();
        user.set("username", data['username']);
        user.set("password", data['password']);
        user.signUp(null, {
            success: function (user) {
                // Hooray! Let them use the app now.
                deferred.resolve(user);
            },
            error: function (user, error) {
                // Show the error message somewhere and let the user try again.
                deferred.reject(error);
            }
        });
        return promise;
    };

    var userLogin = function (data) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var progress;
        Bmob.User.logIn(data['username'], data['password'], {
            success: function (user) {
                // Do stuff after successful login.
                console.log('[Login Success]', user);
                deferred.resolve(user);
            },
            error: function (user, error) {
                console.log('[Login Error]', user, error);
                // The login failed. Check error to see why.
                deferred.reject(error);
            }
        });

        return promise;
    };

    var passwordReset = function (email) {
        Bmob.User.requestPasswordReset(email, {
            success: function () {
                // Password reset request was sent successfully
            },
            error: function (error) {
                // Show the error message somewhere
                alert("Error: " + error.code + " " + error.message);
            }
        });
    };

    var getCurrentUser = function () {
        var currentUser = Bmob.User.current();
        var returnUser = {
            id: 0,
            username: ''
        };
        if (currentUser) {
            returnUser = {
                id: currentUser.id,
                username: currentUser.attributes.username
            };
        }
        return returnUser;
    };

    return {
        userSign: userSign,
        userLogin: userLogin,
        getCurrentUser: getCurrentUser
    };
}]);