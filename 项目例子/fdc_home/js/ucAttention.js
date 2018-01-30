"use strict";
/**
* shunzizhan 20160224 
* 我的关注系列
* @type {Object}
*/
var isAttention = null;
var ucAttention={
  params:null,
  init:function(uid,uType){
    var url = window.location.href;
    var attentionparams = ucAttention.attentionInfo(url);
    attentionparams.userid = uid;
    attentionparams.url = url;
    attentionparams.userType = uType;
    // attentionparams.requrl="http://192.168.20.27/router/rest";
    ucAttention.params = attentionparams;
    if(attentionparams.attentionId!=""){
      configTool.ajax1("ucaction.user.attention.judge","Get",attentionparams,function(res,success){
        if(res[success]){
          if(res[success].data=="1"){
            isAttention = true;
            jQuery(".uc-attention").addClass('uc-attention-check');
            jQuery(".uc-attention").html("<em></em>已关注");
            console.log("该页面已被关注……");
          }else{
            jQuery(".uc-attention").removeClass('uc-attention-check');
            isAttention = false;
            jQuery(".uc-attention").html("<em></em>关注");
            console.log("该页面未被关注……");
          }
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
  attentionInfo:function(url){
    var type=url.split("//")[1].split(".")[0];
    var o_infodetail={
      attentionType: "0005"
    };
    switch(type){
      case "house":
        o_infodetail.attentionType="0001";
        o_infodetail.attentionId = jQuery("#hd_baseid").val();
        o_infodetail.attentionName = jQuery("#hd_buildname").val();
        break;
      case "oldhouse":
        o_infodetail.attentionType="0002";
        o_infodetail.attentionId = jQuery(".title ul li span em").eq(0).text();
        o_infodetail.attentionName = jQuery(".intro li").eq(1).text().split("：")[1];
        break;
      case "zufang":
        catagoryId="0003";
        o_infodetail.attentionType="0003";
        o_infodetail.attentionId = jQuery(".title ul li span em").eq(0).text();
        o_infodetail.attentionName = jQuery(".intro li").eq(1).text().split("：")[1];
        break;
      // case "bbs":
      //   o_infodetail.attentionType="0004";
      //   o_infodetail.attentionId = ;
      //   o_infodetail.attentionName = ;
      //   break;
      case "news":
        var tepmid = url.split("/");
        o_infodetail.attentionType="0005";
        o_infodetail.attentionId = tepmid[tepmid.length-1].split(".")[0];
        o_infodetail.attentionName = jQuery(".NewsArtbox .YH24").text();
        break;
      default :
        // o_infodetail.attentionType="0001";
        // o_infodetail.attentionId = jQuery("#hd_baseid").val();
        // o_infodetail.attentionName = jQuery("#hd_buildname").val();
        break;
    }
    return o_infodetail;
  }
}
// jQuery(".uc-attention").click(function(event) {
// jQuery("body").on('click', '.uc-attention', function(){
//   /* Act on the event */
//   console.log("uc-attention");
//   if(!jQuery(".uc-attention").hasClass('uc-attention-check')){
//     configTool.ajax1("ucaction.user.attention.add","Get",ucAttention.params,function(res,success){
//       if(res[success]){
//         console.log("ucaction》用户中心》新增关注成功");
//         jQuery(".uc-attention").addClass('uc-attention-check');
//         jQuery(".uc-attention").html("<em></em>已关注");
//       }else{
//         console.log("ucaction》用户中心："+res.error_response.msg);
//       }
//     })
//   }
// });

jQuery(document).ready(function() {
  //资讯添加
  if(jQuery('.txtLaiy .uc-attention').length<1){
    jQuery('.txtLaiy').append('<a href="javascript:void(0)" rel="nofollow" class="uc-attention fr"><em></em>关注</a>')
  }
  /**
   * shunzizhan 20160223
   * 1.判断cookie中是否存在用户id，如果没有
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
        ucAttention.init(res[success].data.userid, userType);
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
    ucAttention.init(userInfo, userType);
  }

  // jQuery(".uc-attention").click(function(event) {
  jQuery("body").on('click', '.uc-attention', function(){
    /* Act on the event */
    console.log("uc-attention");
    if(isAttention !=null && !jQuery(".uc-attention").hasClass('uc-attention-check')){
      configTool.ajax1("ucaction.user.attention.add","Get",ucAttention.params,function(res,success){
        if(res[success]){
          console.log("ucaction》用户中心》新增关注成功");
          jQuery(".uc-attention").addClass('uc-attention-check');
          jQuery(".uc-attention").html("<em></em>已关注");
        }else{
          console.log("ucaction》用户中心："+res.error_response.msg);
        }
      })
    }
  });
})