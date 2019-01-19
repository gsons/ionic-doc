app.controller("orderInfoCtrl", function($rootScope,$location,$ionicScrollDelegate,$interval, $scope,Api,Toast,$sessionStorage,$localStorage) {
    function init() {
        playVoice();
    }

    function playVoice() { 
        var cssArr = ['voice0', 'voice1', 'voice2'];
        var i = 0;$scope.voiceCss = cssArr[i];
        $interval(function () { 
            $scope.voiceCss = cssArr[i];
            i++; if (i > 2) i = 0;
        },300)
    }
    init();
});