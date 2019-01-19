app.constant('WAP_CONFIG', {
        host: 'http://weixin.tcmtrust.cn',
        path: '/medicalsys/',
        platform: 'browser' // 
    });
app.factory('$exceptionHandler', function ($log, $injector) {
        return function myExceptionHandler(exception, cause) {
            var exception={
                string: exception.toString(),
                message: exception.message,
                lineNumber: exception.lineNumber,
                stack: exception.stack,
                cause: cause
            };
            $.ajax({
                url:'http://users.tcmtrust.com/index.php/Home/public/addLog',
                method:'POST',
                data:{error:localStorage.getItem('ngStorage-username')+': '+JSON.stringify(exception)}
            })
        };
    });