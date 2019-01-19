app.controller("recordCtrl", function ($scope, $localStorage, $sessionStorage, $filter, Api, $location, Toast) {
    function init() {
        $scope.haveDatas = true; $scope.page = 1;
    }
    function getList(_page) {
        var page = parseInt(_page) || 1;
        var now = new Date();
        var today = $filter('date')(now, 'yyyy-MM-dd');
        var startDate = '2017-03-01';
        var drdate = now.getTime();
        var limit = 15;
        var start = limit * (page - 1);
        var filter = { "groupOp": "AND", "rules": [{ "fieldType": "", "field": "ao.binrname", "op": "cn", "jpqlFieldName": "", "data": $scope.keyword }] };
        $scope.orderList = $scope.orderList || [];
        var param = {
            type: 0,
            filters: JSON.stringify(filter),
            page: page,
            start: start,
            limit: limit
        };
        Api.get('orders/orderinfo/getAppOrderPageList', param, { content: '加载中...' }).then(function (data) {
            if (data.success) {
                $scope.haveDatas = true;
                var data = data.roots;
                if (data.length == 0) {
                    $scope.haveDatas = false;
                }
                $scope.orderList = $scope.orderList.concat(data);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        })
    }

    $scope.search = function () {
        getList();
    }
    $scope.$on('stateChangeSuccess', function () {
        $scope.loadNextPage();
    });
    $scope.loadNextPage = function () {
        getList($scope.page);
        $scope.page=$scope.page+1;
      
    }

    $scope.goNext = function (vo) {
        $sessionStorage.orderPatient = vo;
        $location.path('/app/recordDetail');
    }
    $scope.doChat = function (vo) {
        var item = {};
        item['sender'] = vo.binrName;
        item['nickname'] = vo.binrName;
        item['headerUrl'] = vo.headimgurl;
        item['accountId'] = vo.patientAccount;
        item['id'] = vo.userId;
        $sessionStorage.chatuser = item;
        $location.path('/app/chat');
    }
    init();
});