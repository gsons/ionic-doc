//$(document).on('touchmove',function (e){e.preventDefault();});//禁用微信浏览器 滚动


var app = angular.module('starter', ['ionic', 'ngStorage','angularFileUpload','template-app','monospaced.elastic']);
app.config(function($ionicConfigProvider) {
    //解决Android 导航条标题在左边的问题
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');
    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('bottom');
    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
    $ionicConfigProvider.scrolling.jsScrolling(true);
});
app.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
})
app.factory('AuthInterceptor', function($rootScope, $q, $location, $timeout, $window) {
    return {
        response: function(response, toState) {
            var path = $location.path();
            var header = response.headers();
            if (header && header.logintag) {
                if (path != '/app/login') {
                    $location.path('app/login');
                }
            }
            return response;
        }
    };
})

// app.factory('$exceptionHandler', function ($log, $injector) {
//         return function myExceptionHandler(exception, cause) {
//             var exception={
//                 string: exception.toString(),
//                 message: exception.message,
//                 lineNumber: exception.lineNumber,
//                 stack: exception.stack,
//                 cause: cause
//             };
//             $log.log(exception);
//         };
//     })

app.run(function($window, $rootScope, $state, $stateParams, $localStorage,$sessionStorage, $http, $q, $location, Api,$interval) {
    $rootScope.$version=$version;

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$back = function() {
        $window.history.back();
    }
    $rootScope.$refresh = function() {
        $window.location.reload();
    }

     $rootScope.getNotReadMessList=function() {
        Api.get('webchat/chatmsg/getDoctorStudioNoReadMessageList').then(function(data) {
            if (data) {
                $rootScope.$NoReadNum = 0;
                var list = data.roots;
                for (var i in list) {
                    $rootScope.$NoReadNum += list[i].msgCount;
                }
            }
        });
    }
    $rootScope.getNotReadMessList();
    $interval(function(){$rootScope.getNotReadMessList()},100000);//定时获取未读消息

    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams, toState) {
        // $sessionStorage.previousState = from;
        // $sessionStorage.previousStateParams = fromParams;
    });

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {

        if (!$localStorage.user && toState.name != "app.login") {
            $location.path("/app/login");
        }
        //不在聊天室时 断开连接
        if ($rootScope.$ws && toState.name != "app.chat") {
            $rootScope.$ws.close();
            $rootScope.$ws = null;
        }

        if (toState.name&&toState.name!="app.login"&&toState.name!="app.resetPass"){
                 $sessionStorage.previousState=toState.name;
            }
        $rootScope.doctor = $localStorage.doctor;
        $rootScope.user = $localStorage.user;
        $rootScope.studioList = $localStorage.studioList;
    })
})