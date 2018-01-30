"use strict";

/**
* shunzizhan 20160224 
* 搜索记录系列
* @type {Object}
*/
var ucSearch={
  
  init:function(uid,uType){
    var url = window.location.href;
    // var tempkeyword = url.split('?');
    var searchparams = ucSearch.searchInfo();
    if(searchparams.keyWord.length>0){  
      searchparams.userid = uid;
      // searchparams.keyWord = decodeURIComponent(tempkeyword[1]).replace(/^\s+/,"");
      searchparams.url = decodeURIComponent(url);
      searchparams.userType = uType;
      // searchparams.requrl="http://192.168.20.27/router/rest";
      if(searchparams.keyWord.length>0){
        configTool.ajax1("ucaction.user.searchprint.add","Get",searchparams,function(res,success){
          if(res[success]){
            console.log("ucaction》用户中心：我的搜索保存成功");
          }else{
            console.log("ucaction》用户中心："+res.error_response.msg);
          }
        })
      }else{
        console.log("搜索记录为空，没有保存");
      }
    }
  },
  /**
   * shunzizhan 20160222
   * @param  {[string]} url [当前页面访问的url地址]
   * @return {[obj]}     [catagoryId 【新房：0001，二手房：0002，租房：0003，论坛：0004，资讯：0005】 
   *                          title: 需要存储的一些信息]
   */
  searchInfo:function(){
    // var type=url.split("//")[1].split(".")[0];
    var type=window.location.host.split('.')[0],
        wd = window.location.search.replace('?',"");
    var o_infodetail={
      catagoryId: "0005",
      keyWord:decodeURIComponent(wd)
    };
    switch(type){
      case "house":
        o_infodetail.catagoryId="0001";
        break;
      case "oldhouse":
        o_infodetail.catagoryId="0002";
        break;
      case "zufang":
        catagoryId="0003";
        break;
      case "news":
        o_infodetail.catagoryId="0005";
        break;
      default :
        // 资讯搜索 app.fdc.com.cn
        
        break;
    }
    return o_infodetail;
  }
}
jQuery(document).ready(function() {
  /**
   * shunzizhan 20160223
   * 1.判断uc_cookie中是否存在用户id，如果没有
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
        ucSearch.init(res[success].data.userid, userType);
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
    ucSearch.init(userInfo, userType);
  }
})