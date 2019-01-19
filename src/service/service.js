app.factory("Toast", function($timeout, $ionicLoading) {
    return {
        show: function(content, _status) {
            var status = _status || 'info';
            if (status == 'error') {
                var _class = "icon ion-android-alert";
            } else if (status == "success") {
                var _class = "icon ion-android-alert";
            } else if (status == "info") {
                var _class = "icon ion-android-alert";
            }
            _class='icon';
            $ionicLoading.show({
                template: '<i class="' + _class + '">  ' + content + '</i>'
            });
            $timeout(function() { $ionicLoading.hide() }, 1500);
        }
    }
});

app.factory('Api', function($http, Toast, WAP_CONFIG, $q, $log, $loading, $timeout) {
    var _api = WAP_CONFIG;
    var endpoint = _api.host+_api.path;
    // public api  
    return {
        //发送服务器的域名+端口， 
        endpoint: endpoint,
        //post请求，第一个参数是URL，第二个参数是向服务器发送的参数（JSON对象），  loaderObj={back:true, content:'', icon:'', class:}
        post: function(url, data,loaderObj,header) {
            url = endpoint + url;
            var _timeout = 8000;
            var deferred = $q.defer();
            var header=header||'formdata';
            var tempPromise;
            //显示加载进度  
            if(loaderObj) $loading.show(loaderObj);
            //判断用户是否传递了参数，如果有参数需要传递参数  
            if (data&&header=='formdata') {
                tempPromise = $http({ method: 'POST', url:url, data:$.param(data), timeout: _timeout,headers:{'Content-Type': 'application/x-www-form-urlencoded'} });
            }
            
           else if (data&&header=='json') {
                tempPromise = $http({ method: 'POST', url:url, data:data, timeout: _timeout});
            }
             else {
                tempPromise = $http.post(url, { timeout: _timeout });
            }
            tempPromise.success(function(data, header, config, status) {
                deferred.resolve(data);
                 if(loaderObj)$loading.hide();
            }).error(function(msg, code) {
                if(loaderObj)  $loading.hide();
                deferred.reject(msg);
                $log.error(msg, code);
                var errorTitle;
                if (code == '-1') errorTitle = "请求超时,请检查你的网络连接情况";
                else if (code == "400") errorTitle = "错误的请求,请稍后再试";
                else if (code == "404") errorTitle = "404 Not Found,找不到该接口";
                else if (code == "500" || code == "502") errorTitle = "系统运行错误";
                else if (code == "503") errorTitle = "服务器错误";
                else errorTitle = "发生了未知错误,请稍后再试(code:"+code+")";
                Toast.show(errorTitle, "error");
                //todo 上报错误
            });
            return deferred.promise;
        },
        get: function(url, data,loaderObj) {
            url = endpoint + url;
            var _timeout = 8000;
            var deferred = $q.defer();
            var tempPromise;
            //显示加载进度  
            if(loaderObj) $loading.show(loaderObj);
            //判断用户是否传递了参数，如果有参数需要传递参数  
            if (data != null && data != undefined && data != "") {
                tempPromise = $http.get(url+"?"+$.param(data), { timeout: _timeout });
            } else {
                tempPromise = $http.get(url, { timeout: _timeout });
            }
            tempPromise.success(function(data, header, config, status) {
                deferred.resolve(data);
                 if(loaderObj)$loading.hide();
            }).error(function(msg, code) {
                if(loaderObj)  $loading.hide();
                deferred.reject(msg);
                $log.error(msg, code);
                var errorTitle;
                if (code == '-1') errorTitle = "请求超时,请检查你的网络连接情况";
                else if (code == "400") errorTitle = "错误的请求,请稍后再试";
                else if (code == "404") errorTitle = "404 Not Found,找不到该接口";
                else if (code == "500" || code == "502") errorTitle = "系统运行错误";
                else if (code == "503") errorTitle = "服务器错误";
                else errorTitle = "发生了未知错误,请稍后再试(code:"+code+")";
                Toast.show(errorTitle, "error");
                //todo 上报错误
            });
            return deferred.promise;
        }
    };
});

app.factory('$loading', function($ionicLoading) {
    return {
        show: function(jsonObj) {
            var obj={
                back:true,
                content:'加载中...',
                icon:'lines',
                class:'spinner-positive',
            };
            var jsonObj=$.extend( true, obj, jsonObj );
            var style =  jsonObj['back'] ? "<style>.loading-container .loading{background-color: rgba(0, 0, 0,0.6);}</style>" :
                "<style>.loading-container .loading{background-color: rgba(0, 0, 0,0.2);}</style>";
            $ionicLoading.show({
                template: style + '<ion-spinner icon="' +jsonObj['icon']  + '" class="' + jsonObj['class']  + '"></ion-spinner><div>' + jsonObj['content'] + '</div>',
                content: 'Loading',
                animation: '',
                showBackdrop: jsonObj['back'],
                minWidth: 500,
                showDelay: 0
            });
        },
        hide: function() {
            $ionicLoading.hide();
        }
    }
});
app.factory("$confirm", function($ionicPopup) {
    return {
        show: function(_callback,_option, _callback_cancle) {
            var option={
                title:'提示',
                content:'',
            };
            var option=$.extend( true,  option ,_option);
            var callback = _callback || function() {};
            var callback_cancle = _callback_cancle || function() {};
            var popup = $ionicPopup.confirm({
                template: option.content,
                title: option.title,
                buttons: [{
                    text: '确定',
                    type: 'button-positive',
                    onTap: function(e) {
                        return 1;
                    }
                }, {
                    text: '取消',
                    type: 'button-assertive',
                }]
            });
            popup.then(function(res) {
                if (res) {
                    callback();
                } else {
                    callback_cancle();
                }
            })
        },
    }
});


app.filter("beautyTime", function () {
    var formatDate = function (date, fmt) {
          date = date == undefined ? new Date() : date;
          date = typeof date == 'number' ? new Date(date) : date;
          fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
          var obj = {
            'y': date.getFullYear(),
            'M': date.getMonth() + 1,
            'd': date.getDate(), // 日期
            'q': Math.floor((date.getMonth() + 3) / 3),
            'w': date.getDay(), // 星期，注意是0-6
            'H': date.getHours(), // 24小时制
            'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
            'm': date.getMinutes(), // 分钟
            's': date.getSeconds(), // 秒
            'S': date.getMilliseconds() // 毫秒
          };
          var week = ['日', '一', '二', '三', '四', '五', '六'];
          for (var i in obj) {
            fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
              var val = obj[i] + '';
              if (i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
              for (var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
              return m.length == 1 ? val : val.substring(val.length - m.length);
            });
          }
          
          return fmt;
    }
    var func= function(_time) {
        var _date = new Date(_time);
        var nowDate=new Date();

        var lastDate=new Date();
        lastDate.setDate(lastDate.getDate()-1);

        var date_1=new Date(nowDate.getTime() + 24 * 60 * 60 * 1000 * (1- nowDate.getDay()));//本周星期一
        var date_7 = new Date(nowDate.getTime() + 24 * 60 * 60 * 1000 * (7- nowDate.getDay()));//本周周末
        //当天
        if (_date.toDateString()=== nowDate.toDateString()) {
          return formatDate(_date, 'HH:mm:ss');
        }
        //昨天
        else if (_date.toDateString()===lastDate.toDateString()){
            return '昨天 '+formatDate(_date, 'HH:mm:ss');
        }
        //本周
        else if (_time < date_7.getTime() && _time > date_1.getTime()) {
            return formatDate(_date, 'w HH:mm:ss');
        }
        //本月
        else if (_date.getMonth() == nowDate.getMonth() && _date.getFullYear() == nowDate.getFullYear()) {
            return formatDate(_date, 'MM-dd HH:mm:ss');
        } 
        //本年
        else if (_date.getFullYear() == new Date().getFullYear()) {
            return formatDate(_date, 'yyyy-MM-dd HH:mm:ss');
        }
        //非本年 
        else {
            return formatDate(_date, 'yyyy-MM-dd HH:mm:ss');
        }
  }
  return func;
})

app.filter('unescapeChar', function() {
    return function(msg) {
        if(!msg) return '';
        return unescape(msg.replace(/\\u/g, '\%u'));
    };
});

app.directive('ionMsg', function($compile, $emoji) {
    return {
        restrict: 'AE',
        scope: {
            msg: '='
        },
        link: function(scope, tElement, tAttrs) {
            var msg = scope.msg;
            var arr = msg.match(/\[.*?\]/g);
            for (var i in arr) {
                if (arr[i].length > 12) {
                    msg = msg.replace(arr[i], "<a href='http://image.tcmtrust.cn/" + arr[i].slice(1, -1) + "' target='_blank'><img style='float:right; max-width:200px; max-height:200px;' ng-src='http://image.tcmtrust.cn/" + arr[i].slice(1, -1) + "'>");
                } else {
                    msg = msg.replace(arr[i], "<img class='emoji' style='width:20px; height:20px;' ng-src='http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/" + $emoji.parse(arr[i]) + "' >");
                }
            }
            htmladd = "<div>" + msg + "</div>";
            $(tElement).append($compile(htmladd)(scope));
        },
    };
});




app.filter('str', function() {
    return function(input) {
         if(!input){
             return '- -';
         }else{
            return input;
         }
    }
})

   app.filter('valFilter', function () {
        return function (input, type) {
            switch (type) {
                case 'nickName':
                    input = input.replace(/\\/g, "%");
                    return unescape(input);
                    break;
                default :
                    if (input == ' ' || input == undefined || input == 'null' || input==null) {
                        return input = '无';
                    } else {
                        return input;
                    }
            }
        }
    })

app.factory('$emoji', function() {
    var emoji = { "[最右]": "c8/lxhzuiyou_thumb.gif", "[泪流满面]": "64/lxhtongku_thumb.gif", "[江南style]": "67/gangnamstyle_thumb.gif", "[偷乐]": "fa/lxhtouxiao_thumb.gif", "[加油啊]": "03/lxhjiayou_thumb.gif", "[doge]": "b6/doge_thumb.gif", "[喵喵]": "4a/mm_thumb.gif", "[笑cry]": "34/xiaoku_thumb.gif", "[xkl转圈]": "f4/xklzhuanquan_thumb.gif", "[微笑]": "5c/huanglianwx_thumb.gif", "[嘻嘻]": "0b/tootha_thumb.gif", "[哈哈]": "6a/laugh.gif", "[可爱]": "14/tza_thumb.gif", "[可怜]": "af/kl_thumb.gif", "[挖鼻]": "0b/wabi_thumb.gif", "[吃惊]": "f4/cj_thumb.gif", "[害羞]": "6e/shamea_thumb.gif", "[挤眼]": "c3/zy_thumb.gif", "[闭嘴]": "29/bz_thumb.gif", "[鄙视]": "71/bs2_thumb.gif", "[爱你]": "6d/lovea_thumb.gif", "[泪]": "9d/sada_thumb.gif", "[偷笑]": "19/heia_thumb.gif", "[亲亲]": "8f/qq_thumb.gif", "[生病]": "b6/sb_thumb.gif", "[太开心]": "58/mb_thumb.gif", "[白眼]": "d9/landeln_thumb.gif", "[右哼哼]": "98/yhh_thumb.gif", "[左哼哼]": "6d/zhh_thumb.gif", "[嘘]": "a6/x_thumb.gif", "[衰]": "af/cry.gif", "[委屈]": "73/wq_thumb.gif", "[吐]": "9e/t_thumb.gif", "[哈欠]": "cc/haqianv2_thumb.gif", "[抱抱]": "27/bba_thumb.gif", "[怒]": "7c/angrya_thumb.gif", "[疑问]": "5c/yw_thumb.gif", "[馋嘴]": "a5/cza_thumb.gif", "[拜拜]": "70/88_thumb.gif", "[思考]": "e9/sk_thumb.gif", "[汗]": "24/sweata_thumb.gif", "[困]": "40/kunv2_thumb.gif", "[睡]": "96/huangliansj_thumb.gif", "[钱]": "90/money_thumb.gif", "[失望]": "0c/sw_thumb.gif", "[酷]": "40/cool_thumb.gif", "[色]": "20/huanglianse_thumb.gif", "[哼]": "49/hatea_thumb.gif", "[鼓掌]": "36/gza_thumb.gif", "[晕]": "d9/dizzya_thumb.gif", "[悲伤]": "1a/bs_thumb.gif", "[泪]": "9d/sada_thumb.gif", "[偷笑]": "19/heia_thumb.gif", "[抓狂]": "62/crazya_thumb.gif", "[黑线]": "91/h_thumb.gif", "[阴险]": "6d/yx_thumb.gif", "[怒骂]": "60/numav2_thumb.gif", "[互粉]": "89/hufen_thumb.gif", "[心]": "40/hearta_thumb.gif", "[伤心]": "ea/unheart.gif", "[猪头]": "58/pig.gif", "[熊猫]": "6e/panda_thumb.gif", "[兔子]": "81/rabbit_thumb.gif", "[ok]": "d6/ok_thumb.gif", "[耶]": "d9/ye_thumb.gif", "[good]": "d8/good_thumb.gif", "[no]": "ae/buyao_org.gif", "[赞]": "d0/z2_thumb.gif", "[来]": "40/come_thumb.gif", "[弱]": "d8/sad_thumb.gif", "[草泥马]": "7a/shenshou_thumb.gif", "[神马]": "60/horse2_thumb.gif", "[囧]": "15/j_thumb.gif", "[浮云]": "bc/fuyun_thumb.gif", "[给力]": "1e/geiliv2_thumb.gif", "[围观]": "f2/wg_thumb.gif", "[威武]": "70/vw_thumb.gif", "[奥特曼]": "bc/otm_thumb.gif", "[礼物]": "c4/liwu_thumb.gif", "[钟]": "d3/clock_thumb.gif", "[话筒]": "9f/huatongv2_thumb.gif", "[蜡烛]": "d9/lazhuv2_thumb.gif", }
    return {
        parse: function(str) {
            return emoji[str];
        }
    }
});
app.factory('getage', function() {
    return {
        Age: function(strBirthday) {
            var returnAge;
            if (typeof(strBirthday) == 'string') {
                var strBirthdayArr = strBirthday.split("-");
                var birthYear = strBirthdayArr[0];
                var birthMonth = strBirthdayArr[1];
                var birthDay = strBirthdayArr[2];
            } else if (typeof(strBirthday) == 'number') {
                var birthYear = new Date(strBirthday).getFullYear();
                var birthMonth = new Date(strBirthday).getMonth() + 1;
                var birthDay = new Date(strBirthday).getDate();
            }
            d = new Date();
            var nowYear = d.getFullYear();
            var nowMonth = d.getMonth() + 1;
            var nowDay = d.getDate();

            if (nowYear == birthYear) {
                returnAge = 0; //同年 则为0岁
            } else {
                var ageDiff = nowYear - birthYear; //年之差
                if (ageDiff > 0) {
                    if (nowMonth == birthMonth) {
                        var dayDiff = nowDay - birthDay; //日之差
                        if (dayDiff < 0) {
                            returnAge = ageDiff - 1;
                        } else {
                            returnAge = ageDiff;
                        }
                    } else {
                        var monthDiff = nowMonth - birthMonth; //月之差
                        if (monthDiff < 0) {
                            returnAge = ageDiff - 1;
                        } else {
                            returnAge = ageDiff;
                        }
                    }
                } else {
                    returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
                }
            }

            return returnAge; //返回周岁年龄

        }
    }
});