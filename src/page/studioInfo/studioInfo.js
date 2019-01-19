app.controller("studioInfoCtrl", function($rootScope, $location, $ionicScrollDelegate,WAP_CONFIG, $scope, Api, $sessionStorage, $localStorage,$ionicPopup,Toast,$state,$confirm) {
    function init() {
        $scope.studio = $localStorage.studioList[0];
        $scope.doctor = $localStorage.doctor;
        $scope.avatarurl = 'http://image.tcmtrust.cn/' + $scope.doctor.path;
        $scope.firstdiagnosis= $scope.studio.firstdiagnosis;
        $scope.treatmentfee = $scope.studio.treatmentfee;
        initShare();
    }

    $scope.saveStudio = function() {
        var popup = $ionicPopup.show({
            templateUrl: "templates/zhenJinModal.html",
            title: '修改诊金',
            subTitle: '',
            scope: $scope,
            buttons: [{
                text: '取消',
                type: 'button-assertive',
            }, {
                text: '确定',
                type: 'button-positive',
                onTap: function(e) { return 1; }
            }, ]
        });
        popup.then(function(res) {
            if (res) {
                var param = {
                    id: $scope.studio.id,
                    code: $scope.studio.code,
                    name: $scope.studio.name,
                    firstdiagnosis: $scope.firstdiagnosis,
                    treatmentfee:  $scope.treatmentfee,
                    status: 1
                };
                Api.post('doctors/studio/saveStudio', param, { content: "处理中..." }).then(function(data) {
                    if (data.success) {
                        Toast.show('保存成功!')
                         getStudioList();
                    } else {
                        Toast.show('保存失败!' + data.errorMessage);
                    }
                })
            }
        })
    }

        //获取工作室列表
    function getStudioList() {
        Api.get('doctors/studio/getStudioList').then(function(data) {
            if (data.success) {
                $localStorage.studioList = data.list;
                $state.reload();
            } else {
                Toast.show('获取工作室信息失败,' + data.errorMessage, 'error');
            }
        });
    }
    $scope.shareStudio = function () { 
        Toast.show('请点击右上角菜单,将工作室发送给朋友或分享到朋友圈!');
    }

    function initShare() { 
        var url = window.location.href;
        var path = url.split("#")[0];
        Api.get('paysys/wechat/getPackageValue', { type: 0, path: path }).then(function (data) { 
            $scope.wxJssdk = data;
            wx.config({
                debug: false,
                appId: $scope.wxJssdk.appId, 
                timestamp: $scope.wxJssdk.timeStamp,
                nonceStr: $scope.wxJssdk.nonceStr, 
                signature: $scope.wxJssdk.paySign, 
                jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'chooseImage', 'openLocation', 'getLocation']
            });
        });

        if (typeof(WeixinJSBridge) !== "undefined") {
            wx.ready(function () {
                wx.onMenuShareAppMessage({
                    title:$scope.doctor.studioName,
                    desc: $scope.doctor.skills, // 店铺名
                    link: WAP_CONFIG.host+'/user/#/app/docinfo?code=' +  $scope.studio.code+ '&type=1', 
                    imgUrl: $scope.avatarurl,// 分享的图标
                    success: function () {
                        Toast.show('分享成功!');
                    },
                    fail: function (res) {
                        Toast.show('分享失败!');
                        console.log(res);
                    }
                });
            });
        }
    }
    init();
});