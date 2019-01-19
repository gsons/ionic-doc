app.controller("chatCtrl", function ($window, $state, WAP_CONFIG, $timeout, $confirm, $filter, $state, $ionicScrollDelegate, $interval, Api, $http, Toast, $scope, $localStorage, $sessionStorage, $rootScope, $loading, $location) {
    init();
    //获取历史聊天记录 
    function getChatMsgList(sendId, recvid) {
        var param = {
            page: 1,
            start: 0,
            limit: $scope.limit,
            sendId: sendId,
            recvId: recvid,
            reads: '0,1'
        };
        Api.post('webchat/chatmsg/getChatMsgList', param).then(function (data) {
            if (data.success) {
                $scope.chatMsgList = data.roots;
                $scope.totalPage = Math.ceil(data.total / $scope.limit);
                toBottom();
            } else {
                Toast.show('获取历史聊天记录失败!');
            }
        });
    }
    $scope.scroll = function () {
        var content = $ionicScrollDelegate.$getByHandle('chat-scroll');
        var pos = content.getScrollPosition();
        if (pos.top < 50 && $scope.refreshComplete) {
            $scope.doRefresh();
        }
    }

    $scope.doRefresh = function () {
        $scope.refreshComplete = false;
        $scope.isrefreshIcon = true;//是否显示加载图标
        $scope.page++;
        if ($scope.page > $scope.totalPage) { 
            $scope.isrefreshIcon = false;
           return;
        }
        $scope.start += $scope.limit;
        var param = {
            page: $scope.page,
            start: $scope.start,
            limit: $scope.limit,
            sendId: $scope.studioId,
            recvId: $scope.chatuser.id,
            reads: '0,1'
        };
        var _success = function (data) {
            if (data.success) {
                if (data.roots && data.roots.length > 0) {
                    $scope.chatMsgList = $scope.chatMsgList.concat(data.roots);
                } else {

                }
            }
            $scope.isrefreshIcon = false;
        };
        var _error = function () {
            $scope.isrefreshIcon = false;
        };
        var _finally = function () {
            $scope.isrefreshIcon = false;
            $ionicScrollDelegate.$getByHandle('chat-scroll').scrollTo(0, 180, true)
            $timeout(function () { $scope.refreshComplete = true; }, 300)
        };
        Api.post('webchat/chatmsg/getChatMsgList', param).then(_success, _error).finally(_finally);
    }
    //这里监听消息列表是否渲染完后平滑滚动到底部
    function toBottom() {
        var timer = $interval(function () {
            $ionicScrollDelegate.$getByHandle('chat-scroll').resize();
            $ionicScrollDelegate.$getByHandle('chat-scroll').scrollBottom();
            if ($("#chat-content div.item-msg").length == $scope.chatMsgList.length) $interval.cancel(timer);;
        }, 500);
    }

    function init() {
        initWxRecord();
        $scope.doctor = $localStorage.doctor;
        $scope.chatuser = $sessionStorage.chatuser;
        $scope.chatMsgList = [];
        if (!$scope.doctor || !$scope.chatuser) {
            $state.go("app.main", { reload: true });
            return;
        }
        $scope.page = 1; $scope.start = 0; $scope.limit = 10; $scope.refreshComplete = true; $scope.isShowVoice = false;

        $scope.doctor.imgUrl = "http://image.tcmtrust.cn" + $scope.doctor.path;
        $scope.studioId = $localStorage.doctor.studioId;
        getChatMsgList($scope.studioId, $scope.chatuser.id);
        initWs();
        initSendImg();
        initWord();
        $scope.voiceCssArr = ['voice0', 'voice1', 'voice2'];
    }

    function initSendImg() {
        $('#input_img').click(function () {
            if (!$rootScope.$ws) return;
            document.getElementById("load_img").click();
        });
        $("#load_img").on('change', function () {
            var myform = new FormData();
            myform.append('file', $('#load_img')[0].files[0]);
            myform.append('userId', $localStorage.user.id);
            $loading.show({ content: '图片发送中...' });
            $http({
                method: 'post',
                url: WAP_CONFIG.host + '/medicalsys/empPatient/attchements/upLoadImageIO',
                headers: { 'Content-Type': undefined },
                data: myform,
                transformRequest: angular.identity
            }).success(function (data) {
                $loading.hide();
                if (data.success) {
                    $scope.sendImg(data.data.path);
                } else {
                    Toast.show('发送图片失败,' + data.errorMessage);
                }
            }).error(function (data, code) {
                $loading.hide();
                console.log(data);
                Toast.show('发送图片出错了!');
            });
        });
    }

    $scope.togleShowTool = function () {
        $("#chat-tool").slideToggle();
        $("#chat-word-list").fadeOut();
    }
    $scope.focus = function () {
        hideAll(); toBottom();
    }

    window.onresize = function () {
        toBottom();
    }

    function initWs() {
        if ($rootScope.$ws) $rootScope.$ws.close();
        var ws_addr = "ws://weixin.tcmtrust.cn/ws2/medicalsys/chatSocket?userId=" + $localStorage.doctor.studioId + "&userName=" + $localStorage.doctor.name + "&fromType=1&toId=" + $scope.chatuser.id + "&fromStudioName=" + $localStorage.doctor.studioName;
        if ('WebSocket' in window) {
            $rootScope.$ws = new WebSocket(ws_addr);
        } else if ('MozWebSocket' in window) {
            $rootScope.$ws = new MozWebSocket(ws_addr);
        } else {
            Toast.show("你的浏览器版本过低不支持聊天功能！");
            $location.path("/app/drlist");
        }
        $rootScope.$ws.onopen = function () {
            console.log('欢迎进入聊天室~');
        }
        $rootScope.$ws.onmessage = function (msg) {
            var result = $.parseJSON(msg.data);
            if ((result.from != undefined && result.sendType == 1) || result.from != undefined && result.sendType == 2|| result.from != undefined && result.sendType == 4) {
                var msg = {
                    createDate: new Date(result['date']).getTime(),
                    content: result['sendMsg'],
                    contentType: result['sendType'],
                    sendId: result['from'],
                    sender: result['fromStudioName'],
                    sendTime: result['date'],
                    recvId: result['toUserId'],
                    receiver: result['toUserName'],
                    userType: result['userType'],
                    time: result['time'],
                }
                $scope.chatMsgList.push(msg);
                toBottom();
            }
        }
        $rootScope.$ws.onclose = function () {
            console.log('离开聊天室');
        }
        $rootScope.$ws.onerror = function () {
            Toast.show('您已经离线，请返回重新连接~');
        }
        window.onbeforeunload = function () {
            console.log("onbeforeunload事件监听，关闭Scoket！");
            if ($rootScope.$ws) $rootScope.$ws.close();
        }
    }

    $scope.closeChat = function () {
        if (!$rootScope.$ws) return;
        var json = JSON.stringify({
            id: $localStorage.doctor.studioId,
            name: $localStorage.doctor.studioId,
            toUserId: $scope.chatuser.id,
            chatType: 1,
            userType: 1,
            act: 'stopsay',
            msg: ''
        });
        $rootScope.$ws.send(json);
        $rootScope.$ws.close();
        $window.history.back();
    }

    //发送文字
    $scope.send = function () {
        if (!$rootScope.$ws) return;
        var msg = $scope.msg;
        if (msg == '' || msg == undefined) {
            //
        } else {
            msg = escape(msg).replace(/\%u/g, '\\u');
            var obj = null;
            obj = {
                to: $scope.chatuser.id,
                toUserId: $scope.chatuser.id,
                toUserName: $scope.chatuser.sender,
                fromStudioName: $localStorage.doctor.studioName,
                userId: $localStorage.doctor.studioId,
                fromType: 0,
                msg: msg,
                imgtype: 1, //发送的是文字
                type: 2, // 单聊
                titleId: "",
                userType: 1
            };
            var str = JSON.stringify(obj);
            $rootScope.$ws.send(str);
            $scope.msg = '';
        }
        hideAll();
    }


    //发送图片
    $scope.sendImg = function (img_path) {
        var val = img_path; //图片路径
        var obj = null;
        obj = {
            to: $scope.chatuser.id,
            toUserId: $scope.chatuser.id,
            toUserName: $scope.chatuser.sender,
            fromStudioName: $localStorage.doctor.studioName,
            userId: $localStorage.doctor.studioId,
            fromType: 0,
            msg: val,
            imgtype: 2, //发送的是图片
            type: 2, // 单聊
            titleId: "",
            userType: 1
        };
        var str = JSON.stringify(obj);
        $rootScope.$ws.send(str);
        hideAll();
    }

    //发送排班
    $scope.sendPaiban = function () {
        $confirm.show(
            function () {
                sendOnlineSchedule();
            }, { title: "确定要发送排班吗?", content: "发送排班给患者完成线上预约后，请在首页->预约信息中选择预约信息进行诊断开方" });
    }
    function sendOnlineSchedule() {
        if (!$rootScope.$ws) { $state.go("app.drlist") };
        var now = new Date();
        var weekDay = new Date(now).getDay();
        var hour = new Date(now).getHours();
        var dateStr = $filter('date')(now, 'yyyy-MM-dd');
        var formData = {};
        if (0 <= hour && hour < 12) {
            var timetype = "0";
            var timeTypeText = "早上";
            formData.startTime = 'MORN_STARTTIME.1';
            formData.endTime = 'MORN_ENDTIME.13';
        }
        if (12 <= hour && hour < 13) {
            var timetype = "1";
            var timeTypeText = "中午";
            formData.startTime = 'NOON_STARTTIME.1';
            formData.endTime = 'NOON_ENDTIME.2';
        }
        if (13 <= hour && hour < 18) {
            var timetype = "2";
            var timeTypeText = "下午";
            formData.startTime = 'PM_STARTTIME.1';
            formData.endTime = 'PM_ENDTIME.12';
        }
        if (18 <= hour && hour < 24) {
            var timetype = "3";
            var timeTypeText = "晚上";
            formData.startTime = 'NIGHT_ENDTIME.1';
            formData.endTime = 'NIGHT_ENDTIME.8';
        }

        switch (weekDay) {
            case 0:
                formData.weekNum = "WEEK.0";
                formData.name = "周日" + timeTypeText;
                break;
            case 1:
                formData.weekNum = "WEEK.1";
                formData.name = "周一" + timeTypeText;
                break;
            case 2:
                formData.weekNum = "WEEK.2";
                formData.name = "周二" + timeTypeText;
                break;
            case 3:
                formData.weekNum = "WEEK.3";
                formData.name = "周三" + timeTypeText;
                break;
            case 4:
                formData.weekNum = "WEEK.4";
                formData.name = "周四" + timeTypeText;
                break;
            case 5:
                formData.weekNum = "WEEK.5";
                formData.name = "周五" + timeTypeText;
                break;
            case 6:
                formData.weekNum = "WEEK.6";
                formData.name = "周六" + timeTypeText;
                break;
        }
        formData.studioId = $localStorage.doctor.studioId;
        formData.appplace = "";
        formData.appDateTime = dateStr;
        formData.timeType = timetype;
        formData.status = 5;
        formData.reservationNum = 1;
        formData.isFix = 0;
        formData.orgId = '4028c0835db07eca015db08d5a35006c'; //线上门店ID
        Api.post('doctors/studioScheduleDetail/saveStudioSchedulesForOnline', formData).then(function (data) {
            if (data) {
                $scope.paibanid = data.data.id;
                val = "在线排班" + data.data.name + "(点击预约)";
                obj = {
                    to: $scope.chatuser.id,
                    toUserId: $scope.chatuser.id,
                    toUserName: $scope.chatuser.sender,
                    fromStudioName: $localStorage.doctor.studioName,
                    userId: $localStorage.doctor.studioId,
                    fromType: 0,
                    msg: val,
                    imgtype: 1,
                    type: 2,
                    titleId: $scope.paibanid,
                    userType: 1
                };
                var str = JSON.stringify(obj);
                $rootScope.$ws.send(str);
            } else {
                Toast.show('发送在线排班失败,' + data.errorMessage);
            }
        });
        hideAll();
    }

    function initWord() {
        $scope.uMsg = [{
            text: "您好！"
        }, {
            text: "您好，请问您身体哪里不舒服？"
        }, {
            text: "您好，请告诉我您的性别、年龄、身高及体重。"
        }, {
            text: "您平日胃口怎么样？有偏重哪个口味的食物吗？"
        }, {
            text: "您有喝酒、抽烟吗？"
        }, {
            text: "会经常感觉口渴吗？您的饮水情况怎么样？"
        }, {
            text: "您几天一次大便或一天几次大便？"
        }, {
            text: "您睡眠情况怎么样？（半夜醒来？很难入睡？)"
        }, {
            text: "早上睡醒后精神怎么样？"
        }, {
            text: "您经常感觉怕风怕冷吗？"
        }, {
            text: "您容易出汗吗？"
        }, {
            text: "您这种情况持续多久了？"
        }, {
            text: "您以前有得过什么病吗？"
        }, {
            text: "您这次生病前有吃过什么药吗？"
        }, {
            text: "您有对什么药物或食物过敏吗？"
        }];
    }

    $scope.selectWord = function (word) {
        $scope.msg = word;
        $scope.send();
        hideAll();
    }
    function hideAll() {
        $("#chat-tool").slideUp();
        $("#chat-word-list").fadeOut();
    }
    $scope.toggleWordList = function () {
        $("#chat-word-list").fadeToggle();
    }


    function initWxRecord() {
        var url = window.location.href;
        var path = url.split("#")[0];
        Api.get('paysys/wechat/getPackageValue', { type: 0, path: path }).then(function (data) {
            $scope.wxJssdk = data;
            wx.config({
                debug: false,
                appId: $scope.wxJssdk.appId,
                timestamp: $scope.wxJssdk.timeStamp,
                nonceStr: $scope.wxJssdk.nonceStr,
                signature: $scope.wxJssdk.paySign,
                jsApiList: ['onMenuShareAppMessage', 'onVoicePlayEnd','onMenuShareTimeline', 'chooseImage', 'openLocation','startRecord','stopRecord','playVoice','uploadVoice','downloadVoice','pauseVoice','stopVoice']
            });
        });

        wx.ready(function () {
            wx.startRecord({
                success: function () {
                    wx.stopRecord();
                },
                cancel: function () {
                    Toast.show('你拒绝了授权使用录音功能');
                }
            });
        });

    }

    $scope.stopVoice = function (voiceId) {
        console.log('stopVoice暂停播放!');
        if (voiceId) wx.stopVoice({ localId: voiceId });
        if (voiceId) wx.pauseVoice({ localId: voiceId });
        if ($scope.voiceInterval) $interval.cancel($scope.voiceInterval);
        $scope.currentVoiceId = undefined;
        $scope.voiceCss = $scope.voiceCssArr[2];
    }

    $scope.playVoice = function (msg) {
        var voiceId = msg.content;
        //再次点击播放 停止播放
        if (voiceId == $scope.currentVoiceId) {
            $scope.stopVoice($scope.currentVoiceId);
            return;
        }
        if ($scope.currentVoiceId) {
            $scope.stopVoice($scope.currentVoiceId);
        }

        //显示播放动画
        $scope.voiceCss = $scope.voiceCssArr[0];
        var i = 0;
        $scope.voiceInterval = $interval(function () {
            $scope.voiceCss = $scope.voiceCssArr[i];
            i++; if (i > 2) i = 0;
        }, 300)
        //停止播放
        $timeout(function () {
            $scope.stopVoice($scope.currentVoiceId);
        }, msg.time * 1000 + 500);

        $scope.currentVoiceId = voiceId;
        wx.downloadVoice({
            serverId: voiceId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
            isShowProgressTips: 0, // 默认为1，显示进度提示
            success: function (res) {
                var localId = res.localId; // 返回音频的本地ID
                wx.playVoice({
                    localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
                });
            },
            fail: function (err) {
                $scope.$apply(function () {
                    $scope.stopVoice($scope.currentVoiceId);
                });

            }
        });

        // 监听语音播放完毕
        wx.onVoicePlayEnd({
            serverId: voiceId,
            success: function (res) {
                console.error(res);
                $scope.$apply(function () {
                    $scope.stopVoice($scope.currentVoiceId);
                });
            },
            fail: function (err) {
                console.error(err);
                $scope.$apply(function () {
                    $scope.stopVoice($scope.currentVoiceId);
                });

            }
        });
    }

    $scope.toggleVoiceBtn = function () {
        $scope.isShowVoice = !$scope.isShowVoice;
        if ($scope.isShowVoice) {
            $scope.msg = '';
        } else {
            $('#rj-footer-input').focus();
        }
    }
    //按下开始录音
    $scope.tape = function () {
        console.info('开始录音');
        event.preventDefault();
        wx.startRecord();
        $scope.showVoiceLoading = true;
        $scope.distance = 0;
        $scope.time1 = new Date().getTime();
    }

    //计算滑动距离
    $scope.calcDistance = function ($event) {
        $scope.distance = Math.abs($event.gesture.deltaY);
    }

    $scope.sendVoice = function () {
        //发送语音
        console.log('录音结束并上传');
        $scope.showVoiceLoading = false;
        $scope.time2 = new Date().getTime();
        wx.stopRecord({
            success: function (res) {
                if ($scope.distance > 50) {
                    Toast.show('你已经取消发送录音!');
                    return;
                }
                else if ($scope.time2 - $scope.time1 < 1000) {
                    Toast.show('录音时间过短!');
                    return;
                }
                else if ($scope.time2 - $scope.time1 > 59000) {
                    Toast.show('录音时间不能超过一分钟!');
                    return;
                }

                console.log('录音返回的数据:', res);
                wx.uploadVoice({
                    localId: res.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                    isShowProgressTips: 0,// 默认为1，显示进度提示
                    success: function (res) {
                        var serverId = res.serverId; // 返回音频的服务器端ID
                        console.log('上传返回的数据:' + JSON.stringify(res))
                        uploadVoiceInfo(serverId, $scope.time2 - $scope.time1);
                    }
                });
            }
        });


    }

    //发送录音信息
    function uploadVoiceInfo(voiceId, time) {
        var obj = {
            to: $scope.chatuser.id,
            toUserId: $scope.chatuser.id,
            toUserName: $scope.chatuser.sender,
            fromStudioName: $localStorage.doctor.studioName,
            userId: $localStorage.doctor.studioId,
            fromType: 0,
            msg: voiceId,
            imgtype: 4,
            time: Math.floor(time / 1000),
            type: 2,
            titleId: '',
            userType: 1
        };
        var str = JSON.stringify(obj);
        $rootScope.$ws.send(str);
    }

});

