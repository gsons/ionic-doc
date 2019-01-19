app.controller('resetPassCtrl', function($scope, Api, $location, $interval, Toast) {
    $scope.fg = {};
    $scope.doforget = function() {
        if ($scope.fg.password !== $scope.fg.pwdconfirm) {
            Toast.show('密码不一致!');
            return;
        }
        Api.post('sys/user/forgetPassword', $scope.fg, { content: '处理中...' }).then(function(data) {
            if (!data.success) {
                Toast.show('密码修改失败!' + data.errorMessage);
            } else {
                Toast.show('密码修改成功!');
                $location.path("/app/main");
            }
        });
    };
    $scope.timer = "获取验证码";
    $scope.sendMobileCode = function(fg) {
        var timers = 60;
        var timePromise = undefined;
        Api.get('sys/user/getSmsCode', { phone: $scope.fg.accountId }).then(function(data) {
            if (!data.success) {
                Toast.show('验证码发送失败!' + data.errorMessage);
                $interval.cancel(timePromise);
                timePromise = undefined;
                timers = 60;
                $scope.timer = '重新获取';
                $scope.btnDisabled = false;
            } else {
                Toast.show('发送成功!');
            }
        });
        timePromise = $interval(function() {
            if (timers <= 0) {
                $interval.cancel(timePromise);
                timePromise = undefined;
                timers = 60;
                $scope.timer = '重新获取';
                $scope.btnDisabled = false;
            } else {
                timers--;
                $scope.timer = '重新获取' + timers + 's';
                $scope.btnDisabled = true;
            }
        }, 1000, 100);

    };
})