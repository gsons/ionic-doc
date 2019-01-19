app.controller("recordDetailCtrl", function($rootScope, $location, $ionicScrollDelegate, $loading, Api, Toast, $scope, $http, $sessionStorage, $localStorage, $ionicPopup, $state) {
    function init() {
        $scope.orderPatient = $sessionStorage.orderPatient;
        $scope.isshowcf = true; //处方展开收起状态
        $scope.isshowYuYue = true; //预约展开收起状态
        $scope.chufangList = [];
        $scope.scroll = $ionicScrollDelegate.$getByHandle('recordDetail-scroll');
        CFDetail();
    }

    $scope.toggle = function () {
        $scope.scroll.resize();
        $scope.isshowcf = !$scope.isshowcf;
    }

    $scope.toggleShowYuYue = function () {
        $scope.scroll.resize();
        $scope.isshowYuYue = !$scope.isshowYuYue;
    }

    $scope.toggleShowPerson = function () {
        $scope.scroll.resize();
        $scope.isshowPerson = !$scope.isshowPerson;
        if (!$scope.isshowPerson) return;
        Api.get('empPatient/attchements/getBrCheckLists', { patientId: $scope.orderPatient.binrId, userType: 0, orderId: $scope.orderPatient.id }, { content: '加载中...' }).then(function(data) {
            $scope.sickMsg = ''; //病人的病理特征
            $scope.sickMsgImgList1 = [];
            $scope.sickMsgImgList2 = [];
            $scope.sickMsgImgList3 = [];
            for (var i = 0; i < data.roots.length; i++) {
                $scope.scroll.resize();
                var vo = data.roots[i];
                $scope.sickMsg = data.roots[0].remark;
                if (vo.path) {
                    if (vo.type == 1) {
                        var imgPath = vo.path;
                        imgPath = imgPath.replace("\\", "/");
                        imgPath = "http://image.tcmtrust.cn/" + imgPath;
                        $scope.sickMsgImgList1.push(imgPath);
                    } else if (vo.type == 2) {
                        var imgPath = vo.path;
                        imgPath = imgPath.replace("\\", "/");
                        imgPath = "http://image.tcmtrust.cn/" + imgPath;
                        $scope.sickMsgImgList2.push(imgPath);
                    } else if (vo.type == 3) {
                        var imgPath = vo.path;
                        imgPath = imgPath.replace("\\", "/");
                        imgPath = "http://image.tcmtrust.cn/" + imgPath;
                        $scope.sickMsgImgList3.push(imgPath);
                    }
                }
            }
        });
    }


    function CFDetail() {

        $scope.arraylist = {};
        $scope.CFsum = 0;
        var param = {
            flag: 4,
            requestSn: $scope.orderPatient.hisId,
            page: 1,
            start: 0,
            limit: 9999
        };
        Api.get('mzsys/getPrescriptionPageList2', param, { content: '' }).then(function(data) {
            if (data.success) {
                $scope.scroll.resize();
                var list = data.roots;
                if (list.length > 0) $scope.wxOrderId = list[0].wxOrderId;
                if (list.length > 0) $scope.payStatusText = list[0].payStatusText;
                for (var i in list) {
                    var key = list[i]['prescriptionSn'];
                    var presContent = list[i].presContent;
                    $scope.arraylist[key] = {};
                    $scope.arraylist[key]['presContent'] = presContent;
                    param = {
                        flag: 2,
                        dataType: 0,
                        pid: list[i].pid,
                        times: list[i].times,
                        accountSn: 4,
                        prescriptionSn: list[i].prescriptionSn,
                        page: 1,
                        start: 0,
                        limit: 9999
                    }
                    Api.get('mzsys/getPrescriptionDetailPageList', param, { content: '' }).then(function (data) {
                        $scope.scroll.resize();
                        if (data.success) {
                            $scope.chufangList = data.roots;
                            var lists = data.roots;
                            if (lists.length == 0) return;
                            var key = lists[0]['prescriptionSn'];
                            $scope.arraylist[key]['list'] = lists;
                            var sum = 0;
                            for (var i in lists) {
                                sum += parseFloat(lists[i].chargePrice * lists[i].chargeAmount * lists[i].herbalAmount);
                            }
                            $scope.arraylist[key]['sum'] = sum;
                            $scope.CFsum += sum;
                        }
                    });
                }
            }
        });

    }


    // 添加处方模板
    $scope.addCfTpl = function(pres) {
        $rootScope.myPopup = $ionicPopup.show({
            template: '<input type="text" style="padding-left:10px;" ng-model="$parent.templatesName" placeholder="请输入模板名称">',
            title: '',
            subTitle: '',
            scope: $scope,
            buttons: [{
                text: '取消',
                type: 'button-assertive'
            }, {
                text: '确认',
                type: 'button-positive',
                onTap: function(e) {
                    return 2;
                }
            }, ]
        });
        $rootScope.myPopup.then(function(res) {
            if (res) {
                var item = {
                    pid: pres.pid,
                    times: pres.times,
                    prescriptionSn: pres.prescriptionSn,
                    templatesName: $scope.templatesName,
                    doctorCode: pres.doctorCode
                }
                Api.get('mzsys/addDoctorTemplates', item).then(function(data) {
                    if (data.success) {
                        Toast.show("操作成功");
                    } else {
                        Toast.show("操作失败");
                    }
                });
            }
        })
    }


    $scope.doChat = function() {
        var item = {};
        item['sender'] = $scope.orderPatient.binrName;
        item['nickname'] = $scope.orderPatient.binrName;
        item['headerUrl'] = $scope.orderPatient.headimgurl;
        item['accountId'] = $scope.orderPatient.patientAccount;
        item['id'] = $scope.orderPatient.userId;
        $sessionStorage.chatuser = item;
        $location.path('/app/chat');
    }

    $scope.goKaiFang = function() {
        $sessionStorage.patient = {
            name: $scope.orderPatient.binrName,
            phone: $scope.orderPatient.patientAccount
        };
        $location.path('/app/kaifang');
    }

    $scope.searchPatient = function() {
        $state.go('app.record', { patient: $scope.orderPatient.binrName });
    }


    init();
});