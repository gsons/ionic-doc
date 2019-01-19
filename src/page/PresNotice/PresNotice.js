app.controller("PresNoticeCtrl", function($ionicScrollDelegate, $scope, $localStorage, $sessionStorage,Api, $loading, $location) {
    function init() {
        $scope.doc = $localStorage.doctor;
        $scope.user = $localStorage.user;
        getPresUser();
    }
    $scope.doChat=function(vo){
          var item={};
          item['sender'] = vo.toUserName;
          item['nickname'] = vo.toUserName;
          item['headerUrl'] ='';
          item['accountId'] = vo.to;
          item['id'] = vo.toUserId;
          $sessionStorage.chatuser=item;
          $location.path('/app/chat');
    }
    //获取关注用户
    function getPresUser() {
        Api.post('webchat/chatmsg/getPresNoticeDocMsgList', { userId: $scope.user.id }, { content: '加载中...' }).then(function(data) {
            if (data.success) {
                $scope.userlist = data.roots;
            } else {
                Toast.show('获取回访列表失败,' + data.errorMessage);
            }
        });
    }
     init();
});