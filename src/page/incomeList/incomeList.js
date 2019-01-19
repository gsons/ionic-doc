app.controller("incomeListCtrl", function ($rootScope, $location, $ionicScrollDelegate, $stateParams, $scope, Api, Toast, $sessionStorage, $localStorage) {
    function init() {
        $scope.option = $stateParams.option || 'order'; $scope.page = 1; $scope.haveDatas = true;
        switch ($scope.option) {
            case 'order':
                $scope.title = '预约收益记录';
                $scope.orderList = [];
                break;
            case 'pres':
                $scope.title = '处方收益记录';
                $scope.presList = [];
                break;
            case 'withdraw':
                $scope.title = '提现历史记录';
                $scope.withdrawList = [];
                break;
        }
    }
    $scope.loadNextPage = function () {
        switch ($scope.option) {
            case 'order':
                getOrderList($scope.page);
                break;
            case 'pres':
                getPresList($scope.page);
                break;
            case 'withdraw':
                getWithdrawList($scope.page);
                break;
        }
        $scope.page = $scope.page + 1;
    }
    init();
    function getOrderList(_page) {
        var page = _page, limit = 20;
        var start = limit * (page - 1);
        var param = {
            docAccount: $localStorage.doctor.userName,
            page: page,
            start: start,
            limit: limit
        };
        Api.get('paysys/settleorder/getOrderSettleList', param, { content: '' }).then(
            function (data) {
                if (data.success) {
                    if (data.roots.length == 0) {
                        $scope.haveDatas = false;
                    }
                    $scope.orderList = $scope.orderList.concat(data.roots);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            }
        );
    }
    function getPresList(_page) {
        var page = _page, limit = 20;
        var start = limit * (page - 1);
        var param = {
            docAccount: $localStorage.doctor.userName,
            page: page,
            start: start,
            limit: limit
        };
        Api.get('paysys/presordersettle/getPresOrderSettleList', param, { content: '' }).then(
            function (data) {
                if (data.success) {
                    if (data.roots.length == 0) {
                        $scope.haveDatas = false;
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $scope.presList = $scope.presList.concat(data.roots);
                }
            }
        );
    }
    function getWithdrawList(_page) {
        var page = _page, limit = 20;
        var start = limit * (page - 1);
        var param = {
            docAccount: $localStorage.doctor.userName,
            page: page,
            start: start,
            limit: limit
        };
        Api.get('paysys/applyamount/getApplyOrderAmountList', param, { content: '' }).then(
            function (data) {
                if (data.success) {
                    if (data.roots.length == 0) {
                        $scope.haveDatas = false;
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    $scope.withdrawList = $scope.withdrawList.concat(data.roots);
                }
            }
        );
    }
});