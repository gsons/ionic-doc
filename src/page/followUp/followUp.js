app.controller('followUpCtrl', function($scope, $rootScope, Api, Toast, $location, $state, $timeout) {
    function init() {
        $scope.formData = {};
        $scope.checkBoxVal = [];
        $scope.allCheckHistory = [];
        Api.post('studio/notice/getStudioNoticeList', { userId: $rootScope.user.id }, { content: '' }).then(function(data) {
            if (data.roots) {
                initData(data.roots);
            }
        });
    }

    function clearCheckbox() { //清空所有的选择
        angular.forEach(($scope.formData), function(value, key) {
            ($scope.formData)[key] = false;
        });
    }

    function initData(list) {
        clearCheckbox();
        $scope.notice = "从就诊完成那天后";
        for (var i = 0; i < list.length; i++) {
            var vo = list[i];
            switch (vo.type) {
                case '0':
                    switch (vo.digital) {
                        case '1':
                            $scope.formData.d1 = true;
                            $scope.notice += '1天,';
                            break;
                        case '2':
                            $scope.formData.d2 = true;
                            $scope.notice += '2天,';
                            break;
                        case '3':
                            $scope.formData.d3 = true;
                            $scope.notice += '3天,';
                            break;
                        case '5':
                            $scope.formData.d5 = true;
                            $scope.notice += '5天,';
                            break;
                    };
                    break;
                case '1':
                    switch (vo.digital) {
                        case '1':
                            $scope.formData.w1 = true;
                            $scope.notice += '1周,';
                            break;
                        case '2':
                            $scope.formData.w2 = true;
                            $scope.notice += '2周,';
                            break;
                        case '3':
                            $scope.formData.w3 = true;
                            $scope.notice += '3周,';
                            break;
                    };
                    break;
                case '2':
                    switch (vo.digital) {
                        case '1':
                            $scope.formData.m1 = true;
                            $scope.notice += '1个月,';
                            break;
                        case '2':
                            $scope.formData.m2 = true;
                            $scope.notice += '2个月,';
                            break;
                        case '3':
                            $scope.formData.m3 = true;
                            $scope.notice += '3个月,';
                            break;
                    };
            }
        }
        $scope.notice += '后发送随访消息';
        if (list.length == 0 || !list) {
            
            $scope.notice = "已停止发送随访消息!";
        }
    }

    $scope.stopAllNotice = function() {
        Api.post('studio/notice/deleteNoticeByStudio', { studioId: $rootScope.doctor.studioId }).then(function(ret) {
            if (ret.success) {
                Toast.show("操作成功!已停止发送随访消息");
                $timeout(function() { $state.reload('app.followUp'); }, 1200);
            } else {
                Toast.show("操作失败," + ret.errorMessage);
            }
        });
    };

    $scope.submitNotice = function() {
        var selectDatas = [];
        if ($scope.formData != {}) {
            angular.forEach($scope.formData, function(value, key) {
                if (value == true) {
                    selectDatas.push(key);
                }
            });
        }

        if (selectDatas.length == 0) {
            Toast.show("请至少选择一项");
            return;
        }
        var chooseArr = [];
        var chooseJson = {};
        for (var i = 0; i < selectDatas.length; i++) {
            chooseJson = {};
            chooseJson['studioId'] = $rootScope.doctor.studioId;
            chooseJson['digital'] = selectDatas[i].substr(1, (selectDatas[i].length - 1)); //因子（多选框的数值）
            var type = selectDatas[i].substr(0, 1); //类型（0(d)：天，1(w)：周，2(m)：月）
            switch (type) {
                case 'd':
                    chooseJson['type'] = 0;
                    break;
                case 'w':
                    chooseJson['type'] = 1;
                    break;
                case 'm':
                    chooseJson['type'] = 2;
                    break;
            }
            chooseJson['userId'] = $rootScope.user.id; //用户ID
            chooseArr.push(chooseJson);
            var arrayJson = {};
            arrayJson['studioNoticeList'] = chooseArr;
            arrayJson['studioId'] = $rootScope.doctor.studioId;
            var datas = JSON.stringify(arrayJson);
        }

        Api.post('studio/notice/saveOrUpdate', datas, { 'content': '处理中...' }, 'json').then(function(ret) {
            if (ret.success) {
                Toast.show("操作成功,将在就诊完成后发送公众号随访消息");
                $timeout(function() { $state.reload('app.followUp'); }, 1500);
            } else {
                Toast.show("操作失败," + data.errorMessage);
            }
        });
    }

    init();
})