app.controller("incomeCtrl", function ($ionicPopup,$rootScope, $location, $ionicScrollDelegate, $scope, Api,Toast, $sessionStorage, $localStorage) {
    function init() {
        $scope.cardList = []; $scope.accountId = '';
        initData();
        getCardList();
    }
    init();
    function initData() {
        Api.get('paysys/presordersettle/getWxSettleOrderAmount', { docAccount: $localStorage.doctor.userName }, { content: '' }).then(function (data) {
            if (data.success && data.roots) {
                for (var i = 0; i < data.roots.length; i++) {
                    if (data.roots[i].type == '0') {
                        $scope.orderAmount = data.roots[i].firstAmount;
                    } else if (data.roots[i].type == '1') { // 处方收益数据
                        $scope.presAmount = data.roots[i].firstAmount;
                    } else {
                        $scope.orderAmount = 0;
                        $scope.presAmount = 0;
                    }
                }
            } else {
                Toast.show('获取收益信息失败!' + data.errorMessage);
            }
        });
    }

    function getCardList() {
        Api.get('paysys/docbankaccount/getDoctorAccountList', { userId: $localStorage.user.id }, { content: '' }).then(
            function (data) {
                if (data.success) {
                    $scope.cardList = data.roots;
                }
            }
        );
    }

    $scope.withdraw = function () {
        $rootScope.myPopup = $ionicPopup.show({
            templateUrl: "templates/withdrawModal.html",
            title: '',
            subTitle: '',
            cssClass: '',
            scope: $scope,
            buttons: [{
                text: '取消',
                type: 'button-assertive',
            }, {
                text: '确认',
                type: 'button-positive',
                onTap: function (e) {
                    return 2;
                }
            },]
        });
        // 
        $rootScope.myPopup.then(function (res) {
            if (res) {
                if ($scope.cardList.length==0) { 
                    Toast.show('请先在【我的银行卡】添加一张银行卡信息');
                    return;
                }
                if (!$scope.accountId) { 
                    Toast.show('请选择一张银行卡');
                    return;
                }
                Api.post('paysys/applyamount/saveOrUpdate', { accountId: $scope.accountId }, { content: '' }).then(
                    function (data) {
                        if (data.success) {
                            Toast.show('提现申请已提交!请等待后台处理');
                            $timeout(function () { $state.reload() }, 1200);
                        } else {
                            Toast.show('添加银行卡失败!' + data.errorMessage);
                        }
                        $scope.modal.hide();
                    }
                );
            }
        })
    }
});

