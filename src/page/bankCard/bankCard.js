app.controller("bankCardCtrl", function ($rootScope, $ionicModal, $confirm, $location, $ionicScrollDelegate, $scope, Api, Toast, $sessionStorage, $localStorage, $timeout, $state) {
    function init() {
        $scope.bankList = ['建设银行', '中国银行', '广州银行'];
        $scope.cardList = [];
        getCardList();
        initModal();
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
    function initModal() {
        $scope.form = {};
        $ionicModal.fromTemplateUrl('addCardTpl.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });
    }
    $scope.showModal = function () {
        $scope.modal.show();
    }

    $scope.doAddCard = function () {
        if (!$scope.form.bank) {
            Toast.show("请选择银行");
            return;
        }

        if (!$scope.form.account) {
            Toast.show("请输入银行卡号");
            return;
        }
        var tmp = true, total = 0;
        for (var i = $scope.form.account.length; i > 0; i--) {
            var num = $scope.form.account.substring(i, i - 1);
            if (tmp = !tmp, tmp) num = num * 2;
            var gw = num % 10;
            total += (gw + (num - gw) / 10);
        }
        if (total % 10 != 0) {
            Toast.show("银行卡号不正确");
            return;
        }
        if (!$scope.form.accounter) {
            Toast.show("请输入您的姓名");
            return;
        }
        if (!$scope.form.bankBranch) {
            Toast.show("请输入支行名称");
            return;
        }

        var param = {
            bank: $scope.form.bank,
            accounter: $scope.form.accounter,
            bankBranch: $scope.form.bankBranch,
            account: $scope.form.account,
            doctorId: $localStorage.doctor.id,
            userId: $localStorage.user.id
        };
        Api.post('paysys/docbankaccount/saveOrUpdate', param, { content: '' }).then(
            function (data) {
                if (data.success) {
                    Toast.show('添加银行卡成功');
                    $timeout(function () { $state.reload() }, 1200);
                } else {
                    Toast.show('添加银行卡失败!' + data.errorMessage);
                }
                $scope.modal.hide();
            }
        );
    }

    $scope.delCard = function (vo) {
        $confirm.show(function () {
            Api.post('paysys/docbankaccount/delDoctorAccount', { id: vo.id }).then(
                function (data) {
                    if (data.success) {
                        Toast.show('解绑成功!');
                        $timeout(function () { $state.reload() }, 1200);
                    } else {
                        Toast.show('解绑失败!' + data.errorMessage);
                    }
                }
            );
        }, { 'title': '确定要解绑该银行卡吗?' });
    }


    init();
});