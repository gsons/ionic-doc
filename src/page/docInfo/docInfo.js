app.controller("docInfoCtrl", function ($timeout, $ionicPopup, $filter, Toast, $state, $rootScope, $ionicModal, $location, $ionicScrollDelegate, $scope, Api, $sessionStorage, $localStorage) {
    function init() {
        $scope.showItem = 1;
        $scope.deptList = []; $scope.professionList = [];
        getDataDictByCategory('PROFESSION'); getDataDictByCategory('DEPT');
        var docInfo = $localStorage.doctor;
        var retbirthday = $filter('date')(docInfo.birthday, 'yyyy-MM-dd');
        $scope.vo = {
            birthday: new Date(retbirthday),
            name: docInfo.name,
            sex: docInfo.sex,
            idcard: docInfo.idcard,
            phone: docInfo.phone,
            email: docInfo.email,
            homeaddress: docInfo.homeaddress,
            skills: docInfo.skills,
            profiles: docInfo.profiles,
            userId: docInfo.userId,
            id: docInfo.id,
            studioId: docInfo.studioId,
            hospitalname: docInfo.hospitalname,
            profession: docInfo.profession,
            technical: docInfo.technical,
            practiceplace: docInfo.practiceplace,
            practicearea: docInfo.practicearea,
            protocol: docInfo.protocol,
        };
        $scope.deptIds = docInfo.deptIds;
        $scope.deptNames = docInfo.deptNames;
        // initModal();
    }
    $scope.submit = function () {
        $scope.paramDeptIds = '?';
        if ($scope.deptIds && $scope.deptIds.length > 0) {
            for (var i = 0; i < $scope.deptIds.length; i++) {
                $scope.paramDeptIds += ('deptIds=' + $scope.deptIds[i] + '&');
            }
        }
        var formData = angular.copy($scope.vo);
        formData['birthday'] = $filter('date')($scope.vo.birthday, 'yyyy-MM-dd');
        Api.post('doctors/doctorInfo/saveOrUpdate' + $scope.paramDeptIds, formData, { content: '处理中...' }).then(function (data) {
            if (data.success) {
                Toast.show('修改成功');
                getDoctor();
            } else {
                Toast.show('修改失败,' + data.errorMessage);
            }
            $timeout(function () {
                $state.reload();
            }, 1500);
        });
    }


    $scope.toggleShow = function (item) {
        $scope.showItem = item;
    }

    $scope.swipe = function (offset) {
        var tmp = $scope.showItem + offset;
        if (tmp > 3) $scope.showItem = 1;
        else if (tmp < 1) $scope.showItem = 4;
        else $scope.showItem = tmp;
        $scope.toggleShow($scope.showItem);
    }

    //获取医生信息
    function getDoctor() {
        Api.post('doctors/doctorInfo/getDoctorByUser').then(function (data) {
            if (data.success) {
                $localStorage.doctor = data.roots[0];
                $state.reload();
            } else {
                Toast.show("获取医生信息失败," + data.errorMessage, 'error');
            }
        });
    }
    function getDataDictByCategory(dict) {
        Api.get('sys/dataDict/getDataDictByCategory', { category: dict }).then(function (data) {
            if (dict == 'DEPT' && data.categoryType) {
                $scope.deptList = data.categoryType;
                initModal();
            }
            else if (dict == 'PROFESSION' && data.categoryType) {
                $scope.professionList = data.categoryType;
            }
        });
        // ?
    }

    function initModal() {
        var _deptIds = $scope.deptIds;
        $scope.depts = [];
        for (var i in $scope.deptList) {
            var vo = $scope.deptList[i];
            $scope.depts.push({ code: vo['code'], name: vo['name'], checked: false });
        }
        for (var i in $scope.depts) {
            var vo = $scope.depts[i];
            for (var j in _deptIds) {
                if (_deptIds[j] == vo.code) vo.checked = true;
            }
        }
        console.log($scope.depts);
        $ionicModal.fromTemplateUrl('deptModal.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

    }

    $scope.editDept = function () {
        $scope.deptIds = [];
        var nameArr = [];
        for (var i in $scope.depts) {
            if ($scope.depts[i].checked) {
                $scope.deptIds.push($scope.depts[i].code);
                nameArr.push($scope.depts[i].name);
            }
        }
        $scope.deptNames = nameArr.join(',');
        $scope.modal.hide();
    }
    init();
});


