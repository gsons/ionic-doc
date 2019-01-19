app.controller("drlistCtrl", function(Api, $rootScope, $location, $ionicScrollDelegate, $loading, $scope, $sessionStorage, $localStorage,Toast) {
    //切换显示全部,在线,未回复
    $scope.toggleShow = function(item) {
        $scope.showItem = item;
        $sessionStorage.showItem = item;
        if (item == 1) getListAllUser();
        else if (item == 2) getListStarUser();
        else if (item == 3) getListOnlineUser();
        else if (item == 4) getListNoreadUser();
    }

    //获取所有用户
    function getListAllUser() {
        
        var doctor = $localStorage.doctor;
        var param= { recvid: doctor.studioId ,page:1,start:0,limit:1000};
        Api.post('webchat/chatmsg/getUserChatMsgByStudio', param,{content:'加载中...'}).then(function(data) {
            if (data.success) {
                $scope.list_user = data.roots;
                $ionicScrollDelegate.$getByHandle('drlist-scroll').scrollTop();
            } else {
                Toast.show('获取最近聊天好友失败');
            }
        });
    }

    //获取关注用户
    function getListStarUser() {
        var doctor = $localStorage.doctor;
        var param= { studioId: doctor.studioId ,page:1,start:0,limit:1000};
        Api.post('userfollower/user2studio/getUser2StudioList', param,{content:'加载中...'}).then(function(data) {
            if (data.success) {
                $scope.list_user = data.roots;
                for (var i in $scope.list_user) {
                    var item = $scope.list_user[i];
                    item['sender'] = item.userName;
                    item['nickname'] = item.userName;
                    item['headerUrl'] = item.headimgurl;
                    item['accountId'] = item.userAccount;
                    item['id'] = item.userId;
                }
                $ionicScrollDelegate.$getByHandle('drlist-scroll').scrollTop();
            } else {
                Toast.show('获取关注列表失败');
            }
        });
    }

    //获取在线用户
    function getListOnlineUser() {
        var doctor = $localStorage.doctor;
        Api.post('sys/user/getWxUserInfoOnline', { studioId: doctor.studioId },{content:'加载中...'}).then(function(data) {
            for (var i in data) {
                var item = data[i];
                item['sender'] = item.nickname;
            }
            $scope.list_user = data;
            $ionicScrollDelegate.$getByHandle('drlist-scroll').scrollTop();
        });
    }

    // 获取未读消息的用户
    function getListNoreadUser() {

        var doctor = $localStorage.doctor;
        var param= { recvid: doctor.studioId ,page:1,start:0,limit:1000};
        Api.post('webchat/chatmsg/getUserChatMsgByStudio', param,{content:'加载中...'}).then(function(data) {
            if (data.success) {
                var list_user_all = data.roots;
                var users = [];
                for (var i in list_user_all) {
                    if (list_user_all[i].nums > 0) {
                        users.push(list_user_all[i])
                    }
                }
                $scope.list_user = users;
                $ionicScrollDelegate.$getByHandle('drlist-scroll').scrollTop();
            } else {
                Toast.show('获取未读好友列表失败');
            }
        });
    }

    $scope.gochatByUser = function(user) {
        $sessionStorage.chatuser = user;
        $location.path("/app/chat");
    }

    $scope.swipe = function(offset) {
        var tmp = $scope.showItem + offset;
        if (tmp > 4) $scope.showItem = 1;
        else if (tmp < 1) $scope.showItem = 4;
        else $scope.showItem = tmp;
        $scope.toggleShow($scope.showItem);
    }

    function init() {
        $scope.showItem = $sessionStorage.showItem || 4;
        $scope.toggleShow($scope.showItem);
        $rootScope.getNotReadMessList();
    }
    init();
});