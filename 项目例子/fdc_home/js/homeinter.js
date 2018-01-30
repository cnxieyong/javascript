"use strict";
// 户种类
jQuery(".slideTxtBox").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"leftLoop",vis:4});

// 今日焦点
/* 使用js分组，每6个li放到一个ul里面 */
jQuery(".multiple-column .bd li").each(function(i){ jQuery(".multiple-column .bd li").slice(i*6,i*6+6).wrapAll("<ul></ul>");});

/* 调用SuperSlide，每次滚动一个ul，相当于每次滚动6个li */
jQuery(".multiple-column").slide({titCell:".hd ul",mainCell:".bd .pic-list",autoPage:true,effect:"leftLoop"});
// 滚动条
$(function(){
  $('.div_scroll').scroll_absolute({arrows:false});
});

var temp=uc_cookie.Get("tempctNum");
if(temp){
  $(".update-ctscroll .update-ct .ct-num").text(uc_cookie.Get("tempctNum"));
}
else{
  uc_cookie.Set1("tempctNum", parseInt(50 * Math.random() + 50), null, null, null, null);
  $(".update-ctscroll .update-ct .ct-num").text(uc_cookie.Get("tempctNum"));
}


//装修日记滚动
jQuery(".txtScroll-top").slide({mainCell:".bd ul",autoPage:true,effect:"topLoop",autoPlay:true,vis:5,mouseOverStop:true});


//装修家居表单
$(".apply-head li").hover(function(){
  $(this).addClass("cur").siblings().removeClass("cur");
  var num = $(this).index(),
      classfiyV = $("#sgRealName");
  if (num == 0) {
    classfiyV.val("免费量房");
  }else{
    classfiyV.val("预算审核");
  }
})
$(".reg-newhouse .regist-ipt").focus(function(){
  $(this).parents("li").addClass("cur");
  $(this).siblings(".remind-iptword").hide();
})
$(".reg-newhouse .regist-ipt").blur(function(){
  $(this).parents("li").removeClass("cur");
  if ($(this).val() == "") {
    $(this).siblings(".remind-iptword").show();
  }
})

$(".house-jzzx .regist-ipt").focus(function(){
  $(this).parents("li").addClass("cur");
  $(this).siblings(".remind-iptword").hide();
})
$(".house-jzzx .regist-ipt").blur(function(){
  $(this).parents("li").removeClass("cur");
  if ($(this).val() == "") {
    $(this).siblings(".remind-iptword").show();
  }
})

//二级菜单tab切换
$(".subm-name").mouseenter(function(){
  var e=$(this);
    var thisParLi=e.parents("li");
    var thisParUiSib=e.parents(".submenu-title").siblings(".submenu-tabbox");
    var indexNum=thisParLi.index();
    thisParLi.addClass("cur").siblings().removeClass("cur");
    thisParUiSib.find(".smenu-tabctx").hide();
    thisParUiSib.find(".smenu-tabctx").eq(indexNum).show();
})
//租房二手房切换
$(".floor-tit span").click(function(){
  var thisNum = $(this).index(".floor-tit span");
  $(this).not(".dot-fdctext").addClass("cur").siblings().removeClass("cur");
  $(".sechouse-floor").eq(thisNum).show().siblings(".sechouse-floor").hide();
  $(".secdhouse-head").eq(thisNum).show().siblings(".secdhouse-head").hide();
})
//一级菜单切换
$(".menu-list").click(function(){
  var e=$(this);
  e.addClass("current").siblings(".menu-list").removeClass("current");
  var menuListNum=e.index();
  $(".menu-center").hide();
  $(".menu-center").eq(menuListNum).show();
})
//头部地区展示
$(".area-nav").hover(function(){
  $(".areastate-list").show();
  $(this).addClass("cur");
},function(){
  $(".areastate-list").hide();
  $(this).removeClass("cur");
})
$(".header-nav li").hover(function(){
  $(this).find(".header-secmenu").show();
  $(this).find(".header-link").addClass("cur");
  $(".menu-adlink1").hide();
},function(){
  $(this).find(".header-secmenu").hide();
  $(this).find(".header-link").removeClass("cur");
  $(".menu-adlink1").show();
})
//选择区域文字切换
$(".areastate-list li a").on("click",function(){
  var localName=$(this).html();
  var localNameL=localName.length;
  var lcalNameSub=localName.substring(0,localNameL-1);
  $(".area-navname").html(lcalNameSub);
})
//输入框获取焦点提醒消失
$(".searchipt-box").bind("click",function(){
    var iptBox=$(this).find(".rmid-ipt");
    var iptWord=$(this).find(".remind-iptword");
    iptBox.focus();
    iptWord.hide();
})

$(".rmid-ipt").bind('blur', function() {
    var inputBox=$(this).val();
    var remindWord=$(this).siblings(".remind-iptword");
    if(inputBox == '') {
        remindWord.show();
    }
})



//新房tab交换,延迟200毫秒
var newhouseT;
$("#floorTab li").mouseenter(function(){
  var e=$(this);
  newhouseT=setTimeout(function(){
    var liNum=e.index();
    e.addClass("cur").siblings().removeClass("cur");
    e.parents(".floor-head").siblings(".floor-body").find(".newhouse-center ul").eq(liNum).show().siblings("ul").hide();
  },200);
}).mouseleave(function(){
  clearTimeout(newhouseT);
})

//热帖

function randomInt(n,m){
    var limit=m-n;
    var ranNum=Math.random()*limit;
    var result=parseInt(ranNum)+n;
    return result;
}

//返回顶部
/**
 * 亿房主页zuobaiquan
 * 2016-07-15
 * @param  {[type]} window [description]
 * @return {[type]}        [description]
 */
$(window).scroll(function(){
    var is_show=$(".sidebar");
    if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0") {
       $(".sidebar").css({"display":"none","height":"0"});
    }
    else{
      if ($(window).scrollTop()>100){
        is_show.fadeIn(500);
      }
      else{
          is_show.fadeOut(500);
      }
    }
});

$(".back-to-top").click(function(){
    $('body,html').animate({scrollTop:0},1000);
    return false;
});

//家居装修轮播
jQuery(".slide-decorbox").slide({mainCell:".bd ul",effect:"leftLoop",autoPlay:true});

//延迟加载
$("img.lazy-img").lazyload({
    effect : "fadeIn"
});

//表单提交
$(".ask-form").on("click","#post-question",function(){
  var questionText=$(".question-text").val();//获取输入的手机号码
  if(questionText == ""){
    var qacon=$(".ask-container");
    showAlert (qacon,'请输入您的问题！');
    $(".showlog-pos").css({"right":"35px","bottom":"44px"});
    $(".question-text").focus(function(){
      qacon.find(".showlog-pos").fadeOut(500);
    });
    return false;
  }
  $.ajax({
    url:"http://guid.fdc.com.cn/yfwenwen/QuestionSubmit.aspx",
    type:"get",
    data:{txtContent:questionText},
    success: function (res) {
      console.log(res);
      var resError="您提交的问题过于简单",
        resError2="请勿频繁提问";
      if(res.indexOf(resError) > 0){
        showAlert($(".ask-container"),"您提交的问题过于简单");
        $(".showlog-pos").css({"right":"35px","bottom":"44px"});
        return false;
      }
      if(res.indexOf(resError2) > 0){
        showAlert($(".ask-container"),"请勿重复提交");
        $(".showlog-pos").css({"right":"35px","bottom":"44px"});
        return false;
      }
      else{
        showAlert($(".ask-container"),"提交成功");
        $(".showlog-pos").css({"right":"35px","bottom":"44px"});
        $(".question-text").val("");
        return true;
        window.location.href="http://guid.fdc.com.cn/yfwenwen/index.aspx";
      }
    },
    error: function () {
      showAlert ($(".ask-container"),"提交失败");
      $(".showlog-pos").css({"right":"35px","bottom":"44px"});
      //window.location.href="http://guid.fdc.com.cn/yfwenwen/web/Suggest/index.aspx";
    }
  });
})


$(".form-input").on("click","#post-wwjf",function(){
  var houseBudget=$("#ddlesHousePrice").val();//获取输入的购房预算
  var houseSize=$("#ddlnewHouseArea").val();//获取输入的期望面积
  var DDLRegion=$("#DDLRegion").val();//获取输入的手机号码
  if(houseBudget == ""){
    var houseele=$("#fdc-xfwwjf div.input-area:nth-child(1)");
    showAlert (houseele,'请填写购房预算！');
    $(".showlog-pos").css({"right":"0","bottom":"37px"});
    $("#ddlesHousePrice").focus(function(){
      houseele.find(".showlog-pos").fadeOut(500);
    });
    return false;
  }
  if(houseSize == ""){
    var houseele2=$("#fdc-xfwwjf div.input-area:nth-child(2)");
    showAlert (houseele2,'请填写期望面积！');
    $(".showlog-pos").css({"right":"0","bottom":"37px"});
    $("#ddlnewHouseArea").focus(function(){
      houseele2.find(".showlog-pos").fadeOut(500);
    });
    return false;
  }
  if(DDLRegion == ""){
    var houseele3=$("#fdc-xfwwjf div.input-area:nth-child(3)");
    showAlert (houseele3,'请填写购房区域！');
    $(".showlog-pos").css({"right":"0","bottom":"37px"});
    $("#DDLRegion").focus(function(){
      houseele3.find(".showlog-pos").fadeOut(500);
    });
    return false;
  }
  else{
    var txtContent="我想购买一套新房，"+DDLRegion+"，价格"+houseBudget+"，面积"+houseSize,
    keywords=DDLRegion+"_"+houseBudget+"_"+houseSize;
    var fdcXftj=$("#fdc-xfwwjf div.input-area:nth-child(3)");
    $.ajax({
      url:"http://guid.fdc.com.cn/yfwenwen/QuestionSubmit.aspx",
      type:"get",
      data:{txtContent:txtContent,cid:5,keywords:keywords},
      success: function (res) {
        var resError="请勿频繁提问";
        if(res.indexOf(resError) > 0){
          showAlert (fdcXftj,"请勿重复提交！");
          $(".showlog-pos").css({"right":"16px","bottom":"-1px"});
          //window.location.href="http://guid.fdc.com.cn/yfwenwen/index.aspx";
        }
        else{
          showAlert (fdcXftj,"提交成功");
          $(".showlog-pos").css({"right":"32px","bottom":"-1px"});
          window.location.href="http://guid.fdc.com.cn/yfwenwen/index.aspx";
        }
      },
      error: function () {
        showAlert (fdcXftj,"提交失败");
        $(".showlog-pos").css({"right":"32px","bottom":"-1px"});
        //window.location.href="http://guid.fdc.com.cn/yfwenwen/web/Suggest/index.aspx";
      }
    });
    //$("#fdc-xfwwjf").submit();
  }
})

//错误提示
function showAlert (ele,msg,bordercolor){
    $('.showlog-pos').remove();
    var bordercolor= bordercolor || "#a1d8ff";
    $(ele).append('<div class="showlog-pos" style="text-align:center;"><div id="showlog">'+ msg +
      '<i class="showlog-icon"></i><div class="triangle"><em>◆</em><span>◆</span></div>'+
      '</div></div>'
    );
    $('#showlog').css({'border':'1px solid '+bordercolor});
    $('.triangle em').css({'color':bordercolor});
    var Timer=null;
    $(".showlog-icon").click(function(){
      clearInterval(Timer);
      $('.showlog-pos').fadeOut(500);
    })
    Timer=setTimeout(function(){
      $(".showlog-pos").fadeOut(500);
    },3000)
};


//新房表单
$("#fdcRegist").on("click",".yzm-right",function(){
  var xftelNum=$(".xftelNum").val();//获取输入的手机号码
  var myreg = /^1[345789]\d{9}$/;
  if(!myreg.test(xftelNum)){
      var elepo=$('#fdcRegist .yzm').prev();
      showAlert (elepo,'请输入有效的手机号码！',"#f9a8a8");
      $(".showlog-pos").css({"right":"-1px","bottom":"-7px"});
      //$(".xftelNum").trigger("click");
      return false;
  }
  //提示框按钮文字显示
  $(this).addClass("disable");
  function jump(count) {
      var yzmBtn=$('#fdcRegist .yzm-right');
      window.setTimeout(function(){
          count--;
          if(count > 0) {
              yzmBtn.val(count+"s后可重新发送");
              yzmBtn.attr('disabled',"true");
              yzmBtn.addClass("yzm-border");
              jump(count);
          } else {
             yzmBtn.val("点击获取短信验证码");
             yzmBtn.removeClass("yzm-border");;
             yzmBtn.removeAttr("disabled");
             yzmBtn.removeClass("disable");
          }
      }, 1000);
  }
  jump(60);
  //ajax，sendsmscode获取短信内容
  configTool.ajax1("ucaction.user.sendsmscode","Get",
    {
      mobileNum: xftelNum,
      channel: "freemeasurehouse",
      requrl:"http://gw.fdc.com.cn/router/rest"
    },
    function(res,success){
      var sendtel=$("#fdcRegist ul li:nth-child(3)");
      if(res[success]){
       showAlert (sendtel,res[success].data.msg,"#f9a8a8");
       $(".showlog-pos").css({"left":0,"bottom":"-6px"});
      }else{
        showAlert (sendtel,error_response.msg,"#f9a8a8");
        $(".showlog-pos").css({"left":0,"bottom":"-6px"});
      }
    }
  );
})
$("#fdcRegist #registBtn").click(function(){
  var desName=$(".desName").val();//获取目的楼盘的名字
  var xfuser=$(".xfuser").val();//获取用户的名字
  var xftelNum=$(".xftelNum").val();//获取输入的手机号码
  var xfyzmNum=$("#xfyzmNum").val();//获取验证码

  //本地验证
  if(desName == ""){
    var elepo1=$(".newhouse-logo");
    showAlert (elepo1,'请填写目的楼盘！',"#f9a8a8");
    $(".showlog-pos").css({"left":"43px","bottom":"-6px"});
    $(".desName").focus(function(){
      elepo1.find(".showlog-pos").fadeOut(500);
    });
    return false;
  }
  if(xfuser == ""){
    var elepo2=$("#fdcRegist ul li:nth-child(1)");
    showAlert (elepo2,'请填写姓名！',"#f9a8a8");
    $(".showlog-pos").css({"left":"54px","bottom":"-6px"});
    $(".xfuser").focus(function(){
      elepo2.find(".showlog-pos").fadeOut(500);
    });
    return false;
  }
  if(xftelNum == ""){
    var elepo3=$("#fdcRegist ul li:nth-child(2)");
    showAlert (elepo3,'请填写手机号码！',"#f9a8a8");
    $(".showlog-pos").css({"left":"42px","bottom":"-6px"});
    $(".xftelNum").focus(function(){
      elepo3.find(".showlog-pos").fadeOut(500);
    });
    return false;
  }
  if(xfyzmNum == ""){
    var elepo4=$("#fdcRegist ul li:nth-child(3)");
    showAlert (elepo4,'请填写验证码！',"#f9a8a8");
    $(".showlog-pos").css({"left":"-1px","bottom":"-6px"});
    $("#xfyzmNum").focus(function(){
      elepo4.find(".showlog-pos").fadeOut(500);
    });
    return false;
  }

  //提交验证smscodecheck
  configTool.ajax1(
    "ucaction.user.smscodecheck",
    "get",
    {
      mobileNum: xftelNum,
      verifyCode: xfyzmNum,
      channel: "freemeasurehouse",
      Requrl:"http://gw.fdc.com.cn/router/rest"
    },
    function(res,success){
      var sendteltj=$("#fdcRegist ul li:nth-child(2)");
      if(res[success]){
          var vtext ='意向楼盘:'+desName;
          //showAlert (sendteltj,res[success].data.msg);
          //$(".showlog-pos").css({"left":0,"bottom":"-6px"});
          //提交后台
          $.ajax({
            url:"http://zt.fdc.com.cn/2013zt/kft/Handler/baoming.ashx",
            type:"POST",
            data:{LineNum:"",UserName:xfuser,Num:0,phone:xftelNum,note:encodeURI(vtext),type: 1},
            success: function (msg) {
              if (msg != null) {
                var fdcXftj=$("#fdcRegist ul li:nth-child(3)");
                if (msg == "True") {
                  showAlert (fdcXftj,"恭喜您申请成功","#f9a8a8");
                  $(".showlog-pos").css({"left":"47px","bottom":"-6px"});
                }
                else {
                  showAlert (fdcXftj,"抱歉，申请失败","#f9a8a8");
                  $(".showlog-pos").css({"left":"47px","bottom":"-6px"});
                }
              }
            }
          });
          //$("#fdc-decorate").submit();
      }else{
        showAlert (sendteltj,error_response.msg);
        $(".showlog-pos").css({"left":0,"bottom":"-6px"});
        return false;
      }
    }
  );
  $(".desName").val("");
  $(".xfuser").val("");
  $("#xfyzmNum").val("");
  $(".xftelNum").val("");
  $(".regist-form .remind-iptword").show();
})

//家居装修表单
$("#fdc-decorate").on("click",".yzm-right",function(){
  var telNum=$(".telNum").val();//获取输入的手机号码
  var myreg = /^1[345789]\d{9}$/;
  if(!myreg.test(telNum)){
      var elepo=$('#fdc-decorate .yzm').prev();
      showAlert (elepo,'请输入有效的手机号码！');
      $(".showlog-pos").css({"right":"-1px","bottom":"-7px"});
      //$(".telNum").trigger("click");
      return false;
  }
  //提示框按钮文字显示
  $(this).addClass("disable");
  function jump(count) {
      var yzmBtn=$('#fdc-decorate .yzm-right');
      window.setTimeout(function(){
          count--;
          if(count > 0) {
              yzmBtn.val(count+"s后可重新发送");
              yzmBtn.attr('disabled',"true");
              jump(count);
          } else {
             yzmBtn.val("点击获取短信验证码");
             yzmBtn.removeAttr("disabled");
             yzmBtn.removeClass("disable");
          }
      }, 1000);
  }
  jump(60);
  //ajax，sendsmscode获取短信内容
  configTool.ajax1("ucaction.user.sendsmscode","Get",
    {
      mobileNum: telNum,
      channel: "freemeasurehouse",
      requrl:"http://gw.fdc.com.cn/router/rest"
    },
    function(res,success){
      var sendteljz=$("#fdc-decorate ul li:nth-child(2)");
      if(res[success]){
       showAlert (sendteljz,res[success].data.msg);
       $(".showlog-pos").css({"left":0,"bottom":"-6px"});
      }else{
        showAlert (sendteljz,error_response.msg);
        $(".showlog-pos").css({"left":0,"bottom":"-6px"});
      }
    }
  );
})

$("#fdc-decorate #registBtn").click(function(){
  var commName=$(".commName").val();//获取小区的名字
  var telNum=$(".telNum").val();//获取输入的手机号码
  var yzmNum=$("#yzmNum").val();//获取验证码
  //本地验证
  if(commName == ""){
    var elepo1=$(".apply-body");
    showAlert (elepo1,'请填写小区名称！');
    $(".showlog-pos").css({"right":"80px","bottom":"3px"});
    $(".commName").focus(function(){
      elepo1.find(".showlog-pos").fadeOut(500);
    });
    return false;
  }
  if(telNum == ""){
    var elepo2=$("#fdc-decorate ul li:nth-child(1)");
    showAlert (elepo2,'请填写手机号码！');
    $(".showlog-pos").css({"left":"35px","bottom":"-7px"});
    $(".telNum").focus(function(){
      elepo2.find(".showlog-pos").fadeOut(500);
    });
    return false;
  }
  if(yzmNum == ""){
    var elepo3=$("#fdc-decorate ul li:nth-child(2)");
    showAlert (elepo3,'请填写验证码！');
    $(".showlog-pos").css({"left":"-1px","bottom":"-7px"});
    $("#yzmNum").focus(function(){
      elepo3.find(".showlog-pos").fadeOut(500);
    });
    return false;
  }
  //提交验证smscodecheck
  configTool.ajax1(
    "ucaction.user.smscodecheck",
    "get",
    {
      mobileNum: telNum,
      verifyCode: yzmNum,
      channel: "freemeasurehouse",
      Requrl:"http://gw.fdc.com.cn/router/rest"
    },
    function(res,success){
      var sendteltj2=$("#fdc-decorate ul li:nth-child(2)");
      if(res[success]){
       showAlert (sendteltj2,"恭喜您申请成功");
       $(".showlog-pos").css({"left":"47px","bottom":"-6px"});
       //$(".showlog-pos").delay(3000).fadeOut(200);
       //提交后台
       $("#fdc-decorate").submit();
      }else{
        showAlert (sendteltj2,res.error_response.msg);
        $(".showlog-pos").css({"left":"47px","bottom":"-6px"});
        //$(".showlog-pos").delay(3000).fadeOut(200);
        return ;
      }
    }
  );
  $(".desName").val("");
  $(".commName").val("");
  $("#yzmNum").val("");
  $(".telNum").val("");
  $(".regist-form .remind-iptword").show();
})


//搜索框查询
  function clearControlStyle(div, divul, divli){
    $("#" + divul).empty().removeClass("show");
    $("#" + div).removeClass("show");
    $("#" + divli).hide();
  }

   //加载亿搜下拉列表
  function ShowKeyWordsList(div, divul, divli, input, ys_div){
    $("#" + divul).empty();
    $("#" + div).removeClass("show");
    var keywords = $.trim($("#" + input).val());
    $.ajax({
      type:"get",
      url: "http://www.fdc.com.cn/tonewhouse/gethouse.ashx?baseName=" + encodeURIComponent(keywords),
      dataType: "json",
      success: function (jsonResponse) {
        if(jsonResponse != null && jsonResponse.length != 0){
          ret = jsonResponse.ds;
          var html = "";
          $.each(ret, function (m, n) {
            html += "<li>" + n.BuildName + "</li>";
          })
          if (html == "") {
            $('#' + divul).html('').hide();
          }
          else {
            $('#' + divul).html(html);
            $('#' + divul).show().css('display', '');
            $("#" + ys_div).css('display', '');
            $('#' + divli).bind("click", function () {
              $('#' + input).val($(this).text()); ;
              $("#" + divul).empty();
              $("#" + div).removeClass("show");
              $("#" + ys_div).css('display', 'none');
            });
          }
        }
      }
    });
  };
  //键盘
  var cus = 0;
  function keyUpEvent(event, div, divul, divli, input, _div) {
    var key = $("#keywords").val();
    // 2016-4-15修改start
    if (key.length == 0) {
      $("#" + _div).css('display', 'none');
    };
    // 2016-4-15修改end
    if (key.length != 0) {
      var listsize = $("#" + divli).size();
      if (event.keyCode == 38)//键盘向上选择
      {
        if (cus < 1) {
          cus = listsize - 1;
          $("#" + divli).removeClass();
          $("#" + divli).eq(cus).addClass("LiSelected");
          var text = $("#" + divli).eq(cus).text();
          $("#" + input).val(text)
        }
        else {
          cus--;
          $("#" + divli).removeClass();
          $("#" + divli).eq(cus).addClass("LiSelected");
          var text = $("#" + divli).eq(cus).text();
          $("#" + input).val(text)
        }
      }
      else if (event.keyCode == 40)//键盘向下选择
      {
        if (cus < (listsize - 1)) {
          cus++;
          $("#" + divli).removeClass();
          $("#" + divli).eq(cus).addClass("LiSelected");
          var text = $("#" + divli).eq(cus).text();
          $("#" + input).val(text);
        }
        else {
          cus = 0;
          $("#" + divli).removeClass();
          $("#" + divli).eq(cus).addClass("LiSelected");
          var text = $("#" + divli).eq(cus).text();
          $("#" + input).val(text)
        }
      }
      else if (event.keyCode == 13)//回车键
      {
        $("#" + _div).css('display', 'none');
        if (div == "popupYS") {
          Search();   //亿搜
        }
        else {
          return;
        }
      }
      else {
        if (div == "popupYS")    //亿搜
        {
          ShowKeyWordsList(div, divul, divli, input, _div);
        }
      }
    }
  };

  //大搜索
  function Search() {
      var key = $("#keywords").val();
      key = key.replace("请输入小区名称或地址", "");
      if (key.length == 0) {
         window.open("http://house.fdc.com.cn/houselist.html");
      }else {
         window.open("http://house.fdc.com.cn/houselist.html?" + encodeURIComponent(key));
      }
  }

$(function () {
    var menuSearchBox = $("#menuSearchBox");//form
    //-----------------亿搜 -----------------//
    //$("#popupYS_DIV").css('display', 'none');//隐藏搜索结果DIV
    $("#keywords").keyup(function (event) {
      keyUpEvent(event, "popupYS", "popupYS_UL", "popupYS li", "keywords", "popupYS_DIV");
    });
    $("#keywords").blur(function () {
      setTimeout(function () {
        $("#popupYS_DIV").css('display', 'none');
        clearControlStyle("popupYS", "popupYS_UL", "popupYS li");
      }, 500);
    });
    $("#keywords").keydown(function (event) {
      if (event.keyCode == 13) {
        if (cus > 0) {
          var text = $("#popupYS li").eq(cus).text();
          $("#keywords").val(text);
          clearControlStyle("keywords", "popupYS_UL", "popupYS li");
          cus--;
        }
      }
    });
    //-----------------亿搜 End -----------------//
    // 新房搜索
    $("#btnOk").click(function () {
      Search();
    });

    // 二手房搜索
    function secSecach(){
      var secIptVal = encodeURIComponent($("#secIpt").val());
      menuSearchBox.attr("action","http://oldhouse.fdc.com.cn/esflist_-1_0_0_0_1_1_2_0_0_0_0_0_0_0_1.html?" + secIptVal );
      menuSearchBox.submit();
    }
    $("#secIpt").keyup(function (event) {
      if (event.keyCode == 13){
        secSecach();
      }
    });
    $("#secSecachBtn").click(function(){
      secSecach();
    })

    //租房搜索
    function rentSecach(){
      var rentIptVal = encodeURIComponent($("#rentIpt").val());
      menuSearchBox.attr("action","http://zufang.fdc.com.cn/rentlist_0_0_0_0_0_0_0_0_0_2_1_20_1.html?" + rentIptVal );
      menuSearchBox.submit();
    }
    $("#rentIpt").keyup(function (event) {
      if (event.keyCode == 13){
        rentSecach();
      }
    });
    $("#rentSecBtn").click(function(){
        rentSecach();
    });

    //资讯搜索
    function newsSecach(){
      var newsIptVal = encodeURIComponent($("#newsIpt").val());
       menuSearchBox.attr("action","http://app.fdc.com.cn/?app=search&controller=index&action=search&type=all&order=time&wd=" + newsIptVal );
       menuSearchBox.submit();
    }
    $("#newsIpt").keyup(function (event) {
      if (event.keyCode == 13){
        newsSecach();
      }
    });
    $("#newsSeacBtn").click(function(){
        newsSecach();
    });

    //家装
    function decoSecach(){
      var decoIptVal = encodeURIComponent($("#decoIpt").val());
       menuSearchBox.attr("action","http://shop.fdc.com.cn/index_soso.aspx");
       menuSearchBox.attr("method","post");
       menuSearchBox.submit();
    }
    $("#decoIpt").keyup(function (event) {
      if (event.keyCode == 13){
        decoSecach();
      }
    });
    $("#decoSerBtn").click(function(){
        decoSecach();
    });
})


// 2016-5-13修改底部广告位的显示关闭
function bottomAdvHide(){
  $(".bottom-adv").animate({left:"-100%"},500,function(){
    $(".bottom-adv .bottomadv-ctx").hide(0);
    window.setTimeout(function(){
      $(".fl_open_wrap").animate({left:"0"},1000);
    },500);
  });

};
$(".bottomadv-icon").click(function(){
  clearTimeout(bastimer);
  bottomAdvHide();
});
var bastimer;
$(".fl_open_wrap").click(function(){
  $(".fl_open_wrap").animate({left:"-100%"},500,function(){
    $(".bottom-adv .bottomadv-ctx").show(0);
    window.setTimeout(function(){
      $(".bottom-adv").animate({left:"0"},1000,function(){
        bastimer = setTimeout(function(){
          bottomAdvHide();
        },5000);
      });
    },500);
  });
});
$(window).load(function(){
  bastimer=setTimeout(function(){
    bottomAdvHide();
  },3000);
})


$(".right-banner li.banner-menu").hover(function(){
  $(this).find(".has-arrow").css("border-left-color","#F2F2F2");
  $(this).next().find(".has-arrow").css("border-left-color","#F2F2F2");
},function(){
  $(this).find(".has-arrow").css("border-left-color","#ddd");
  $(this).next().find(".has-arrow").css("border-left-color","#ddd");
});
$(".right-banner li.map-container").hover(function(){
  $(this).find(".lastli-map").css("border-left-color","#F2F2F2");
},function(){
  $(this).find(".lastli-map").css("border-left-color","#ddd");
});


$(".sidebar li").hover(function(){
  if($(this).find(".bar-link").size()<=0){
    $(this).children("a").find(".samebox").css("border-top-color","#fff");
    $(this).next().children("a").find(".samebox").css("border-top-color","#fff");
  }
  if($(this).hasClass("leftbar")){
    $(this).siblings("li").css("z-index","1");
  }
},function(){
  if($(this).find(".bar-link").size()<=0){
    $(this).children("a").find(".samebox").css("border-top-color","#ddd");
    $(this).next().children("a").find(".samebox").css("border-top-color","#ddd");
  }
  if($(this).hasClass("leftbar")){
    $(this).siblings("li").css("z-index","2");
  }
})

//多行文本输入框计算剩余字数
function checkMaxInput(obj, maxLen) {
    if (obj == null || obj == undefined || obj == "") {
        return;
    }
    if (maxLen == null || maxLen == undefined || maxLen == "") {
        maxLen = 100;
    }
    var strResult;
    var $obj = $(obj);
    var newid = $obj.attr("id") + 'msg';
    //如果输入的字数超过了限制
    if (obj.value.length > maxLen) {
        obj.value = obj.value.substring(0, maxLen);
        strResult = '<span style=\'color:red\' id="' + newid + '" class=\'max_msg\' >' + '字数上限</span>'; //计算并显示剩余字数
    }
    else {
        strResult = '<span id="' + newid + '" class=\'max_msg\' >' + obj.value.length + '/140</span>'; //计算并显示剩余字数
    }
    var $msg = $("#" + newid);
    if ($msg.length == 0) {
        $obj.after(strResult);
    }else{
        $msg.html(strResult);
    }
}



function getName(){
    var familyNames = new Array(
      "赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈",
      "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许",
      "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏",
      "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章",
      "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦",
      "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳",
      "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺",
      "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常",
      "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余",
      "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹"
    );
    var familySex=new Array("先生","先生","女士");
    var i = Math.round(Math.random()*99);
    var j = Math.round(Math.random()*2);
    var familyName = familyNames[i]+familySex[j];
    return familyName;
}
function getMoble() {
    var mobileArray = new Array("13", "15", "17", "18");
    var i = Math.round(Math.random()*3);
    var mobileArray = mobileArray[i]+Math.round(Math.random()*9)+"xxxx";
    for (var j = 0; j < 4; j++) {
        mobileArray = mobileArray + Math.floor(Math.random() * 10);
    }
    return mobileArray;
}
function loadMobileInfo(ulClassName){
  var phonehtml="";
  for(var i=0;i<10;i++){
    phonehtml += "<li>"+getName()+"<span class='user-phone'>"+getMoble()+"</span>"+"享用了该服务"+"</li>";
  }
  $('.'+ulClassName).prepend(phonehtml);
}
loadMobileInfo("wwjf-user");
loadMobileInfo("kft-user");
loadMobileInfo("kpt-user");
loadMobileInfo("pgpg-user");
jQuery(".had-answer").slide({mainCell:"ul",autoPage:true,interTime:3000,effect:"topLoop",autoPlay:true,vis:1,mouseOverStop:true});
jQuery(".wwjf-users").slide({mainCell:"ul",autoPage:true,interTime:3000,effect:"topLoop",autoPlay:true,vis:1,mouseOverStop:true});
jQuery(".kft-users").slide({mainCell:"ul",autoPage:true,interTime:3000,effect:"topLoop",autoPlay:true,vis:1,mouseOverStop:true});
jQuery(".kpt-users").slide({mainCell:"ul",autoPage:true,interTime:3000,effect:"topLoop",autoPlay:true,vis:1,mouseOverStop:true});
jQuery(".pgpg-users").slide({mainCell:"ul",autoPage:true,interTime:3000,effect:"topLoop",autoPlay:true,vis:1,mouseOverStop:true});
