<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<% String version="0.1.2"; %>
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
  <meta http-equiv="pragma" content="no-cache">
  <meta http-equiv="cache-control" content="no-cache">
  <meta http-equiv="expires" content="0">
  <meta charset="utf-8">
  <title  >至诚金方医生工作室</title>
  <link href="vendor/ionic/css/ionic.min.css" rel="stylesheet">
  <link rel="stylesheet" href="dist/main.min.css?v=<%=version%>">
</head>
<body ng-app="starter">
  <ion-nav-view>
  </ion-nav-view>
  <div class="app-spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
</body>
<script>var $version="<%=version%>";</script>
<script src="vendor/jquery.min.js"></script>
<script src="vendor/ionic/js/ionic.bundle.min.js"></script>
<script src="vendor/angular-file-upload.min.js"></script>
<script src="vendor/md5.js"></script>
<script src="dist/template.tpl.js?v=<%=version%>"></script>
<script src="dist/main.min.js?v=<%=version%>"></script>
<script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
</html>

