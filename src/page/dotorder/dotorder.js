//TODO 患者信息页面
app.controller('dotorderCtrl', function($ionicScrollDelegate, $scope, Api, $filter, $localStorage, $ionicPopup, Toast, $confirm) {
    function init() {
        $scope.user = $localStorage.user;
        $scope.weeks = $scope.weeks || 1;
        getHeadData($scope.weeks);
        getBodyData($scope.weeks);
        var dateArr = get7Dates($scope.weeks);
        var startTime = $filter('date')(dateArr[0], 'yyyy-MM-dd');
        var endTime = $filter('date')(dateArr[6], 'yyyy-MM-dd');
        get7daysPaiban($scope.user.id, startTime, endTime);
    }
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

    $scope.toggleWeek = function(_offset) {
        $scope.weeks += _offset;
        if ($scope.weeks < 1) $scope.weeks = 1;
        else if ($scope.weeks > 5) $scope.weeks = 5;
        else {
            reset();
            init();
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
            var tmp0 = { 'zone': 0, 'date': vo, 'person': 0, 'order': [] };
            $scope.bodyData.morning.push(tmp0);

            var tmp1 = { 'zone': 1, 'date': vo, 'person': 0, 'order': [] };
            $scope.bodyData.noon.push(tmp1);

            var tmp2 = { 'zone': 2, 'date': vo, 'person': 0, 'order': [] };
            $scope.bodyData.afternoon.push(tmp2);

            var tmp3 = { 'zone': 3, 'date': vo, 'person': 0, 'order': [] };
            $scope.bodyData.evening.push(tmp3);
        }
    }

    $scope.tdInfo = function(vo) {
        $scope.activeTd = vo;
        var timezoneArr = ['上午', '中午', '下午', '晚上'];
        $scope.currentDate = $filter('date')(vo.date, "yyyy/MM/dd") + ' ' + timezoneArr[vo.zone];
        $ionicScrollDelegate.$getByHandle('dotorder-scroll').scrollBottom(true);
        console.log(vo);
    }

    function reset() {
        $scope.activeTd = undefined;
        $scope.currentDate = "";
    }

    $scope.qiandao = function(binrName, orderId) {
        var option = {
            'title': '确定要为' + binrName + '报到吗'
        };
        $confirm.show(function() {
            Api.post('orders/orderinfo/reservation', { orderId: orderId },{content:'处理中...'}).then(function(data) {
                if (data.success) {
                    Toast.show('报到成功');
                } else {
                    Toast.show('报到失败');
                }
            });
        }, option);
    }

    //获取七天排班信息
    function get7daysPaiban(_userId, _start, _end) {
        var timeZone_4 = ['上午', '中午', '下午', '晚上'];
        var param = {
            type: 0,
            userType: 1,
            page: 1,
            start: 0,
            limit: 500,
            userId: _userId,
            startTime: _start,
            endTime: _end
        };
        Api.get('orders/orderinfo/getAppOrderPageList',param,{content:'加载中...'}).then(function(data) {
            if (data.success) {
                var list = data.roots;
                for (var j in list) {
                    var item = list[j];
                    for (var i in $scope.bodyData.morning) {
                        var vo = $scope.bodyData.morning[i];
                        var date = $filter('date')(vo.date, 'yyyy-MM-dd');
                        if (item.status != 5 && item.reserDate == date && item.timeType == vo.zone) {
                            vo['person'] += 1;
                            vo.order.push(item);
                        }
                    }
                    for (var i in $scope.bodyData.noon) {
                        var vo = $scope.bodyData.noon[i];
                        var date = $filter('date')(vo.date, 'yyyy-MM-dd');
                        if (item.status != 5 && item.reserDate == date && item.timeType == vo.zone) {
                            vo['person'] += 1;
                            vo.order.push(item);
                        }
                    }
                    for (var i in $scope.bodyData.afternoon) {
                        var vo = $scope.bodyData.afternoon[i];
                        var date = $filter('date')(vo.date, 'yyyy-MM-dd');
                        if (item.status != 5 && item.reserDate == date && item.timeType == vo.zone) {
                            vo['person'] += 1;
                            vo.order.push(item);
                        }
                    }
                    for (var i in $scope.bodyData.evening) {
                        var vo = $scope.bodyData.evening[i];
                        var date = $filter('date')(vo.date, 'yyyy-MM-dd');
                        if (item.status != 5 && item.reserDate == date && item.timeType == vo.zone) {
                            vo['person'] += 1;
                            vo.order.push(item);
                        }
                    }
                }
                if ($scope.weeks > 1) Toast.show("已切换到第" + $scope.weeks + "周");
            } else {
                Toast.show('获取预约信息失败', 'error');
            }
        });
    }
    init();
});