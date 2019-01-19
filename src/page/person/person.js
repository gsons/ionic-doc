app.controller("personCtrl", function($scope, Api, WAP_CONFIG,$localStorage, $confirm, $location) {
    $scope.doc = $localStorage.doctor;
    $scope.user = $localStorage.user;
    $scope.avatarurl = 'http://image.tcmtrust.cn/' + $scope.doc.path;

    $scope.logout = function() {
        $confirm.show(function() {
            Api.post('logout').then(function(data) {
                if (data.success) {
                    $location.path('app/login');
                } else {
                    $location.path('app/login');
                }
            })
        }, { 'title': '确定退出登陆状态？' });
    }
    $scope.bingWeixin = function() {
        $confirm.show(function() {
            location.href = WAP_CONFIG.host + '/medicalsys/paysys/wechat/oauthUser?accountId=' + $scope.user.accountId + '&userType=3';
        }, { 'title': '确定要将此账号绑定当前微信号吗？' });
    }
});