app.controller("showsugCtrl", function($rootScope, $location, $ionicScrollDelegate, $loading, Api, Toast, $scope, $http, $sessionStorage, $localStorage, $confirm, $timeout, $state) {
    function init() {
        $scope.docdiag = $sessionStorage.docdiag;
        $scope.doctor = $localStorage.doctor;
        $scope.studioId = $scope.doctor.studioId;
        $scope.fastOrder = $sessionStorage.FastAppOrder; //预约信息
        $scope.binren = $sessionStorage.binren; //病人信息
        $scope.curIndex = 0;
        $scope.amount = 0;
        $scope.medicalList = [];
        var zhenjin = parseFloat($sessionStorage.FastAppOrder.amount);
        $scope.zhenjin = isNaN(zhenjin) ? 0 : zhenjin;
        $scope.AllAmount = $scope.zhenjin;
        getPresInfo();
    }
    function getPresInfo() {
        $loading.show({ content: '', back: false });
        Api.get('mzsys/getPrescriptionList', { flag: 1, pid: $scope.binren.pid, times: $scope.fastOrder.times }).then(function(data) {
            if (data.len) {
                var preList = JSON.parse(data.list0.preList);
                if (preList.length == 0) {
                    $loading.hide();
                    return;
                }
                $scope.curIndex = preList.length - 1;
                var count = 0;
                for (var i = 0; i < preList.length; i++) {
                    var vo = preList[i];
                    Api.get('mzsys/getPrescriptionDetailList', { flag: 2, pid: vo.pid, times: vo.times, accountSn: 0, dataType: 0, prescriptionSn: vo.prescriptionSn }).then(function(ret) {
                        count++;
                        if (ret.list) {
                            var tempArr = JSON.parse(ret.list);
                            $scope.AllAmount += calcSum(tempArr);
                            $scope.medicalList.push(tempArr);
                        }
                        if (count == preList.length) {
                            $loading.hide();
                            $scope.amount = calcSum($scope.medicalList[$scope.curIndex]);
                        }
                    });
                }
            } else {
                $loading.hide();
                Toast.show('加载处方列表失败');
            }
        });
    }

    $scope.showFinish = function() {
        var param = {
            roomId: '000',
            updateFlag: 4,
            flag: 1,
            pid: $scope.binren.pid,
            times: $scope.fastOrder.times,
            doctorCode: $scope.doctor.hisId,
            reserId: $scope.fastOrder.reserId,
            pname: $scope.binren.name,
            accountId: $scope.binren.phone,
            studioId: $scope.studioId
        };
        $confirm.show(function() {
            Api.post('mzsys/doctorClinicRoom', param, { content: '处理中...' }).then(function(data) {
                if (data.success) {
                    Toast.show('完成看诊成功');
                } else {
                    Toast.show('抱歉,系统出错了');
                }
                $location.path('/app/main');
            });
        }, {content:'请仔细检查处方无误后再点击确定完成本次就诊!', title: "确定完成本次就诊吗?" });

    }

    function calcSum(item) {
        if (!item) {
            return 0;
        }
        var sum = 0;
        for (var i = 0; i < item.length; i++) {
            sum += item[i].dosage * item[i].origPrice * item[i].herbalAmount;
        }
        $scope.amount = sum.toFixed(2);
        return sum;
    }

    $scope.delCf = function(index) {
        var item = $scope.medicalList[index];
        if (!item) {
            Toast.show('删除处方失败');
            return;
        }
        var sn = index + 1;
        $confirm.show(function() {
            Api.get('mzsys/delDetail', { pid: item[0].pid, times: item[0].times, prescriptionSn: item[0].prescriptionSn }).then(function(data) {
                if (data.success) {
                    Toast.show('删除处方成功');
                } else {
                    Toast.show('删除处方失败,' + data.errorMessage);
                }
                $timeout(function() {
                    $state.reload();
                }, 1500);

            });
        }, { title: "确定要删除该处方" + sn + "吗?" });

    }

    $scope.selectCF = function(item, index) {
        $scope.curIndex = index;
        $scope.amount = calcSum(item);
    }
    init();
});