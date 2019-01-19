app.controller("addpresCtrl", function($rootScope, $location, $ionicScrollDelegate, $loading, $scope, $http, Api, $sessionStorage, $localStorage, $ionicPopup, Toast, $confirm) {
   
    function init() {
        // 进入该页面前提数据是 预约id 病人信息
        $scope.fastOrder=$sessionStorage.FastAppOrder; //预约信息
        $scope.binren=$sessionStorage.binren; //病人信息
        $scope.presType = '05';
        $scope.comments = ["无", "焗服", "包煎", "炒", "冲服", "打碎", "后下", "化服", "另包", "另炒", "吞服", "外洗", "先煎", "烊化", "另加"];
        $scope.medicalList1 = [];
        $scope.amount = 0;//总价
        $scope.herbalAmount= 1;//付数
        $scope.docSetBoil = 0; //可代煎
    }
    $scope.searchMedical = function() {
        if ($scope.medicalNameKey.length >= 2 || $scope.medicalNameKey.charCodeAt() > 255) {
            Api.get('mzsys/getChargeItem', { sValue: $scope.medicalNameKey.toUpperCase() }).then(function(data) {
                var searchList=[];
                for(var i=0;i<data.roots.length;i++){
                      if(data.roots[i].groupNo==83) searchList.push(data.roots[i]);
                }
                $scope.searchList=searchList;
            })
        }
    }

    $scope.choseYc = function(yc) {
        $scope.addOrUpdateCF(yc);
    }

    $scope.addOrUpdateCF = function(yc, index) {
        if (yc.dosage == undefined) yc.dosage = 5;
        yc.dosage = parseInt(yc.dosage);
        if (yc.drugFlag == 1) var subtitle = "该药材具有毒性,请谨慎使用";
        $scope.$selectedyc = angular.copy(yc);
        $scope.$selectedyc['comment'] = '无';
        var btnText = (index == undefined) ? '添加' : '修改';
        var popup = $ionicPopup.show({
            templateUrl: "medicalTpls.html",
            title: yc.chargeName,
            subTitle: subtitle || '',
            scope: $scope,
            buttons: [{
                text: '取消',
                type: 'button-assertive',
            }, {
                text: btnText,
                type: 'button-positive',
                onTap: function(e) { return 1; }
            }, ]
        });
        popup.then(function(res) {
            if (res) {
                if (index == undefined) {
                    var flag = true; //是否可以添加饮片
                    for (var i in $scope.medicalList1) {
                        if ($scope.medicalList1[i].chargeCode == $scope.$selectedyc.chargeCode) {
                            flag = false;
                        }
                    }
                    if (flag) {
                        $scope.medicalList1.push($scope.$selectedyc);
                    } else {
                        Toast.show("该饮片已添加!");
                    }
                } else {
                    $scope.medicalList1[index] = $scope.$selectedyc;
                }
                console.log($scope.medicalList1);
            }
        })
    }

    $scope.selectMethod = function($index, comment) {
        $scope.medicalList1[$index]['comment'] = comment;
        console.log($scope.medicalList1);
    }

    $scope.addYCNum = function(offset) {
        var tmp = parseInt($scope.$selectedyc.dosage + offset);
        if (isNaN(tmp) || tmp <= 0) { $scope.$selectedyc.dosage = 1 } else $scope.$selectedyc.dosage = tmp;
    }

    //删除一个饮片
    $scope.deleteItem = function(index) {
        $confirm.show(
            function() {
                $scope.medicalList1.splice(index, 1);
            }, { title: "确定要删除该饮片吗?" });
    }

    //清空所有饮片吗
    $scope.deleteAllItem = function(index) {
        $confirm.show(
            function() {
                $scope.medicalList1 = [];
            }, { title: "确定要清空所有饮片吗?" });
    }


    $scope.chooseVal = function(val) {
        $scope.$selectedyc.dosage = val;
    }

    $scope.clearInput = function() {
        $scope.medicalNameKey = undefined;
        $scope.searchList = undefined;
    }

    $scope.$watch('medicalList1', function() {
        var sum = 0;
        for (var i = 0; i < $scope.medicalList1.length; i++) {
            sum += $scope.medicalList1[i].dosage * $scope.medicalList1[i].origPrice;
        }
        sum = sum * $scope.herbalAmount;
        $scope.amount = sum.toFixed(2);
    }, true);

    $scope.$watch('fushu', function() {
        var sum = 0;
        for (var i = 0; i < $scope.medicalList1.length; i++) {
            sum += $scope.medicalList1[i].dosage * $scope.medicalList1[i].origPrice;
        }
        sum = sum * $scope.herbalAmount;
        $scope.amount = sum.toFixed(2);
    }, true);

    $scope.changeQty = function(offset) {
        var tmp = parseInt($scope.herbalAmount + offset);
        if (isNaN(tmp) || tmp <= 0) { $scope.herbalAmount = 1 } else $scope.herbalAmount = tmp;
    }

    $scope.nextStep = function() {
        $rootScope.myPopup = $ionicPopup.show({
            templateUrl: "templates/sureModal.html",
            title: '',
            subTitle: '',
            cssClass: 'cfPopup',
            scope: $scope,
            buttons: [{
                text: '取消',
                type: 'button-assertive',
            }, {
                text: '下一步',
                type: 'button-positive',
                onTap: function(e) {
                    return 2;
                }
            }, ]
        });
        $rootScope.myPopup.then(function(res) {
            if (res) {
                  submitAddCf();
                // var amount = parseFloat($scope.presAmount);
                // if (isNaN(amount) || $scope.presAmount < 0.01 || $scope.presAmount > 200) {
                //     Toast.show('请输入正确的预约诊金,诊金必须大于0.01小于200');
                //     return;
                // } else {
                //     submitAddCf();
                // }
            }
        })
    }



    function submitAddCf() {
        var chooseArr = [];
        for (var i = 0; i < $scope.medicalList1.length; i++) {
            chooseJson = {}; //
            var item = $scope.medicalList1[i];
            chooseJson['pid'] = $scope.binren.hisId; // 病人门诊系统ID
            chooseJson['times'] = $scope.fastOrder.times; //就诊次数
            chooseJson['prescriptionSn'] =  $scope.fastOrder.prescriptionSn; // 处方序号
            chooseJson['detaiSn'] =i+1; // 药材（饮片)序号
            chooseJson['chargeCode'] = item.chargeCode; // 药材（饮片)编号
            chooseJson['serialNo'] = item.serialNo; // 项目规格
            chooseJson['groupNo'] = item.groupNo; // 收费项目组类型
            chooseJson['recordOpera'] = $localStorage.doctor.hisId; // 开方医生编号
            chooseJson['chargeAmount'] = item.dosage; // 药材（饮片）结算数量
            chooseJson['herbalAmount'] = $scope.herbalAmount; // 药材（饮片）副数
            chooseJson['dosage'] = item.dosage; // 药材（饮片）用量
            chooseJson['dosageUnit'] = item.dosageUnit; // 药材（饮片）用量单位编号
            chooseJson['supplyCode'] = item.supplyCode; // 药材（饮片）用法
            chooseJson['freqCode'] = "";
            chooseJson['persistDays'] = null;
            chooseJson['comment'] = item.comment; // 药材（饮片）特殊用法
            chooseJson['applyDept'] = $localStorage.studioList[0].studioHisId; // 开方工作室studioHisID
            chooseArr.push(chooseJson);
        };

        var arryJson = {};
        arryJson['detailList'] = chooseArr;
        arryJson['presType'] = $scope.presType; //--处方类型， 05：普通处方，10：膏方 09:丹散丸，
        arryJson['presContent'] = $scope.presContent; //处方说明
        arryJson['confirmOpera'] = $localStorage.doctor.hisId; //开方医生编号;
        arryJson['docSetBoil'] = $scope.docSetBoil; //0(可代煎)  -1(不可代煎)
         var detailList = JSON.stringify(arryJson);
         console.log(arryJson);
        Api.post('mzsys/AddAppDetail4', detailList, { content: '正在添加处方中...'},'json').then(function(data) {
            if (data.success) {
                $sessionStorage.FastAppOrder.prescriptionSn++;
                $location.path("/app/showsug");
            } else {
                Toast.show('添加处方失败,' + data.errorMessage);
            }
        });
    }

    init();
});


