app.controller("workIncomeCtrl", function($ionicScrollDelegate, $rootScope,$localStorage, $scope, Api,Toast) {
    function get6months() {
        //创建现在的时间
        var data = new Date();
        //获取年
        var year = data.getFullYear();
        //获取月
        var mon = data.getMonth() + 1;
        var arry = new Array();
        arry[0] = { year: year, mon: mon };
        for (var i = 1; i < 6; i++) {
            mon = mon - 1;
            if (mon <= 0) {
                year = year - 1;
                mon = mon + 12;
            }
            arry[i] = { year: year, mon: mon };
        }

        return arry;
    }

    function resetList() {
        var url1 = "paysys/applyamount/getStudioIncomeList"; //1:提成统计
        var url2 = "paysys/applyamount/getStudioVisitIncomeList"; //2:营业收入统计
        $ionicScrollDelegate.$getByHandle('workIncome-scroll').scrollTop();
        var formData = {
            filters: '{"rules":[{"fieldType":"","field":"studioName","op":"cn","jpqlFieldName":"","data":"' + $scope.studioName + '"},{"fieldType":"date","field":"reserDate","op":"bt","jpqlFieldName":"","data":"' + $scope.dateRange + '"}],"groups":[],"groupOp":"AND"}',
            page: 1,
            start: 0,
            limit: 9999999
        }
        var url = $scope.option == 1 ? url1 : url2;
        Api.post(url, formData,{content:'加载中...'}).then(function(data) {
            if (data.success) {
                $scope.list = data.roots;
            }else{
            	Toast.show('加载数据出差了...'+data.errorMessage);
            }
        });
    }
    $scope.slectOption = function(option) {
        resetList();
    }
    $scope.toggleDate = function(date) {
        var year = date.year;
        var month = date.mon < 10 ? '0' + date.mon : date.mon;
        $scope.currentDate = date;
        var endDate = new Date(year, date.mon, 0).getDate();
        $scope.dateRange = year + "-" + month + '-01~' + year + "-" + month + '-' + endDate;
        resetList();
    }

    function init() {
        $scope._6months = get6months();
        $scope.option = '1'; //1:提成统计 2:营业收入统计
        $scope.currentDate = $scope._6months[0];
        $scope.studioName = $localStorage.doctor.studioName;
        $scope.toggleDate($scope.currentDate);
        $scope.list = [];
    }
    init();
});