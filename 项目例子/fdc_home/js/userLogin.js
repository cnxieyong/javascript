"use strict";
/**
 * n cookie名称
 * v 值
 * e 失效时间
 * p 路径
 * d 域名
 * s 大小
 * @type {Object}
 */
// jQuery.support.cors = true;
var curbody=jQuery('body');

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:s=s.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));    for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

var uc_cookie={
  //读取COOKIES,n为COOKIE名
  Get:function(n){
    var re=new RegExp(n+'=([^;]*);?','gi');
    var r=re.exec(document.cookie)||[];
    return (r.length>1?r[1]:null)
  },
  Get1:function(n){
    var re=new RegExp(n+'=([^;]*);?','gi');
    var r=re.exec(document.cookie)||[];
    return unescape(r.length>1?r[1]:null)
  },
  //写入COOKIES,n为Cookie名，v为value
  Set:function(n,v,e,p,d,s){
    var t=new Date;
    d = d || '.fdc.com.cn';
    if(e){
      // 8.64e7 一天 3.6e6 一小时
      t.setTime(t.getTime() + (e*3.6e6));
    }
    document.cookie=n+'='+v+'; '+(!e?'':'; expires='+t.toUTCString())+(!p?'':'; path='+p)+(!d?'':'; domain='+d)+(!s?'':'; secure') // Set cookie
  },
  Set1:function(n,v,e,p,d,s){
    var t=new Date;
    p = p ||'/';
    d = d || '.fdc.com.cn';
    if(e){
      // 2.592e9一个月  8.64e7 一天 3.6e6 一小时
      t.setTime(t.getTime() + (e*8.64e7));
    }
    document.cookie=n+'='+escape(v)+'; '+(!e?'':'; expires='+t.toUTCString())+(!p?'':'; path='+p)+(!d?'':'; domain='+d)+(!s?'':'; secure') // Set cookie
  },
  Del:function(n,p,d){
    var t=uc_cookie.Get(n);
    p = p ||'/';
    d = d || '.fdc.com.cn';
    document.cookie=n+'='+(!p?'':'; path='+p)+(!d?'':'; domain='+d)+'; expires=Thu, 01-Jan-70 00:00:01 GMT';
    return t
  }
};
/**
 * shunzizhan 20150121
 * 关于下列列表登录的一些链接
 * @type {Object}
 */
var configparams={
  // 忘记密码
  forGotPwd:"http://test.uc.fdc.com.cn/app/reggetpwd.html",
  // QQ登录
  // trdQQ:"http://192.168.20.36:8888/app/reg3rd.html",
  // // 微信登录
  // trdWX:"http://192.168.20.36:8888/app/reg3rd.html",
  // // 微博登录
  // trdWB:"http://test.uc.fdc.com.cn/app/reg3rd.html",
  // 登录后用户的快捷菜单
  dropdownMenu:[{
    url:"http://test.uc.fdc.com.cn/app/home.html",
    ico:"ar ar-home-full",
    name:"主页"
  },{
    url:"http://test.uc.fdc.com.cn/app/fdcmyactivity.html#2",
    ico:"ar ar-user-full",
    name:"我的亿房"
  },{
    url:"http://test.uc.fdc.com.cn/app/csbaseinfo.html",
    ico:"ar ar-set-c",
    name:"账号设置"
  },{
    url:"javaScript:void(0)",
    ico:"ar ar-sign-out",
    name:"退出"
  }],
  nickname:['龙傲天','花仙儿','樱桃小丸子','邻家那个小屁孩']
}


/**
 * shunzizhan 20160122
 * 解析缓存，获取参数
 * @type {Object}
 */
var getParams={
  // 获取数组
  arr:function(str) {
    var mParams = str.split(',')|| [];
    var params = [];
    for(var i=0; i<mParams.length; i++){
      params.push(getParams.obj(mParams[i]));
    }
    return params;
  },
  // 获取对象
  obj:function(str){
    var myobj={};
    var ss = str.split("&")||[];
    for(var j=0;j<ss.length;j++){
      var tt=ss[j].split("=")||[];
      if(tt.length >= 2){
        myobj[tt[0]] = decodeURIComponent(tt[1]);
      }
    }
    return myobj;
  }
}

var configTool = {
  /**
  * 根据时间戳(秒)生成时间 1436412956699 -> 2015-07-09 12:00:00
  * @param  {[int]} d [时间戳]
  */
  getFullDate: function(d){
    if(typeof d != "number"){
      d = parseInt(d) * 1000;
    }
    return d ? new Date(d).Format("yyyy-MM-dd hh:mm:ss") : "0000-00-00 00:00:00";
  },
  /**
   * shunzizhan 20160215
   * @param  {[string]} method [接口名称 形式为a.b.c]
   * @return {[type]}        [description]
   */
  getSuccessMethod: function(method){
    var str_tempmethod = method.substring(method.indexOf(".")+1);
    str_tempmethod = str_tempmethod.replace(/\./g, "_");
    str_tempmethod += "_response";
    return str_tempmethod;
  },
  /**
   * shunzizhan 20160215
   * 请求的通用方法
   * @param  {[string]}   method   [请求的接口名称]
   * @param  {[string]}   type     [请求的类型，默认为get]
   * @param  {[obj]}   params   [请求的参数]
   * @param  {Function} callback [回调函数]
   * @return {[type]}            [description]
   */
  ajax1: function(method, type, params, callback){
    params = jQuery.extend(params, {
      method : method,
      timestamp : configTool.getFullDate(new Date().getTime())
    });
    params.v = params.v || 1000 ;
    var successResponse = configTool.getSuccessMethod(method);
    if (params.requrl) {
      var url = params.requrl;
      delete params.requrl;
      configTool.normalajax(type, url, params, successResponse, callback);
    }else{
      configTool.ucajax(type, url, params, successResponse, callback);
    }
  },
  // 请求接口在用户中心当中
  ucajax:function(type, url, params, successResponse, callback){
    jQuery.ajax({
      async:false,
      // url: url || "http://test.uc.fdc.com.cn/router/rest",
      url:url || "http://gw.fdc.com.cn/router/rest",
      type: "GET",
      dataType: 'jsonp',
      jsonp: 'uccallback',
      data: params,
      timeout: 5000,
      success: function(res) {//客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
        if(callback){
          callback(res,successResponse);
        }
      },
      error: function(res){
        //jsonp 方式此方法不被触发.原因可能是dataType如果指定为jsonp的话,就已经不是ajax事件了
        //请求出错处理
        console.log(params.method+">>"+res.responseText)
      }
    });
  },
  // 请求接口在非用户中心当中
  normalajax:function(type, url, params, successResponse, callback){
    jQuery.ajax({
      type: type || "Get",
      url: url || "http://test.uc.fdc.com.cn/router/rest",
      data: params,
      dataType: "json",
      success: function(res){
        if(callback){
          callback(res,successResponse);
        }
      },
      error: function(res){
        // tool.confirm(res.responseText);
        console.log(params.method+">>"+res.responseText)
      }
    });
  },
  showError: function(res){
    // tool.confirm("错误码：" + res.error_response.code+"<br/>"+ res.error_response.msg + res.error_response.sub_code);
    console.log("错误码：" + res.error_response.code+"<br/>"+ res.error_response.msg + res.error_response.sub_code);
  },
  //20160408 消息数量
  getMsg:function(searchparam){
    configTool.ajax1("ucaction.user.unreadmsgcount","Get",searchparam,function(res,success){
      if(res[success]){
        if(res[success].data>0){
          $(".login .email-num").text(res[success].data).show();
        }else{
          $(".login .email-num").text('0').hide();
        }
      }else{
        console.log("用户中心》我的消息："+res);
        // tool.showError(res);
      }
    })
  },
  // 20160408 安全等级
  getSecurityLevel:function(searchparam){
    configTool.ajax1("ucaction.user.getsecuritylevel","Get",searchparam,function(res,success){
      if(res[success]){
        $('.safety-box').removeClass().addClass('safety-box safety-'+res[success].data);
        jQuery(".member-safety-rate").removeClass().addClass('member-safety-rate rate-'+ res[success].data);
      }else{
        console.log("用户中心》安全等级："+res);
      }
    })
  },
  /**获取用户的积分*/
  getWealth:function(searchparam){
    configTool.ajax1("ucaction.user.wealth.value.show","Get",searchparam,function(res,success){
      if(res[success]){
        configTool.updateWealth(res[success].data);
      }else{
        console.log("用户中心》积分酷币："+res);
        // tool.showError(res);
      }
    })
  },
  updateWealth:function(data){
    for(var i=0;i<data.length;i++){
      if(data[i].wealthType=="01"){
        $('.integral').text(data[i].wealthValue);
      }else{
        $('.ku-coin').text(data[i].wealthValue);
      }
    }
  }
}

/**
* shunzizhan 20160122
* 用户信息系列
* @type {Object}
*/
var optionUserInfo={
  /**
   * 通过uid获取用户的基本信息
   * @param  {[obj]} myparams [uid:userid]
   * @return {[type]}          [description]
   */
  getUserInfoById:function(myparams){
    configTool.ajax1("ucaction.login.autologin","Get",myparams,function(res,success){
      if(res[success]){
        optionUserInfo.updateUserInfo(res[success].data);
        if(myparams.curUrl){
          // window.location.href = myparams.curUrl+"#1";
          window.location.href = myparams.curUrl;
        }
      }else{
        configTool.showError(res);
        uc_cookie.Del("uc_userInfo");
        uc_cookie.Del("uc_token");
        optionUserInfo.createUser();
      }
    })
  },
  /**
   * shunzizhan 20160122
   * 用户通过用户名 密码登录
   * @param  {[obj]} myparams [用户名 密码 是否自动登录]
   * @return {[type]}          [description]
   */
  getUserInfo:function(myparams){
    // console.log(myparams);
    // myparams = jQuery.extend(myparams , {invaliddata:new Date().getTime()});
    jQuery('.btn-dropdown-login').text('正在登录中……');
    configTool.ajax1("ucaction.login.normal.login","Get",myparams,function(res,success){
      if(res[success]){
        // 登录成功 影藏登录面板
        jQuery(".dropdown-login").hide();
        // 更新页面上的用户信息
        // optionUserInfo.updateUserInfo(res[success].data);
        // 将个人信息写人到cookie
        optionUserInfo.writeUserCookie(res[success].data);
        jQuery('.btn-dropdown-login').text('登录');
        window.location.reload();
        // 将用户的uid写入到cookie
        // uc_cookie.Set1("userInfo",res[success].data.userid,30,null,'',null);
      }else{
        jQuery('.btn-dropdown-login').text('登录');
        jQuery('.dropdown-login .error, .dropdownlogin .error').text(res.error_response.msg);
      }
    })
    // bbs 20160322
    configTool.ajax1("ucaction.login.oldbbs.sync","Get",myparams,function(res,success){
      if(res[success]){
        jQuery.getScript(res[success].data);
      }else{
        console.log("bbs请求登录失败")
      }
    })
    // bbs end
  },
  /**
   * shunzizhan 20160122
   * 更新页面上用户的基本信息
   * @param  {[type]} userinfo [description]
   * @return {[type]}          [description]
   */
  updateUserInfo:function(userinfo){
    // 将个人信息写人到cookie
    optionUserInfo.writeUserCookie(userinfo);
    // 顶部banner
    jQuery('.nav-login').removeClass('un-login');
    // jQuery('#nav-login .user-pic').attr('src',userinfo.imgUrl);
    // jQuery('#nav-login .user-nickname').attr('id',userinfo.userInfoUserid);
    // jQuery('#nav-login .user-nickname').text(userinfo.nickName);
    jQuery('.user-pic').attr('src',userinfo.imgUrl);
    jQuery('.user-nickname').attr('id',userinfo.userid).text(userinfo.nickName);
    // if(userinfo.msgCount<1){
    //   jQuery(".login .email-num").text('0').hide();
    // }else{
    //   jQuery(".login .email-num").text(userinfo.msgCount).show();
    // }

    // uc_cookie.Set1("userInfo", userinfo.userInfoUserid, null, null, null, null);

    // 首页头部信息
    jQuery(".home-banner-noroles").toggleClass('home-hide');
    jQuery(".head-img-box img").attr("src",userinfo.imgUrl);
    jQuery(".home-user-name").text(userinfo.nickName);

    // 我的亿房卡片信息
    jQuery(".user-name").text(userinfo.nickName || userinfo.userName);
    jQuery(".avatar").attr("src",userinfo.imgUrl);
    // jQuery(".member-safety-rate").removeClass().addClass('member-safety-rate rate-'+ userinfo.userLevel);
    //更新消息数量
    // jQuery(".login .email-num").text(userinfo.msgCount || 0);

    // 二手房
    jQuery("#nm_uname").text(userinfo.nickName);
    jQuery("#loginLayerMsg").show();
    jQuery("#unloginLayerMsg").hide();
    jQuery('#img_uid').attr("src",userinfo.imgUrl || 'http://test.uc.fdc.com.cn/app/images/default-user.png');

    configTool.getWealth({userid:userinfo.userid,token:userinfo.token});
    configTool.getMsg({userid:userinfo.userid,token:userinfo.token});
    configTool.getSecurityLevel({userid:userinfo.userid,token:userinfo.token,roleId:userinfo.roleId});
  },
  /**
   * shunzizhan 20160122
   * 下拉登录 点击登录按钮进行登录
   * @param  {Object} ){                 var paramsdata [description]
   * @return {[type]}     [description]
   */
  loginFun:function(){
    var paramsdata={
      loginType:4,
      loginName:jQuery('.dropdown-user').val(),
      userPasswd:jQuery('.dropdown-pwd').val(),
      autoLogin:jQuery('.dropdown-autologin').length>1 ? 1 : 0,
      // 20160420 添加匿名id
      anomymousId:decodeURIComponent(uc_cookie.Get("uc_userInfo"))
    }
    if(paramsdata.loginName == '' || paramsdata.loginName == undefined || paramsdata.userPasswd == '' || paramsdata.userPasswd == undefined) {
      jQuery('.dropdown-login .error').text("用户名或密码不能为空");
      // return false;
    }else{
      optionUserInfo.getUserInfo(paramsdata);
    }
  },
  createUser:function(){
    var userInfo = decodeURIComponent(uc_cookie.Get("uc_userInfo"));
    var token = decodeURIComponent(uc_cookie.Get("uc_token"));
    userInfo = userInfo !="null" ? userInfo : "";
    token = token !="null" ? token : "";
    if(token ==""){
      // browseHistory.init();
      // mod shunzizhan 20160203
      // 新增路由解析，如果有返回的用户id与openid则需要请求后台第三方登录接口
      var str_haParam = window.location.href.split("?");
      if(str_haParam.length > 1){
        var dataParams = getParams.obj(str_haParam[1]);
        if(dataParams.userid){
          dataParams.curUrl = str_haParam[0];
          optionUserInfo.getUserInfoById(dataParams);
        }
      }
    }else{
      optionUserInfo.getUserInfoById({userid:userInfo,token:token});
    }
  },
  writeUserCookie:function(userinfo){
    //将用户id token存在缓存
    uc_cookie.Set1("uc_userInfo", userinfo.userid, null, null, null, null);
    uc_cookie.Set1("uc_token", userinfo.token, null, null, null, null);
    uc_cookie.Set1("uc_userTokenId", userinfo.userTokenId, null, null, null, null);
    uc_cookie.Set1("uc_roleId", userinfo.roleId, null, null, null, null);
  }
}
/**
* shunzizhan 20160121
* 下拉登录面板
* @type {Object}
*/
var dropdownLogin={
  // 记录用户鼠标是否移动到面板中
  isenter:false,
  /**
   * shunzizhan 20160121
   * 创建弹出下拉登录
   * @param  {[int]} x [面板距离浏览器左边的距离]
   * @param  {[int]} y [面板距离浏览器顶部的距离]
   * @return {[type]}   [description]
   */
  createDropdownLogin:function(element){
    dropdownLogin.isenter = false;
    var position={
      top:element.offset().top+element.height()-curbody.scrollTop(),
      left:element.offset().left+element.width()/2-150
    }
    if(position.left<1000){
      position.left = element.offset().left;
    }
    if(jQuery('.dropdown-login').length>0){
      jQuery('.dropdown-login').css({"left":position.left,"top":position.top}).show();
      return;
    }
    var buildstr='<div class="dropdown-login" style="left:'+position.left+'px;top:'+position.top+'px;">'
                  // +'<div class="group-item">'
                  // +'  <input type="text" class="dropdown-user" placeholder="请输入手机号/会员名/邮箱" required>'
                  // +'  <span>请输入手机号/会员名/邮箱</span>'
                  // +'</div>'
                  // +'<div class="group-item">'
                  // +'  <input type="password" class="dropdown-pwd" placeholder="请输入密码" required>'
                  // +'</div>'
                  +'<div class="group-item">'
                  +'  <input type="text" class="dropdown-user" required>'
                  +'  <span class="dropdown-placeholder">请输入手机号/会员名/邮箱</span>'
                  +'</div>'
                  +'<div class="group-item">'
                  +'  <input type="password" class="dropdown-pwd" required>'
                  +'  <span class="dropdown-placeholder">请输入密码</span>'
                  +'</div>'
                  +'<div class="group-item login-tips">'
                  +'  <label class="dropdown-autologin">自动登录</label>'
                  +'  <a href="'+configparams.forGotPwd+'">忘记密码?</a>'
                  +'  <span class="error"></span>'
                  +'</div>'
                  +'<div class="group-item"><button class="btn-dropdown-login">登录</button></div>'
                  +'<div class="group-item login-tips">'
                  +'  <p>您还可以通过其他快捷方式登录</p>'
                  // +'  <a class="dropdown-3rd dropdown-QQ" href="'+configparams.trdQQ+'"></a>'
                  // +'  <a class="dropdown-3rd dropdown-WX" href="'+configparams.trdWX+'"></a>'
                  // +'  <a class="dropdown-3rd dropdown-WB" href="'+configparams.trdWB+'"></a>'
                  +'  <a class="dropdown-3rd dropdown-QQ" id="qq"></a>'
                  +'  <a class="dropdown-3rd dropdown-WX" id="wechat"></a>'
                  +'  <a class="dropdown-3rd dropdown-WB" id="weibo"></a>'
                  +'</div>'
                +'</div>';
    curbody.append(buildstr);
  }
}

var init=function(){
  curbody=jQuery('body');
  var index=Math.ceil(Math.random()*4);
  if(jQuery('.top .login').hasClass('un-login')){
    // jQuery(".head-img-box img").attr("src","images/tx-"+index+".png");
    // jQuery('.top .login .user-pic').attr("src","images/tx-"+index+".png");
    jQuery(".head-img-box img").attr("src","http://192.168.1.196/app/images/tx-"+index+".png");
    jQuery('.top .login .user-pic').attr("src","http://192.168.1.196/app/images/tx-"+index+".png");
    jQuery('.top .login .user-nickname').text(configparams.nickname[index-1]);
  }
  optionUserInfo.createUser();
  // 将当前浏览的页面记录到uc_cookie中
  uc_cookie.Set1("uc_curUrl",window.location.href,30,null,'',null);
  /**
   * shunzizhan 20160121
   * 鼠标移至埋点 .dropdownlogin 的地方，创建下拉
   * 当鼠标移开时，如果鼠标不在下拉面板中，则影藏，否则显示，等用户输入
   */
  curbody.delegate('.dropdownlogin','click',function() {
    /* Stuff to do when the mouse enters the element */
    dropdownLogin.createDropdownLogin(jQuery(this));
  });
  curbody.delegate('.dropdownlogin','mouseleave',function() {
    /* Act on the event */
    curbody.delegate(".dropdown-login", "mouseenter", function(){
      jQuery(".dropdown-login").show();
      dropdownLogin.isenter = true;
    })
    setTimeout(function(){
      if(!dropdownLogin.isenter){
        jQuery(".dropdown-login").hide();
      }
    },1000);
  });
  /**
   * shunzizhan 20160122
   * 当页面滚动条滚动时，面板影藏
   */
  jQuery(window).scroll(function(event) {
    /* Act on the event */
    jQuery(".dropdown-login").hide();
  });

  /**
   * shunzizhan 20160122
   * 切换 是否自动登录
   */
  curbody.delegate('.login-tips label', 'click',function(event) {
    /* Act on the event */
    jQuery(this).toggleClass('dropdown-autologin');
  });


  curbody.delegate('.dropdown-login .btn-dropdown-login', 'click',function(){
    // console.log(222);
    optionUserInfo.loginFun();
  })
  // curbody.on('keyup','.dropdown-login',function(e){
  curbody.delegate('.dropdown-login input', 'keyup',function(e){
    // var e= window.event || event;
    if(e.keyCode == 13){
      // console.log(111);
      optionUserInfo.loginFun();
    }
  })
  /**
   * shunzizhan 20160122
   * 输入用户名、密码时，错误提示消失
   */
  // curbody.on('keyup ,focus ,blur','.dropdown-user, .dropdown-pwd',function(){
  curbody.delegate('.dropdown-login input','keyup, focus, blur',function(){
    if(jQuery(this).val().length>0){
      jQuery('.dropdown-login .error').text("");
    }
  });
  /**
   * shunzizhan 20160205
   * 解决placeholder在ie中的兼容性问题
   * @return {[type]}     [description]
   */
  curbody.delegate('.dropdown-login input','focus',function(){
    // jQuery(".dropdown-placeholder").removeClass('dropdown-hide');
    jQuery(this).siblings('span').addClass('dropdown-hide');
  });
  curbody.delegate('.dropdown-login input','blur',function(){
    if(jQuery(this).val().length >1){
      jQuery(this).siblings('span').addClass('dropdown-hide');
    }else{
      jQuery(this).siblings('span').removeClass('dropdown-hide');
    }
  });
  curbody.delegate('.dropdown-login .dropdown-placeholder','click',function(){
    // jQuery(this).addClass('dropdown-hide');
    jQuery(this).siblings('input').focus();
  });

  /**
   * shunzizhan 20160121
   * 用户点击非下拉面板与埋点.dropdownlogin处，下拉隐藏
   * @return {[type]}      [description]
   */
  curbody.click(function(e){
    var a = jQuery(".dropdown-login"),
      b = jQuery(".dropdown-login")[0],
      c = jQuery(".dropdownlogin"),
      d = jQuery(".dropdownlogin")[0],
      t = e.target;
    if(a.css("display")=="block"){
      if(b != t && !jQuery.contains(b, t) && !jQuery.contains(d, t)){
        a.hide();
      }
    }
  })
  jQuery("body").delegate(".dropdown-login #qq, .dropdown-login #wechat, .dropdown-login #weibo", "click", function(){
    var url="ucaction.login.third." + jQuery(this).attr("id") +".pass";
    // var url=baseUrl +"login/third/pass";
    var uid=decodeURIComponent(uc_cookie.Get("uc_userInfo")),
        tempUrl=decodeURIComponent(uc_cookie.Get("uc_curUrl")),
        token=decodeURIComponent(uc_cookie.Get("uc_token"));
    var myparams={
      userid:uid != "null" ? uid : undefined,
      curUrl:tempUrl != "null" ? tempUrl:"home.html#1",
      // invaliddata:new Date().getTime(),
      token:token !="null" ? token : ""
    }
    configTool.ajax1(url,"Get",myparams,function(res,success){
      if(res[success]){
        console.log("第三方登录成功……");
        window.location.href=res[success].data.url;
      }else{
        configTool.showError(res);
      }
    })
  })

  curbody.delegate('#login-out','click',function(event) {
    /* Act on the event */
    uc_cookie.Del("uc_userInfo");
    uc_cookie.Del("uc_token");
    // bbs 2016
    uc_cookie.Del("Ndwc_7d64_auth");
    // bbs end
    var tempUrl=window.location.href.split('/');
    if(tempUrl[tempUrl.length-1].indexOf("fdc")==0 || tempUrl[tempUrl.length-1].indexOf("cs")==0){
      window.location.href = "home.html#1";
    }else{
      window.location.reload();//刷新当前页面.
    }

  });
}
jQuery(document).ready(function() {
  init();
})

window.console = window.console || (function(){
  var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile
  = c.clear = c.exception = c.trace = c.assert = function(){};
  return c;
})();
