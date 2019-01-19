/*         Api.post('webchat/chatmsg/getUserChatMsgByStudio', { recvid: doctor.studioId },{content:'加载中...'}).then(function(data) { });
 */
app.controller('kaifangCtrl', function( $loading, $http, Api, $interval, Toast, $rootScope, $scope, $location, getage, $ionicModal, $ionicScrollDelegate, $localStorage, $sessionStorage) {
    $scope.changePhone = function() {
        if (!/^1[34578]\d{9}$/.test(($scope.accountId + ''))) { reset(); return };
        Api.get('sys/user/getUsersByState', { accountId: $scope.accountId }).then(function(data) {
            if (data.count == 1) {
                $scope.currentUser = data.users[0];
                Api.post('doctors/patientInfo/getPatientByUser', { userId: $scope.currentUser.id }).then(function(data) {
                    $scope.patientList = data.roots;
                    if ($sessionStorage.patient) matchPatient($sessionStorage.patient.name);
                });
            } else {
                reset();
            }
        });
    }

    $scope.submit = function() {
        $loading.show(true);
        var $user = {
            name: $scope.name,
            accountId: $scope.accountId,
            sex: $scope.sex,
            studioId: $localStorage.doctor.studioId,
            userType: 0,
            birthday: (new Date().getFullYear() - $scope.age) + "-7-1",
        }

        Api.post('doctors/patientInfo/registerUser', $user, { content: '处理中...' }).then(function(data) {
            if (data.success) {
                $sessionStorage.patient = {
                    name: $scope.name,
                    phone: $scope.accountId
                };
                $sessionStorage.binren = {
                    "pid": data.result.id,
                    "name": data.result.name,
                    "sex": data.result.sex,
                    "birthday": data.result.birthday,
                    "age":$scope.age,
                    "phone": data.result.phone,
                    "userId": data.result.userId,
                    "hisId": data.result.hisId,
                };
                $sessionStorage.presType=$scope.presType;
                var param = { pid: $sessionStorage.binren.pid, studioId: $localStorage.doctor.studioId, operType: 3, amount: $scope.amount };
                Api.post('orders/orderinfo/saveFastAppOrder', param,{ content: '处理中...' }).then(function(data) {
                    if (data.data && data.data.id && data.data.times) {
                        $sessionStorage.FastAppOrder = {
                            times: data.data.times,
                            reserId: data.data.id,
                            amount: data.data.amount,
                            prescriptionSn:2
                        };
                        $location.path('/app/docdiag');
                    } else {
                        Toast.show('添加全天预约信息失败!' + data.errorMessage);
                    }
                });
            } else {
                Toast.show('更新/新增病人信息失败!' + data.errorMessage);
            }
        });
    }

    $scope.checkBingren = function(selectedName) {
        if (selectedName == '') {
            $scope.age = undefined;
            $scope.name = undefined
        }
        matchPatient(selectedName)
    }
    $scope.changeName = function() {
        $scope.age = undefined;
        $scope.selectName = '';
        if (!matchPatient($scope.name)) $scope.noMatch = true;
    }

    function matchPatient(name) {
        $scope.noMatch = false;
        var bool = false;
        for (var i in $scope.patientList) {
            if ($scope.patientList[i].name == name) {
                $scope.name = $scope.patientList[i].name;
                $scope.sex = $scope.patientList[i].sex;
                $scope.selectName = $scope.name;
                $scope.age = new Date().getFullYear() - new Date($scope.patientList[i].birthday).getFullYear();
                bool = true;
            }
        }
        return bool;
    }

    function reset() {
        $scope.selectName = '';
        $scope.patientList = [];
        $scope.currentUser = {};
        $scope.name = '';
        $scope.sex = '男';
        $scope.age = undefined;
    }

    function init() {
        $scope.patientList = [];
        $scope.currentUser = {};
        $scope.sex = "男";
        $scope.amount=$localStorage.studioList[0].treatmentfee;
        if ($sessionStorage.patient) {
            $scope.accountId = $sessionStorage.patient.phone - 0;
            $scope.name = $sessionStorage.patient.name;
            $scope.changePhone();
        }
    }

    function changeAmount(offset) {
        var tmp = parseFloat($scope.amount + offset);
        if (isNaN(tmp) || tmp <= 0) { $scope.amount = 0.01 }
        else if (tmp>=200) {
            $scope.amount = 200;
        }
        else { 
             $scope.amount = Math.floor(tmp);
        }
    }

    $scope.touchOffset = function (offset) { 
        changeAmount(offset);
        $scope.interval = $interval(function () {
            changeAmount(offset);
        }, 300);
    }
    $scope.release = function () { 
        $interval.cancel($scope.interval);
    }
    init();
})