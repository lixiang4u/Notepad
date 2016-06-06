/**
 * lixiang4u
 */

//用于存放一些全局数据
angular.module('ngApp').factory('BmobEditorService', ['$http', '$q', function ($http, $q) {
    //初始化数据存取
    Bmob.initialize("e66999eb25e74e7d01db56d6a5234c7f", "df05804622fa050f69cdd7547d65e06b", '');
    var NgNote = Bmob.Object.extend("NgNote");

    var saveNote = function (data) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var progress;
        var ngNote = new NgNote();
        // 添加数据，第一个入口参数是Json数据
        ngNote.save({
            uid: data['uid'],
            title: data['title'],
            content: data['content']
        }, {
            success: function (ngNote) {
                console.log('[ngNote]', ngNote);
                // 添加成功
                deferred.resolve(ngNote);
            }, error: function (ngNote, error) {
                console.log('[E ngNote]', ngNote, error);
                // 添加失败
                deferred.reject(error);
            }
        });
        return promise;
    };

    var updateNote = function (objId, data) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var progress;
        var query = new Bmob.Query(NgNote);
        // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
        query.get(objId, {
            success: function (ngNote) {
                // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
                ngNote.set('title', data['title']);
                ngNote.set('content', data['content']);
                ngNote.save();

                // The object was retrieved successfully.
                deferred.resolve(ngNote);
            },
            error: function (object, error) {
                deferred.reject(error);
            }
        });
        return promise;
    };

    var findNote = function (objId) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var progress;
        //创建查询对象，入口参数是对象类的实例
        var query = new Bmob.Query(NgNote);
        //查询单条数据，第一个参数是这条数据的objectId值
        query.get(objId, {
            success: function (ngNote) {
                // 查询成功，调用get方法获取对应属性的值
                deferred.resolve(ngNote);
            },
            error: function (object, error) {
                // 查询失败
                deferred.reject(error);
            }
        });
        return promise;
    };

    var findLastNote = function (objUid) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var progress;
        var query = new Bmob.Query(NgNote);
        query.equalTo("uid", objUid);
        // 对score字段升序排列
        query.descending('updatedAt');
        // 返回最多1条数据
        query.limit(1);
        // 查询所有数据
        query.find({
            success: function (ngNotes) {
                var ngNote = null;
                if (ngNotes.length > 0) {
                    ngNote = ngNotes[0];
                }
                deferred.resolve(ngNote);
            },
            error: function (error) {
                //alert("查询失败: " + error.code + " " + error.message);
                deferred.reject(error);
            }
        });
        return promise;
    };

    var getNoteListByUserDesc = function (offset, limit, objUid) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var progress;
        var query = new Bmob.Query(NgNote);
        query.equalTo("uid", objUid);
        // 对score字段升序排列
        query.descending('createdAt');
        query.skip(offset); // skip the first 10 results
        // 返回最多1条数据
        query.limit(limit);
        // 查询所有数据
        query.find({
            success: function (ngNotes) {
                deferred.resolve(ngNotes);
            },
            error: function (error) {
                //alert("查询失败: " + error.code + " " + error.message);
                deferred.reject(error);
            }
        });
        return promise;
    };

    var delNote = function (objId) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var progress;
        //创建查询对象，入口参数是对象类的实例
        var query = new Bmob.Query(NgNote);
        query.get(objId, {
            success: function (object) {
                // The object was retrieved successfully.
                object.destroy({
                    success: function (deleteObject) {
                        //alert("delete success");
                        deferred.resolve(deleteObject);
                    },
                    error: function (deleteObject, error) {
                        //alert("delete fail");
                        deferred.reject(error);
                    }
                });
            },
            error: function (object, error) {
                //alert("query object fail");
                deferred.reject(error);
            }
        });
        return promise;
    };

    return {
        saveNote: saveNote,
        updateNote: updateNote,
        findNote: findNote,
        findLastNote: findLastNote,
        getNoteListByUserDesc: getNoteListByUserDesc,
        delNote: delNote
    };
}]);