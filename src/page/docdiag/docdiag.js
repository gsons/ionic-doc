//docdiagCtrl 病例+诊断
app.controller('docdiagCtrl', function($scope, $rootScope, $http, Api, Toast, $filter, $timeout, $ionicPopup, $ionicModal, $location, $ionicScrollDelegate, $localStorage ,$sessionStorage, $confirm, FileUploader) {
    function initUploader() {
        var uploader = $scope.uploader = new FileUploader({
            url: 'http://192.168.2.102:8080/medicalsys/empPatient/attchements/upLoad',
            formData: [{}],
            // removeAfterUpload: true,
        });

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
        uploader.onWhenAddingFileFailed = function(item, filter, options) {
            Toast.show('选择图片失败!');
        };
        uploader.onAfterAddingFile = function(fileItem) {
            var t=$scope.index+1;
            var  chte = $filter('date')(new Date().getTime(), 'yyyyMMddHHmmss.sss');
            chte = chte.split(".");
            var chtime = chte[0] + chte[1];
            var pt = (fileItem._file.name).split(".");
            fileItem.file.name = chtime + "_" + t + "." + pt[1];
            (fileItem.formData)[0].picType = t;
            if (fileItem._file.lastModified == undefined) {
                fileItem._file.lastModified = new Date(dateService.getServerDate()).getTime();
            }
            (fileItem.formData)[0].picTime = fileItem._file.lastModified;
        };
    }

    function init() {
        $scope.fastAppOrder = $sessionStorage.FastAppOrder;
        $scope.binren = $sessionStorage.binren;
        $scope.doctor= $localStorage.doctor;
        $scope.studio= $localStorage.studioList[0];
        $scope.sickHis = '';
        $scope.sickName1 = '';
        $scope.sickName2 = '';
        $scope.sickName3 = '';
        $scope.sickName4 = '';
        $scope.sickId1 = '';
        $scope.sickId2 = '';
        $scope.sickId3 = '';
        $scope.sickId4 = '';
        $scope.imgList = [{ text: '上传血液、尿液等检验单', imgArr: [] }, { text: '上传B超、胸透等检查单图片', imgArr: [] }, { text: '上传症状实拍图片', imgArr: [] }];
        $scope.index = 0;
        initUploader();
    }
    $ionicModal.fromTemplateUrl('JCDmodal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.JCDmodal = modal;
    });

    $scope.toggleIndex = function(index) {
        $scope.index = index;
    }

    $scope.delPic = function(vo) {
        $confirm.show(function() {
           vo.remove();
        }, { title: '确定要删除该图片吗' });
    }

    $scope.openModalForSickName = function(index) {
        $scope.JCDmodalIndex = index;
        $scope.JCDmodal.show();
        $('input[name="key"]').focus().val('');
        $scope.viewScroll = $ionicScrollDelegate.$getByHandle('dataScroll');
        $scope.viewScroll.scrollTop();
        $scope.sickNameList = undefined;
    }

    $scope.searchZD = function(val) {

        if (!angular.isString(val)) return;
        $scope.viewScroll = $ionicScrollDelegate.$getByHandle('dataScroll');
        $scope.viewScroll.scrollTop();

        if (val.length >= 3 || val.charCodeAt() > 255) {
            flag = false;
            val = val.toUpperCase();
            Api.get('mzsys/getIcd2', { code: val, flag: 0 }).then(function(data) {
                if (data.children && data.children.length <= 100)
                    $scope.sickNameList = data.children;
                else if (data.children && data.children.length > 100)
                    $scope.sickNameList = data.children.slice(0, 100);
                else $scope.sickNameList = [];
            });
        }
    }
    $scope.selectSickName = function(item) {
        switch ($scope.JCDmodalIndex) {
            case 1:
                $scope.sickName1 = item.name; //西医第一
                $scope.sickId1 = item.id;
                break;
            case 2:
                $scope.sickName2 = item.name; //西医第二
                $scope.sickId2 = item.id;
                break;
            case 3:
                $scope.sickName3 = item.name; //中医
                $scope.sickId3 = item.id;
                break;
            case 4:
                $scope.sickName4 = item.name; //症型
                $scope.sickId4 = item.id;
                break;
        }
        $scope.JCDmodal.hide();
    }
    $scope.clearSickName = function(index) {
        switch (index) {
            case 1:
                $scope.sickName1 = '';
                $scope.sickId1 = '';
                break;
            case 2:
                $scope.sickName2 = '';
                $scope.sickId2 = '';
                break;
            case 3:
                $scope.sickName3 = '';
                $scope.sickId3 = '';
                break;
            case 4:
                $scope.sickName4 = '';
                $scope.sickId4 = '';
                break;
        }
    }

    /**
     * 提交诊断
     */
    $scope.submit = function() {
        var param = {
            brbl: $scope.sickHis,
            zyzd: encodeURIComponent($scope.sickId3),
            zyzdText: $scope.sickName3,
            cyzd: encodeURIComponent($scope.sickId1),
            cyzdText: $scope.sickName1,
            zyizd: encodeURIComponent($scope.sickId2),
            zyizdText: $scope.sickName2,
            zx: encodeURIComponent($scope.sickId4),
            zxText: $scope.sickName4,
            orderId: $scope.fastAppOrder.reserId,
            userType: 0,
            patientId: $scope.binren.pid,
            remark: '',
            recordSn: $scope.binren.hisId,
            picType: '',
            picTime: ''
        };
        $sessionStorage.docdiag = {
            zyzdText: $scope.sickName3,
            cyzdText: $scope.sickName1,
            zyizdText: $scope.sickName2,
            zxText: $scope.sickName4,
            brbl: $scope.sickHis,
        };
        if ($scope.uploader.queue.length == 0) {
            submitNoImage(param);
        } else {
            submitByImage(param);
        }
    }

    function submitNoImage(param) {
        Api.post('empPatient/attchements/upLoadNoImage', param, { content: '处理中...' }).then(function(data) {
            Api.post('empPatient/attchements/upLoadFinish', { orderId: $scope.fastAppOrder.reserId, userType: 0, patientId: $scope.binren.pid }).then(function() {
                $location.path('/app/addpres');
            });
        });
    }

    function submitByImage(param) {
        for (var i = 0; i < $scope.uploader.queue.length; i++) {
            param.pid = $scope.binren.hisId;
            param.times =$scope.fastAppOrder.times;
            param.recordDept = $scope.studio.studioHisId;
            param.recordOpera = $scope.doctor.hisId;
             param.recordSn = 21+i;
            param.picType=(($scope.uploader.queue)[i].formData)[0].picType;
            (($scope.uploader.queue)[i].formData)[0] = param;
        }
        $scope.uploader.uploadAll();
        $scope.uploader.onCompleteAll = function onCompleteAll() {
            Api.post('empPatient/attchements/upLoadFinish', { orderId: $scope.fastAppOrder.reserId, userType: 0, patientId: $scope.binren.pid }).then(function(data) {
                if (data.success) {
                    Toast.show('上传图片成功！');
                    $location.path("/app/sugUse2");
                } else {
                    Toast.show('上传图片失败！' + data.errorMessage);
                }
            });
        }
    }
    init();
})