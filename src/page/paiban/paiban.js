app.controller('paibanCtrl', function($ionicScrollDelegate, $confirm, $ionicModal, $loading, Api, Toast, $state, $rootScope, $http, $scope, $filter, $localStorage, $timeout) {
    init();

    //_week周的七天日期对象
    function get7Dates(_week) {
        var week = _week || 1;
        var dateArr = [];
        for (var i = 0; i < 7; i++) {
            var now = new Date();
            var nowDate = now.getDate();
            now.setDate(nowDate + i + ((week - 1) * 7));
            dateArr.push(now);
        }
        return dateArr;
    }
    //获取表格头部数据
    function getHeadData(_week) {
        var weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        $scope.dataHead = [];
        var _7dates = get7Dates(_week);
        for (var i in _7dates) {
            var vo = _7dates[i];
            $scope.dataHead.push({ 'week': weekArr[vo.getDay()], 'date': $filter('date')(vo, 'MM/dd') });
        }
    }
    //获取表格内容数据
    function getBodyData(_week) {
        $scope.bodyData = {
            morning: [],
            noon: [],
            afternoon: [],
            evening: []
        };
        var _7dates = get7Dates(_week);
        for (var i in _7dates) {
            var vo = _7dates[i];
            var tmp0 = { 'zone': 0, 'date': vo, 'person': 0, 'paiban': [] };
            $scope.bodyData.morning.push(tmp0);

            var tmp1 = { 'zone': 1, 'date': vo, 'person': 0, 'paiban': [] };
            $scope.bodyData.noon.push(tmp1);

            var tmp2 = { 'zone': 2, 'date': vo, 'person': 0, 'paiban': [] };
            $scope.bodyData.afternoon.push(tmp2);

            var tmp3 = { 'zone': 3, 'date': vo, 'person': 0, 'paiban': [] };
            $scope.bodyData.evening.push(tmp3);
        }
    }

    //获取七天排班信息
    function get7daysPaiban(_studioId, _start, _end) {
        var param = {
            startTime: _start,
            endTime: _end,
            studioId: _studioId,
            start: 0,
            limit: 1000,
        }
        Api.post('doctors/studioScheduleDetail/getScheduleDetailsList', param, { content: '加载中...' }).then(function(data) {
            if (data.success) {
                $scope.paiban_7days = data.roots;
                for (var j in $scope.paiban_7days) {
                    var item = $scope.paiban_7days[j];
                    for (var i in $scope.bodyData.morning) {
                        var vo = $scope.bodyData.morning[i];
                        if (item.appDateTime == $filter('date')(vo.date, 'yyyy-MM-dd') && item.timeType == vo.zone) {
                            if (item.status != 5) vo.person += parseInt(item.subReservationNum);
                            if (item.status != 5) vo.paiban.push(item);
                        }
                    }
                    for (var i in $scope.bodyData.noon) {
                        var vo = $scope.bodyData.noon[i];
                        if (item.appDateTime == $filter('date')(vo.date, 'yyyy-MM-dd') && item.timeType == vo.zone) {
                            if (item.status != 5) vo.person += parseInt(item.subReservationNum);
                            if (item.status != 5) vo.paiban.push(item);
                        }
                    }
                    for (var i in $scope.bodyData.afternoon) {
                        var vo = $scope.bodyData.afternoon[i];
                        if (item.appDateTime == $filter('date')(vo.date, 'yyyy-MM-dd') && item.timeType == vo.zone) {
                            if (item.status != 5) vo.person += parseInt(item.subReservationNum);
                            if (item.status != 5) vo.paiban.push(item);
                        }
                    }
                    for (var i in $scope.bodyData.evening) {
                        var vo = $scope.bodyData.evening[i];
                        if (item.appDateTime == $filter('date')(vo.date, 'yyyy-MM-dd') && item.timeType == vo.zone) {
                            if (item.status != 5) vo.person += parseInt(item.subReservationNum);
                            if (item.status != 5) vo.paiban.push(item);
                        }
                    }

                }
                console.log($scope.bodyData);
                if ($rootScope.week > 1) Toast.show("已切换到第" + $rootScope.week + "周");
            } else {
                Toast.show('获取排班信息失败,' + data.errorMessage, 'error');
            }
        });
    }

    $scope.goAddPaiBan = function(item) {
        $scope.isAddAction = true;
        initAddPainban(item);
        $scope.modal.show();
    }

    $scope.editPaiban = function(item) {
        $scope.isAddAction = false;
        initEditPainban(item);
        $scope.modal.show();
    }

    function init() {
        $scope.user = $localStorage.user;
        $scope.doctor = $localStorage.doctor;
        $rootScope.week = $rootScope.week || 1;
        getHeadData($rootScope.week);
        getBodyData($rootScope.week);
        var dateArr = get7Dates($rootScope.week);
        var startTime = $filter('date')(dateArr[0], 'yyyy-MM-dd');
        var endTime = $filter('date')(dateArr[6], 'yyyy-MM-dd');
        get7daysPaiban($scope.doctor.studioId, startTime, endTime);
        initModal();

    }

    $scope.toggleWeek = function(_offset) {
        $rootScope.week += _offset;
        if ($rootScope.week < 1) $rootScope.week = 1;
        else if ($rootScope.week > 5) $rootScope.week = 5;
        else {
            init();
            $scope.bodyDataItem = undefined;
        }
    }

    $scope.tdInfo = function(vo) {
        $scope.activeTd = vo;
        if (vo.person == 0) {
            $scope.goAddPaiBan(vo);
            $scope.bodyDataItem = undefined;
        } else {
            viewPaiban(vo);
            $ionicScrollDelegate.$getByHandle('paiban-scroll').resize();
        }
    }

    //选中时间段排班详情
    function viewPaiban(vo) {
        $scope.bodyDataItem = vo;
        var timezoneArr = ['上午', '中午', '下午', '晚上'];
        $scope.bodyDataItem['timezone_4'] = timezoneArr[vo.zone];
    }
    //停诊
    $scope.stopPaiban = function(item) {
        $confirm.show(function() {
            Api.post('doctors/studioScheduleDetail/stopStudioSchedule', { id: item.id }, { content: '处理中...' }).then(
                function(data) {
                    if (data.success) {
                        Toast.show('停诊成功');
                    } else {
                        Toast.show('停诊失败,' + data.errorMessage);
                    }
                    $timeout(function() {
                        $state.reload();
                    }, 1500);
                });
        },{ title: "确定要停诊吗?" });
    }

    //出诊
    $scope.startPaiban = function(item) {
        $confirm.show( function() {
            Api.post('doctors/studioScheduleDetail/startStudioSchedule', { id: item.id }, { content: '处理中...' }).then(function(data) {
                if (data.success) {
                    Toast.show('出诊成功');
                } else {
                    Toast.show('出诊失败,' + data.errorMessage);
                }
                $timeout(function() {
                    $state.reload();
                }, 1500);
            });
        },{ title: "确定要出诊吗?" });
    }

    function initModal() {
        $ionicModal.fromTemplateUrl('paibanTpl.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });
    }

    function initAddPainban(tdData) {
        initShowTime(tdData);
        initTimeZoneArr($scope.selectTime['timeType']);
        initOrg();
        $scope.form = {};
        $scope.form.personNum = 1;
        $scope.form.startTime = '';
        $scope.form.endTime = '';
        $scope.form.orgId = '';
    }

    function initEditPainban(paibanItem) {
        $scope.paiban = paibanItem;
        $scope.showTime = $scope.paiban.appDateTime + ' ' + $scope.paiban.timeTypeText + ' ' + $scope.paiban.weekNumText;
        initTimeZoneArr($scope.paiban.timeType);
        initOrg();
        $scope.form = {};
        $scope.form.startTime = $scope.paiban.startTime;
        $scope.form.endTime = $scope.paiban.endTime;
        $scope.form.orgId = $scope.paiban.orgId;
        $scope.form.personNum = parseInt($scope.paiban.reservationNum);
    }

    //显示当前的日期与周几
    function initShowTime(tdData) {
        var weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        var timezoneArr = ['上午', '中午', '下午', '晚上'];
        var _date = $filter('date')(tdData.date, 'yyyy-MM-dd');
        var _week = weekArr[tdData.date.getDay()];
        var _timezone = timezoneArr[tdData.zone];
        $scope.showTime = _date + ' ' + _week + ' ' + _timezone;
        $scope.selectTime = { date: _date, weekText: _week, week: tdData.date.getDay(), timezon: _timezone, timeType: tdData.zone };
    }
    //获取预约时间段数组
    function initTimeZoneArr(timeType) {
        var category_start = ['MORN_STARTTIME', 'NOON_STARTTIME', 'PM_STARTTIME', 'NIGHT_STARTTIME'];
        var category_end = ['MORN_ENDTIME', 'NOON_ENDTIME', 'PM_ENDTIME', 'NIGHT_ENDTIME'];

        //获取开始时间段
        Api.get('sys/dataDict/getDataDictByCategory', { category: category_start[timeType] }).then(function(data) {
            if (data.success) {
                $scope.startTimeArr = data.categoryType;
            } else {
                Toast.show('获取开始时间段失败');
                $scope.modal.hide();
            }
        });

        //获取结束时间段
        Api.get('sys/dataDict/getDataDictByCategory', { category: category_end[timeType] }).then(function(data) {
            if (data.success) {
                $scope.endTimeArr = data.categoryType;
            } else {
                Toast.show('获取结束时间段失败');
                $scope.modal.hide();
            }
        });
    }
    //取消
    $scope.cancel = function() {
        // $modalInstance.dismiss('cancel');
    }


    //获取门店信息
    function initOrg() {
        Api.get('sys/org/getOrgComboxList').then(function(data) {
            if (data.length > 0) {
                $scope.orgArr = data;

            } else {
                $scope.orgArr = [];
            }
        });
    }

    $scope.addPersonNum = function(_offset) {
        var num = parseInt($scope.form.personNum);
        if (isNaN(num)) {
            $scope.form.personNum = 1;
            return;
        }
        num += _offset;
        if (num <= 0) $scope.form.personNum = 1;
        else $scope.form.personNum = num;
    }

    function checkTime() {
        var start = $scope.form.startTime.split('.');
        start = parseInt(start[1]);
        var end = $scope.form.endTime.split('.');
        end = parseInt(end[1]);
        return end > start;
    }
    $scope.doAddPaiban = function() {
        if (!checkTime()) { Toast.show('请选择正确的时间段'); return };
        var timeType = $scope.selectTime.timeType;
        var _week = $scope.selectTime.week;
        var ss = $scope.form.text;
        if (_week == 0) _week = 7;
        var startKey = ['mornStartTime', 'noonStartTime', 'pmStartTime', 'nightStartTime'];
        var endKey = ['mornEndTime', 'noonEndTime', 'pmEndTime', 'nightEndTime'];
        var reserKey = ['mornReservationnum', 'noonReservationnum', 'pmReservationnum', 'nightReservationnum'];
        var isFix = $scope.form.isFix ? 1 : 0;
        var data = {
            name: $scope.selectTime.weekText + $scope.selectTime.timezon,
            weeks: $rootScope.week,
            studioId: $scope.doctor.studioId,
            reserDate: $scope.selectTime.date,
            weekNum: 'WEEK.' + _week,
            status: 1,
            isFix: isFix,
            timeType: timeType,
            orgId: $scope.form.orgId
        };
        data[startKey[timeType]] = $scope.form.startTime;
        data[endKey[timeType]] = $scope.form.endTime;
        data[reserKey[timeType]] = $scope.form.personNum;

        Api.post('doctors/studioSchedule/saveStudioAndDetail', data, { content: '处理中...' }).then(function(data) {
            if (data.data && data.data.status == 1) {
                Toast.show('新增排班成功');
            } else if (!data.success) {
                Toast.show('新增排班失败,' + data.errorMessage, 'error');
            } else {
                Toast.show('新增排班失败,' + data.errorMessage, 'error');
            }
            $timeout(function() {
                $scope.modal.hide();
                $state.reload();
            }, 1500);
        });
    }

    $scope.doUpdatePaiban = function() {
        if (!checkTime()) { Toast.show('请选择正确的时间段'); return };
        var data = {
            name: $scope.paiban.name,
            id: $scope.paiban.id,
            startTime: $scope.form.startTime,
            endTime: $scope.form.endTime,
            orgId: $scope.form.orgId,
            reservationNum: $scope.form.personNum
        };

        Api.post('doctors/studioScheduleDetail/saveOrUpdate', data, { content: '处理中...' }).then(function(data) {
            if (data.success) {
                Toast.show('更新排班成功');
            } else {
                Toast.show('更新排班失败,' + data.errorMessage, 'error');
            }
            $timeout(function() {
                $scope.modal.hide();
                $state.reload();
            }, 1500);
        });
    }
});