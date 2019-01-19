app.controller("loginCtrl", function($scope, Api, Toast, $location,WAP_CONFIG, $localStorage, $state, $rootScope, $sessionStorage) {
    function init() {
        $scope.formData = {
            userType: 1,
            force: true,
        };
        var accountId = $localStorage.username;
        if(!accountId) accountId=localStorage.getItem('doclocalusername');
        $scope.formData.username = parseInt(accountId) || undefined;

        var pass= $localStorage.pass;
         if(!pass) pass=localStorage.getItem('doclocalpassword');
        $scope.formData.password =pass;

        $scope.isBinWeixn = true;
    }

    //登录
    $scope.doLogin = function() {
        Api.post('login', $scope.formData, { content: '登录中...' }).then(function(data) {
             $rootScope.getNotReadMessList();
            if (data.success) {
                $localStorage.username=$scope.formData.username;
                $localStorage.pass=$scope.formData.password;
                $localStorage.user = data.data;
                if (!data.data.openId) {
                    $scope.isBinWeixn = false;
                }
                getDoctor();
                getStudioList();
            } else {
                Toast.show("登录失败," + data.errorMessage, 'error');
            }
        });
    }

    //获取医生信息
    function getDoctor() {
        Api.post('doctors/doctorInfo/getDoctorByUser').then(function(data) {
            if (data.success) {
                $localStorage.doctor = data.roots[0];
            } else {
                Toast.show("获取医生信息失败," + data.errorMessage, 'error');
            }
        });
    }

    //获取工作室列表
    function getStudioList() {
        Api.get('doctors/studio/getStudioList').then(function(data) {
            if (data.success) {
                $localStorage.studioList = data.list;
                if (!$scope.isBinWeixn) {
                    bingWeixin();
                } {
                    if ($sessionStorage.previousState) $state.go($sessionStorage.previousState);
                    else $location.path("/app/main");
                }
            } else {
                Toast.show('获取工作室信息失败,' + data.errorMessage, 'error');
            }
        });
    }

    function bingWeixin() {
        $confirm.show(function() {
            location.href = WAP_CONFIG.host + '/medicalsys/paysys/wechat/oauthUser?accountId=' + $localStorage.user.accountId + '&userType=3';
        }, { 'title': '确定要将此账号绑定当前微信号吗？' }, function() {
            if ($sessionStorage.previousState) $state.go($sessionStorage.previousState);
            else $location.path("/app/main");
        });
    }
    init();
});