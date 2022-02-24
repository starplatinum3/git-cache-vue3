import method from "./method";
import Vue from 'vue'
import strUtil from "./strUtil";
const IssueRequest = {
  reqIssNum:reqIssNum,
  reqIssData:reqIssData,
  reqIssComments:reqIssComments,
}

// 问后台要的是一个接口 这个个数是要问github要的吧 因为他才是最新的
function reqIssNum (apiUrl) {
  var total_issues;
  method.post()
  // Vue

  // https://segmentfault.com/a/1190000016653561
  // this.$axios.get(this.GLOBAL.host.+“后台接口地址”,{
  // strUtil.urlAdd(Vue._api,)
  // this.$axios.get(Vue._api+“后台接口地址”,{
  //   params:{
  //     phone:12345678   //参数，键值对，key值：value值
  //     name:hh
  //   }
  // }).then(res => {
  //   //获取你需要用到的数据
  // });
  $.ajax({
    url: apiUrl,
    type: "GET",
    async: false,
    success: function (repoInfo) {
      total_issues = repoInfo.open_issues;
    }
  });

  console.log("Total issues: " + total_issues);
  return total_issues;
}


function reqIssData (apiUrl, pageNO) {
  var oriData;
  $.ajax({
    url: apiUrl + "/issues?page=" + pageNO,
    type: "GET",
    async: false,
    //dataType: "jsonp",
    success: function (issueInfo) {
      console.log("issueInfo");
      console.log(issueInfo);
      var pageIssuesNum = issueInfo.length;
      if (pageNO == 1) {
        repoInfo.newest = issueInfo[0].number;
      }
      if (pageIssuesNum == undefined) {
        $("#status").text("Request failed.");
        return;
      }
      oriData = issueInfo;
    }
  });
  return oriData;
}


function reqIssComments (comments_url) {
  var oriData;
  $.ajax({
    url: comments_url,
    type: "GET",
    async: false,
    //dataType: "jsonp",
    success: function (issueInfo) {
      console.log("issueInfo");
      console.log(issueInfo);
      // if(issueInfo.length)
      var pageIssuesNum = issueInfo.length;

      if (pageIssuesNum == undefined) {
        $("#status").text("Request failed.");
        return;
      }

      // 没有评论数据
      if (pageIssuesNum == 0) {
        return
      }
      // issueInfo
      let cmts = []
      // "created_at": "2021-02-27T20:24:06Z",
      // "updated_at": "2021-02-27T20:24:06Z",
      for (let cmt of issueInfo) {
        var newCmt = {
          user: cmt.user.login,
          // cmts
          created_at: cmt.created_at,
          updated_at: cmt.updated_at,
          body: cmt.body,
        }
        cmts.push(newCmt)

      }
      // if (pageNO == 1) {
      //     repoInfo.newest = issueInfo[0].number;
      // }
      // if (pageIssuesNum == undefined) {
      //     $("#status").text("Request failed.");
      //     return;
      // }
      // oriData = issueInfo;
      oriData = cmts;
    }
  });
  return oriData;
}

export default IssueRequest
