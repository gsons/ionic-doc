 app.config(function($stateProvider, $urlRouterProvider) {
     $stateProvider
         .state('app', {
             url: '/app',
             abstract: true,
             templateUrl: 'app.html'
         })
         .state('app.login', {
             url: '/login',
             views: {
                 'menuContent': {
                     templateUrl: 'login/login.html',
                     controller: 'loginCtrl'
                 }
             }
         })
         .state('app.main', {
             url: '/main',
             views: {
                 'menuContent': {
                     templateUrl: 'main/main.html',
                     controller: 'mainCtrl'
                 }
             }
         })
         .state('app.dotorder', {
             url: '/dotorder',
             views: {
                 'menuContent': {
                     templateUrl: 'dotorder/dotorder.html',
                     controller: 'dotorderCtrl'
                 }
             }
         })

         .state('app.paiban', {
             url: '/paiban',
             views: {
                 'menuContent': {
                     templateUrl: 'paiban/paiban.html',
                     controller: 'paibanCtrl'
                 }
             },
             cache: false,
         })
         .state('app.PresNotice', {
             url: '/PresNotice',
             views: {
                 'menuContent': {
                     templateUrl: 'PresNotice/PresNotice.html',
                     controller: 'PresNoticeCtrl'
                 }
             },
         })
         .state('app.kaifang', {
             url: '/kaifang',
             views: {
                 'menuContent': {
                     templateUrl: 'kaifang/kaifang.html',
                     controller: 'kaifangCtrl'
                 }
             },
         })
         .state('app.record', {
             url: '/record',
             views: {
                 'menuContent': {
                     templateUrl: 'record/record.html',
                     controller: 'recordCtrl'
                 }
             },
         })
         .state('app.drlist', {
             url: '/drlist',
             views: {
                 'menuContent': {
                     templateUrl: 'drlist/drlist.html',
                     controller: 'drlistCtrl'
                 }
             },
              cache: false,
         })
         .state('app.chat', {
             url: '/chat',
             views: {
                 'menuContent': {
                     templateUrl: 'chat/chat.html',
                     controller: 'chatCtrl'
                 }
             },
             cache: false,
         })
         .state('app.person', {
             url: '/person',
             views: {
                 'menuContent': {
                     templateUrl: 'person/person.html',
                     controller: 'personCtrl'
                 }
             },
         })
         .state('app.circle', {
             url: '/circle',
             views: {
                 'menuContent': {
                     templateUrl: 'circle/circle.html',
                     controller: 'circleCtrl'
                 }
             },
         })
         .state('app.recordDetail', {
             url: '/recordDetail',
             views: {
                 'menuContent': {
                     templateUrl: 'recordDetail/recordDetail.html',
                     controller: 'recordDetailCtrl'
                 }
             },
             cache: false,
         })
         .state('app.docdiag', {
             url: '/docdiag',
             views: {
                 'menuContent': {
                     templateUrl: 'docdiag/docdiag.html',
                     controller: 'docdiagCtrl'
                 }
             },
         }).state('app.addpres', {
             url: '/addpres',
             views: {
                 'menuContent': {
                     templateUrl: 'addpres/addpres.html',
                     controller: 'addpresCtrl'
                 }
             },
              cache: false,
         }).state('app.showsug', {
             url: '/showsug',
             views: {
                 'menuContent': {
                     templateUrl: 'showsug/showsug.html',
                     controller: 'showsugCtrl'
                 }
             },
              cache: false,
         })
         .state('app.docInfo', {
             url: '/docInfo',
             views: {
                 'menuContent': {
                     templateUrl: 'docInfo/docInfo.html',
                     controller: 'docInfoCtrl'
                 }
             },
              cache: false,
         })
        .state('app.studioInfo', {
             url: '/studioInfo',
             views: {
                 'menuContent': {
                     templateUrl: 'studioInfo/studioInfo.html',
                     controller: 'studioInfoCtrl'
                 }
             },
              cache: false,
         })
        .state('app.income', {
             url: '/income',
             views: {
                 'menuContent': {
                     templateUrl: 'income/income.html',
                     controller: 'incomeCtrl'
                 }
             },
              cache: false,
         })
         .state('app.incomeList', {
            url: '/incomeList?option',
            views: {
                'menuContent': {
                    templateUrl: 'incomeList/incomeList.html',
                    controller: 'incomeListCtrl'
                }
            },
             cache: false,
        })
        .state('app.followUp', {
             url: '/followUp',
             views: {
                 'menuContent': {
                     templateUrl: 'followUp/followUp.html',
                     controller: 'followUpCtrl'
                 }
             },
              cache: false,
         })
        .state('app.resetPass', {
             url: '/resetPass',
             views: {
                 'menuContent': {
                     templateUrl: 'resetPass/resetPass.html',
                     controller: 'resetPassCtrl'
                 }
             },
              cache: false,
         })
        .state('app.workIncome', {
             url: '/workIncome',
             views: {
                 'menuContent': {
                     templateUrl: 'workIncome/workIncome.html',
                     controller: 'workIncomeCtrl'
                 }
             },
              cache: false,
         })
         .state('app.bankCard', {
            url: '/bankCard',
            views: {
                'menuContent': {
                    templateUrl: 'bankCard/bankCard.html',
                    controller: 'bankCardCtrl'
                }
            },
             cache: false,
         })
         .state('app.orderInfo', {
            url: '/orderInfo',
            views: {
                'menuContent': {
                    templateUrl: 'orderInfo/orderInfo.html',
                    controller: 'orderInfoCtrl'
                }
            },
             cache: false,
        })

     $urlRouterProvider.otherwise('/app/main');
 });