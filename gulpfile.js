var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var htmlmin = require('gulp-htmlmin');
var webserver = require('gulp-webserver');
var watch = require('gulp-watch');
var stripDebug = require('gulp-strip-debug');
var jshint = require('gulp-jshint');
var htmlJs = require("gulp-ng-html2js");


var $path = "./";


//合并编译scss
gulp.task('scss', function (done) {
    console.log("---------------------- _scss TASK");
    gulp.src($path + 'src/page/**/*.scss')
        .pipe(concat('main.scss'))
        .pipe(sass())
        .on('error', sass.logError)
        // .pipe(gulp.dest($path + '/dist/'))
        .pipe(cleanCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest($path + '/dist/'))
        .on('end', done);
});


//合并压缩js
gulp.task('script', function (done) {
    console.log("----------------------_script TASK");
    gulp.src([$path + '/src/app.js', $path + '/src/config.dev.js', $path + '/src/router.js', $path + '/src/directive/**/*.js', $path + '/src/service/**/*.js', $path + '/src/page/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(ngAnnotate({ single_quotes: true }))
        // .pipe(gulp.dest($path + '/dist'))
        .pipe(stripDebug())
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest($path + '/dist'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest($path + '/dist'))
        .on('end', done);
});

// 合并模板文件
gulp.task('tpl', function () {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: false, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: false, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    return gulp.src($path + '/src/page/**/*.html')
        .pipe(htmlmin(options))
        .pipe(htmlJs({
            moduleName: 'template-app'
        }))
        .pipe(concat('template.tpl.js'))
        .pipe(uglify())
        .pipe(gulp.dest($path + '/dist'))

});


// gulp 自带的watch
gulp.task('w', function () {
    console.log("----------------------w TASK");
    gulp.watch([$path + '/src/page/**/*.html'], ['tpl']);
    gulp.watch([$path + '/src/page/**/*.scss'], ['scss']);
    gulp.watch([$path + '/src/**/*.js'], ['script']);
});


gulp.task('watch', function () {
    console.log("---------------------- _w TASK");
    watch([$path + '/src/page/**/*.scss'], function () {
        gulp.run("scss");
    });
    watch([$path + '/src/page/**/*.html'], function () {
        gulp.run("tpl");
    });
    watch([$path + '/src/**/*.js'], function () {
        gulp.run("script");
    });

});


//重新编译ionic的scss
gulp.task('_ionic_scss', function (done) {
    console.log("---------------------- _ionic_scss TASK");
    gulp.src($ionic_path)
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest($path + '/src/lib/ionic/css/'))
        .pipe(cleanCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest($path + '/src/lib/ionic/css/'))
        .on('end', done);
});


//新建一个ionic页面
gulp.task('page', function () {
    const fs = require('fs');

    function add(path, fileName, data) {
        if (!fs.existsSync(path)) fs.mkdirSync(path);
        fs.writeFileSync(path + '' + fileName, data);
    }

    var pageName = process.argv.slice(2)[2];
    var dirPath = $path + 'src/page/' + pageName + '/';
    var obj = {
        html: {
            path: dirPath,
            file: pageName + '.html',
            content: `<ion-header-bar>
    <button ng-click="$back()" class="button back-button button-stable buttons button-clear  header-item"><i class="icon ion-android-arrow-back"></i>
        </button>
    <h1 class="title" align-title="center">${pageName}</h1>
</ion-header-bar>
<ion-content delegate-handle="${pageName}-scroll" class="page-${pageName}">
</ion-content>`,
        },
        scss: {
            path: dirPath,
            file: pageName + '.scss',
            content: `.page-${pageName}{
  
}`
        },
        js: {
            path: dirPath,
            file: pageName + '.js',
            content: `app.controller("${pageName}Ctrl", function($rootScope,$location,$ionicScrollDelegate, $scope,Api,Toast,$sessionStorage,$localStorage) {
    function init() {

    }
    init();
});`
        }
    }
    add(obj.js.path, obj.js.file, obj.js.content);
    add(obj.scss.path, obj.scss.file, obj.scss.content);
    add(obj.html.path, obj.html.file, obj.html.content);
});


gulp.task("build", function () {
    // 拷贝目录
    gulp.src(['index.jsp', 'index.html'])
        .pipe(gulp.dest($path + 'www'))
    gulp.src([$path + 'assets/**/*'])
        .pipe(gulp.dest($path + 'www/assets'))
    gulp.src([$path + 'vendor/**/*'])
        .pipe(gulp.dest($path + 'www/vendor'))

    //压缩模板
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: false, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: false, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    gulp.src($path + '/src/page/**/*.html')
        .pipe(htmlmin(options))
        .pipe(htmlJs({
            moduleName: 'template-app'
        }))
        .pipe(concat('template.tpl.js'))
        .pipe(uglify())
        .pipe(gulp.dest($path + '/www/dist'));

    //编译scss
    gulp.src($path + 'src/page/**/*.scss')
        .pipe(concat('main.scss'))
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(cleanCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest($path + '/www/dist'));

    //压缩 js
    gulp.src([$path + '/src/app.js', $path + '/src/config.pro.js', $path + '/src/router.js', $path + '/src/directive/**/*.js', $path + '/src/service/**/*.js', $path + '/src/page/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(ngAnnotate({ single_quotes: true }))
        .pipe(stripDebug())
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest($path + '/www/dist'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest($path + '/www/dist'));

});
gulp.task("dev", ["tpl", "scss", "script"]);


gulp.task('serve', function () {
    gulp.run("dev");
    gulp.run("watch");
    gulp.src($path + '/')
        .pipe(webserver({
            port: 8080, //端口
            host: '192.168.2.102', //域名
            open: true,
            livereload: true, //实时刷新代码。不用f5刷新
            directoryListing: {
                path: $path + '/',
                enable: true
            },
            proxies: [
                { source: '/medicalsys', target: 'http://120.76.157.64:8082/medicalsys' },
            ]
        }))
});

//本地测试线上域名情况
//在host文件 添加 127.0.0.1 weixin.tcmtrust.cn 
gulp.task('production', function () {
    gulp.run("build");
    gulp.src($path + '/www/')
        .pipe(webserver({
            port: 80, //端口
            host: 'weixin.tcmtrust.cn', //域名
            open: true,
            livereload: true, //实时刷新代码。不用f5刷新
            proxies: [
                { source: '/medicalsys', target: 'http://120.76.157.64:8082/medicalsys' },
            ]
        }))
});