/**
 * Created by lixiang4u on 2016/5/29.
 */

angular.module('ngApp').controller('EditorController', ['$scope', '$rootScope', '$http', 'BmobUserService', 'BmobEditorService', '$sce', '$stateParams', '$q', function ($scope, $rootScope, $http, BmobUserService, BmobEditorService, $sce, $stateParams, $q) {

    var pageSize = 10;
    var notepadBody = document.querySelector('#notepadBody');

    $scope.data = {
        //缓存note列表使用，在list页面
        noteList: [],
        currentPage: 1
    };

    $scope.hiddenToolbar = true;
    $scope.objId = 0;//保存当前编辑的 objId，0 表示尚未持久化页面中的数据

    //这是什么鬼？ 已经ocLazyLoad 了，为何还会出现一次依赖的服务为空，然后又加载了一次？
    $scope.firstRun = function () {
        if (BmobUserService && BmobUserService.hasOwnProperty('getCurrentUser')) {
            $rootScope.user.username = BmobUserService.getCurrentUser()['username'];
        }
    };

    $scope.firstRun();


    /**
     * 写数据到 localStorage
     */
    $scope.log = function () {
        localStorage['notepadContent'] = notepadBody.innerHTML;
    };

    $scope.initEditorContent = function () {
        $scope.objId = $stateParams.objId;
        if ($scope.objId) {
            //去数据库找
            BmobEditorService.findNote($scope.objId).then(function (result) {
                notepadBody.innerHTML = result.get('content');
                localStorage['notepadContent'] = result.get('content');
            }, function (error) {
                notepadBody.innerHTML = error['message'];
            }, function (progress) {
                //$scope.progress = progress;
                //$scope.show = false;
            });
        } else {
            $scope.getSomething();
        }
    };

    $scope.getSomething = function () {
        $http.get('http://zyfree.acman.cn/').then(function ($response) {
            if ($response && $response.hasOwnProperty('data')) {
                notepadBody.innerHTML = '<i class="fa fa-quote-left" aria-hidden="true"></i> ' + $response['data']['zhaiyan'] + ' <i class="fa fa-quote-right" aria-hidden="true"></i> -- ' + ($response['data']['show'] ? $response['data']['show'] + '  ' : '') + "" + $response['data']['source'];
            } else {
                notepadBody.innerHTML = '<i class="fa fa-quote-left" aria-hidden="true"></i> 还有什么值得我们再去探问！ <i class="fa fa-quote-right" aria-hidden="true"></i> -- 曾经相爱那么深';
            }
        }, function ($response) {
            console.log('[Get default Juzi error]', $response);
            notepadBody.innerHTML = '<i class="fa fa-quote-left" aria-hidden="true"></i> 还有什么值得我们再去探问！ <i class="fa fa-quote-right" aria-hidden="true"></i> -- 曾经相爱那么深';
        });
    };

    $scope.fillLastEdit = function ($objUid) {
        //findLastNote
        BmobEditorService.findLastNote($objUid).then(function (ngNote) {
            if (ngNote) {
                notepadBody.innerHTML = ngNote.get('content');
                localStorage['notepadId'] = ngNote.id;
                localStorage['notepadContent'] = ngNote.get('content');
                $scope.objId = ngNote.id;
            }
        }, function (error) {
            notepadBody.innerHTML = error['message'];
        }, function (progress) {
            //$scope.progress = progress;
            //$scope.show = false;
        });
    };

    $scope.submitSaveEdit = function () {
        //$scope.submitTransEdit();
    };

    //TODO xxxxxx
    //清楚 $scope.objId 值，
    //持久化当前数据
    //清除 objId
    //清除 localStorage 相关 editor 数据

    //TODO xxxxx
    //默认有用户就去看 objId，没有值就假设加载最近一次服务端数据。
    //避免刷新页面后再提交数据就有问题，或者在 localStorage 中缓存 objId


    $scope.submitTransEdit = function () {
        //检查是否有登陆
        //登陆则将此条数据进行保存
        //获取保存后的 objId ，作为分享链接

        //先查找 objId 是否存在，
        //存在则分享，
        //  分享后，查看用户是否登陆
        //  登陆则上传数据
        //  不登录则提示可能需要登陆
        //不存在 objId 则提示登陆
        var href = location.href;
        var currentUser = BmobUserService ? BmobUserService.getCurrentUser() : [];
        if ($scope.objId) {
            if (currentUser['id'] && currentUser['username']) {
                //使用 objUid，objId 持久化数据
                BmobEditorService.updateNote($scope.objId, {
                    //title: (new Date()),
                    content: notepadBody.innerHTML
                }).then(function (result) {
                    $rootScope.modal.id = '';
                    $rootScope.modal.title = '完成';
                    $rootScope.modal.isModalOkShow = false;

                    href = $scope.getHref() + '#/editor/' + $scope.objId;
                    $rootScope.modal.msg = '请点击继续。<a target="_blank" href="' + href + '">' + href + '</a>';
                }, function (error) {
                    $rootScope.modal.id = '';
                    $rootScope.modal.title = '未完成';
                    $rootScope.modal.isModalOkShow = false;
                    $rootScope.modal.msg = error['message'];
                }, function (progress) {
                    //$scope.progress = progress;
                    //$scope.show = false;
                });
            } else {
                //不提示，可能是已经被分享的内容，这样没登陆用户也可以再分享
                $rootScope.modal.id = '';
                $rootScope.modal.title = '完成';
                $rootScope.modal.isModalOkShow = false;

                href = $scope.getHref() + '#/editor/' + $scope.objId;
                $rootScope.modal.msg = '请点击继续。<a target="_blank" href="' + href + '">' + href + '</a>';
            }
        } else {
            //可能是用户新增的 Note ，也可能是，无用户，新增的 Note
            if (currentUser['id'] && currentUser['username']) {
                //登陆用户新增
                BmobEditorService.saveNote({
                    uid: currentUser['id'],
                    title: (new Date()),
                    content: notepadBody.innerHTML
                }).then(function (result) {
                    //设置当前全局的 objId 值，使下次提交动作为update。
                    $scope.objId = result.id;

                    $rootScope.modal.id = '';
                    $rootScope.modal.title = '完成';
                    $rootScope.modal.isModalOkShow = false;

                    href = $scope.getHref() + '#/editor/' + $scope.objId;
                    $rootScope.modal.msg = '请点击继续。<a target="_blank" href="' + href + '">' + href + '</a>';
                }, function (error) {
                    $rootScope.modal.id = '';
                    $rootScope.modal.title = '未完成';
                    $rootScope.modal.isModalOkShow = false;
                    $rootScope.modal.msg = error['message'];
                }, function (progress) {
                    //$scope.progress = progress;
                    //$scope.show = false;
                });
            } else {
                //未登录用户新增，需要登录并持久化数据才能分享
                $rootScope.modal.id = '';
                $rootScope.modal.title = '未完成';
                $rootScope.modal.isModalOkShow = false;
                $rootScope.modal.msg = '请登陆后再分享！';
            }
            //SAVE
        }
        $('#myModal').modal({keyboard: true});

    };

    $scope.getHref = function () {
        var href = location.href;
        var tmpArr = href.split('#');
        if (tmpArr.length > 1) {
            href = tmpArr[0];
        }
        return href;
    };

    $scope.initEditorList = function () {
        var flag = true;
        var page = 1;
        var offset = 0;//查询跳过的条目数
        var objUid = 0;
        if ($stateParams && $stateParams.hasOwnProperty('page')) {
            page = parseInt($stateParams.page);
            offset = (page - 1) * pageSize;
            $scope.data.currentPage = page;
        }

        //获取用户信息
        if (BmobUserService && BmobUserService.hasOwnProperty('getCurrentUser')) {
            objUid = BmobUserService.getCurrentUser()['id'];
        } else {
            //提示登陆用户
            //或者展现空列表
            flag = false;
        }

        if (flag) {
            BmobEditorService.getNoteListByUserDesc(offset, pageSize, objUid).then(function (ngNotes) {
                var tmpNoteList = [], content, object;
                for (var i = 0; i < ngNotes.length; i++) {
                    object = ngNotes[i];
                    content = object.get('content');
                    content = content.replace(/script/g, 's_c_r_i_p_t');
                    content = content.replace(/frame/g, 'f_r_a_m_e');
                    content = content.replace(/http/g, 'h_t_t_p');
                    content = content.replace(/eval/g, 'e_v_a_l');
                    tmpNoteList.push({
                        objectId: object.id,
                        content: object.get('content'),
                        title: object.get('title'),
                        uid: object.get('uid'),
                        createdAt: object.createdAt,
                        updatedAt: object.updatedAt
                    });
                }
                $scope.data.noteList = tmpNoteList;
            }, function (error) {
                notepadBody.innerHTML = error['message'];
            }, function (progress) {
                //$scope.progress = progress;
                //$scope.show = false;
            });
        }
    };

    $scope.removeNoteConfirm = function (id) {
        //提示是否删除
        $rootScope.modal.id = id;
        $rootScope.modal.title = '未完成';
        $rootScope.modal.isModalOkShow = true;
        $rootScope.modal.msg = '请确认是否需要删除该项？';
        $('#myModal').modal({keyboard: true});

    };

    $scope.modalOk = function () {
        //删删删！！！
        //提示删完了。
        //如果删除成功，去列表中删除该项，让界面更新
        //否则提示尚未删除
        if ($rootScope.modal.id) {
            BmobEditorService.delNote($rootScope.modal.id).then(function (ngNote) {
                $scope.data.noteList = $scope.removeItem('objectId', $rootScope.modal.id, $scope.data.noteList);
                $rootScope.modal.id = '';
                $rootScope.modal.title = '完成';
                $rootScope.modal.isModalOkShow = false;
                $rootScope.modal.msg = '已删除！';
                //notepadBody.innerHTML = ngNote.get('content');
            }, function (error) {
                //notepadBody.innerHTML = error['message'];
                $rootScope.modal.id = '';
                $rootScope.modal.title = '未完成';
                $rootScope.modal.isModalOkShow = false;
                $rootScope.modal.msg = '删除失败！';
            }, function (progress) {
                //$scope.progress = progress;
                //$scope.show = false;
            });
        } else {
            $rootScope.modal.id = '';
            $rootScope.modal.title = '未完成';
            $rootScope.modal.isModalOkShow = false;
            $rootScope.modal.msg = '请选择要删除的项！';
        }
        $('#myModal').modal({keyboard: true});
    };

    $scope.removeItem = function (itemKey, itemVal, itemList) {
        var tmpList = [];
        if (itemList instanceof Array) {
            for (var i = 0; i < itemList.length; i++) {
                //data.noteList
                if (itemList[i][itemKey] == itemVal) {
                    //delete  itemList[i];
                } else {
                    tmpList.push(itemList[i]);
                }
            }
        }
        return tmpList;
    };

    $scope.turnPageSearch = function (isNext) {
        var page = 1;
        if ($stateParams && $stateParams.hasOwnProperty('page')) {
            page = parseInt($stateParams.page);
        }
        //根据当前页面有没有数据，page 值是否小于 1 等情况，计算新 page 的值
        if (isNext) {
            if ($scope.data.noteList.length) {
                page = page + 1;
            }
        } else {
            page = page > 1 ? (page - 1) : 1;
        }
        location.href = '#/note/list/' + page;
    };

    $scope.submitCreateNewNoteSession = function () {
        $scope.objId = null;
        $rootScope.modal.id = '';
        $rootScope.modal.title = '完成';
        $rootScope.modal.isModalOkShow = false;
        $rootScope.modal.msg = '新建记事会话完成！';
        $('#myModal').modal({keyboard: true});
    };


}]);