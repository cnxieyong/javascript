"use strict";
/**
* shunzizhan 20160122 
* 浏览记录系列
* @type {Object}
*/
var browseHistory={
  /**
   * 浏览记录
   * @param  {[str]} uid   [用户id]
   * @param  {[int]} uType [用户类型，1 注册用户，2 匿名用户]
   * @return {[type]}       [description]
   */
  init:function(uid,uType){
    var url = window.location.href;
    var browseparams = browseHistory.browserInfo(url);
    browseparams.userid = uid;
    browseparams.url = url;
    browseparams.userType = uType;
    // browseparams.requrl="http://192.168.20.27/router/rest";
    if(browseparams.valuable){
      configTool.ajax1("ucaction.user.footprint.add","Get",browseparams,function(res,success){
        if(res[success]){
          console.log("ucaction》用户中心：浏览记录保存成功");
        }else{
          console.log("ucaction》用户中心："+res.error_response.msg);
        }
      })
    }
  },
  /**
   * shunzizhan 20160222
   * @param  {[string]} url [当前页面访问的url地址]
   * @return {[obj]}     [catagoryId 【新房：0001，二手房：0002，租房：0003，论坛：0004，资讯：0005】 
   *                          title: 需要存储的一些信息]
   */
  browserInfo:function(url){
    var type=url.split("//")[1].split(".")[0];
    var catagoryId = "0005";
    var o_infodetail={};
    switch(type){
      case "house":
        catagoryId="0001";
        o_infodetail.head = jQuery("#hd_buildname").val();
        o_infodetail.price = jQuery(".info-list b.ft-main").text();
        break;
      case "oldhouse":
        catagoryId="0002";
        o_infodetail.head = jQuery(".intro li").eq(1).text().split("：")[1];
        o_infodetail.address = jQuery(".intro li").eq(2).text().split("：")[1];
        o_infodetail.houseType = jQuery(".intro li.w210").eq(0).text().split("：")[1];
        o_infodetail.area = jQuery(".intro li.w210").eq(1).text().split("：")[1];
        o_infodetail.price = jQuery(".intro li").eq(0).find("em").text();
        break;
      case "zufang":
        catagoryId="0003";
        o_infodetail.head = jQuery(".intro li").eq(1).text().split("：")[1];
        o_infodetail.address = jQuery(".intro li").eq(2).text().split("：")[1];
        o_infodetail.houseType = jQuery(".intro li").eq(3).text().split("：")[1];
        o_infodetail.area = jQuery(".intro li").eq(4).text().split("：")[1];
        o_infodetail.price = jQuery(".intro li").eq(0).find("em").text();
        break;
      case "bbs":
        catagoryId="0004";
        o_infodetail.head = document.getElementById("thread_subject").innerText;
        break;
      case "news":
        o_infodetail.head = jQuery(".NewsArtbox .YH24").text();
        break;
      default :
        // 测试新房使用，正式环境删除
        // catagoryId="0001";
        // o_infodetail.head = jQuery("#hd_buildname").val();
        // o_infodetail.averagePrice = jQuery(".info-list b.ft-main").text();
        break;
    }
    if(o_infodetail.head.length>0){
      var valuable_info = true;
    }else{
      valuable_info = false;
    }
    return {catagoryId:catagoryId,valuable:valuable_info,title:JSON.stringify(o_infodetail)};
  }
}

jQuery(document).ready(function() {
  /**
   * shunzizhan 20160223
   * 1.判断uc_uc_cookie中是否存在用户id，如果没有
   *   1.1 调用生成匿名用户id，并将记录保存在匿名用户id下
   * 2.如果有，判断是否存在token
   *   2.1 如果没有token，则说明是上次生成的匿名用户
   *   2.1 如果有token，则是注册用户
   * @type {[type]}
   */
  var userInfo = decodeURIComponent(uc_cookie.Get("uc_userInfo"));
  userInfo = userInfo !="null" ? userInfo : "";
  if(userInfo =="" || userInfo =="undefined"){
    configTool.ajax1("ucaction.anonymous.create.anonymousID","Get",null,function(res,success){
      if(res[success]){
        uc_cookie.Set1("uc_userInfo", res[success].data.userid, null, null, null, null);
        var userType = 2;
        browseHistory.init(res[success].data.userid, userType);
      }else{
        console.log("生成匿名id错误"+res.error_response.msg)
      }
    })
  }else{
    var userType = 1;
    var token = decodeURIComponent(uc_cookie.Get("uc_token"));
    token = token !="null" ? token : "";
    if(token =="" || token =="undefined"){
      userType = 2;
    }
    browseHistory.init(userInfo, userType);
  }
})