app.controller("circleCtrl", function($sce,$scope, $localStorage, $filter) {
    function init() {
        $scope.doctor = $localStorage.doctor;
        $scope.user = $localStorage.user;
        $scope.height=document.documentElement.clientHeight-49;
        var Atoken = $scope.user.accountId + "zcjk" + $filter('date')(new Date(), 'yyyyMMdd');
        Atoken = MD5(MD5(Atoken));
        $scope.circleUrl = $sce.trustAsResourceUrl("http://quanzi.tcmtrust.cn/mobi/wxcircledetail.html?Ausername=" +
            $scope.user.accountId + "&studioId=" + $scope.doctor.studioId + "&studioName=" + $scope.doctor.studioName + "&Atoken=" + Atoken + "&type=2");
    }
    init();
});