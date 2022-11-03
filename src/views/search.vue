<template>
  <div>
    search_code_list
    <div :key="code.id" v-for="code in search_code_list">
      <hr>
      {{ code.repo_name }}
      {{code.name}}
      full_name {{code.full_name}}
      html_url  {{code.html_url}}
      description {{code.description}}
    </div>

    search_repositories_list
    <div :key="code.id" v-for="code in search_repositories_list">

      <hr>
      {{ code.repo_name }}
      {{code.name}}
      <a target="_blank" :href="code.html_url">{{code.html_url}}</a>
    
      html_url  {{code.html_url}}
      <div>   full_name {{code.full_name}} </div>
      <!-- description -->
      <div class="description">   {{code.description}}</div>
      <span  class="topic" :key="topic"   v-for="topic in code.topics" >{{topic}}</span>

      <!-- topics -->
    </div>

    search_code_test_get
    <el-button type="" @click="search_code_test_get"
      >search_code_test_get</el-button
    >

    get_article_detail
    <el-button type="" @click="get_article_detail"
      >get_article_detail</el-button
    >
  </div>
</template>

<script>
import method from "../util/method";
import strUtil from "../util/strUtil";
import Global from "../util/global";
import DateUtil from "../util/DateUtil";
import {
  codeError,
  apiMark,
  QuickVue,
  GITHUB_URL,
  dataGitHub,
  mock_serach_repos_res
} from "../common/common";
import util from "../util/util";
import FileUtil from "../util/FileUtil";
import DateShow from "../components/date-show";
// src\components
import axios from "axios";
// import {codeError} from "../common/common";
import { ElMessage } from "element-plus";
import $store from "../store/index";
// date-show
export default {
  components: {
    DateShow,
  },
  name: "GithubHome",
  methods: {
    // router.get('/article/detail', controller.article.detail);// 文章详情查询
    get_article_detail() {
      // method.get()

      let q = this.$route.query.q;
      let that = this;
      // search_code
      // method.get("gitPageRepo/getRepos",{})
      method
        .get("/article/detail", {
          q: q,
        })
        .then((res) => {
          console.log(res);
        });
    },
    search_code_test_get() {
      // method.get()

      let q = this.$route.query.q;
      let that = this;
      // search_code
      // method.get("gitPageRepo/getRepos",{})
      let  params= {
          // q: q,
        }
      method
        .get("gitPageRepo/search_code_test_get",params)
        .then((res) => {
          console.log(res);
        });
    },
    onNetUrlChange(value) {
      console.log("value");
      console.log(value);
      let netUrl = value;

      if (strUtil.checkUrl(netUrl)) {
        localStorage.setItem("netUrl", netUrl);
      }
      this.parseApi();
      //  console.log("index");
      //  console.log(index);
      //  console.log("indexItem");
      //  console.log(indexItem);
    },

    lookOneIssue() {
      var api =
        "https://api.github.com/repos/" +
        this.repoInfo.username +
        "/" +
        this.repoInfo.repopath +
        `/issues/${this.issueId}`;
      // /repos/{owner}/{repo}/issues/{issue_number}
      this.$router.push({
        path: "Issue",
        query: {
          repoName: "repoName",
          issueUrl: api,
        },
      });
    },
    getDashboard() {
      // 'http://81.68.204.179:8080/api'
      axios
        .post("http://81.68.204.179:8080/api/permit/user/dashboard", {})
        .then((resp) => {
          console.log(resp);

          //  this.  noticeList=resp.data.data.content
          if (resp && resp.data.code === 200) {
            // _this.menus = resp.data.result
            this.dashboardData = resp.data.data;
            console.log("ok");
          }
        });
    },
    onchange(e) {
      var $event = e || window.event;
      var files = $event.target.files;
      console.log("files");
      console.log(files);
      var fr = new FileReader();
      let that = this;
      fr.onload = function (e) {
        // console.log( fr.result );
        let sourceImgUrl = FileUtil.getFileBlob(fr.result);

        // sourceImgUrl = getFileBlob(fr.result);
        // this.upload(sourceImgUrl);
        that.upload(sourceImgUrl);
        // input.value = "";
      };
      fr.readAsDataURL(files[0]);
    },
    toLogin() {
      this.$router.push("Login");
    },

    upload(data) {
      /*
  FormData()
	创建一个新的 FormData 对象。
	FormData.append()
	向 FormData 中添加新的属性值，FormData 对应的属性值存在也不会覆盖原值，而是新增一个值，如果属性不存在则新增一项属性值。
  formData.append(name, value);
	formData.append(name, value, filename);

	name
	value中包含的数据对应的表单名称。
	value
	表单的值。可以是USVString 或 Blob (包括子类型，如 File)。
	filename 可选
	传给服务器的文件名称 (一个 USVString), 当一个 Blob 或 File 被作为第二个参数的时候， Blob 对象的默认文件名是 "blob"。 File 对象的默认文件名是该文件的名称。
  * */

      var fmData = new FormData();
      fmData.append("avatar", data, "avatar.png");
      // Global.axiosUrl + "issue/issues", data, jsonDic
      axios.post(`${Global.axiosUrl}uploadImg`, fmData).then((res) => {
        console.log(res);
        // var src = `http://localhost:7001${res.data.data[0]}`;
        var src = `${Global.axiosUrl}${res.data.data[0]}`;
        // var src = `http://localhost:7002${res.data.data[0]}`;
        console.log("src");
        console.log(src);
        this.imgSrc = src;
      });
    },

    toComic() {
      this.$router.push("Comic");
    },
    submitIssue() {
      this.auth = $store.state.auth;
      // this.questions = $store.state.questions;
      let data = {
        owner: this.username,
        repo: this.repo,
        title: this.postTitle,
        //  body: this.issuePost.body
        body: this.postIssue,
        auth: this.auth,
      };
      console.log("data");
      console.log(data);
      method
        .postV3("/issue/CreateIssue", data)
        .then((response) => {
          if (response.data.port === codeError) {
            this.$message.error("账号或者密码有误");
          } else {
            // this.issues=response.data.data;
            // this.tableData=response.data.data;
            let res = response.data.data;
            console.log("res");
            console.log(res);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.reposQuery.page = val;
      this.getRepos();
      this.currentPage = val;
    },

    handleSizeChangeGetIssues(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChangeGetIssues(val) {
      console.log(`当前页: ${val}`);
      // this.reposQuery.page = val;
      // this.getRepos();
      this.currentPageIssues = val;
      let pagePrams = {
        page: val,
        per_page: 10,
      };
      this.parseApi();
      this.getIssues(pagePrams);
    },

    toRepo(repoName) {
      this.$router.push("Login");
      // l="https://github.com/moshowgame/SpringBootCodeGenerator/releases/tag/2022.02.09"
      let urlGetRepo = strUtil.urlAdd(GITHUB_URL, repoName);
      // repoName是包括了 username 和仓库名字
      console.log("urlGetRepo");
      console.log(urlGetRepo);

      this.netUrl = urlGetRepo;
      this.parseApi();
      this.getIssuesDo();
    },
    toIssues(repoName) {
      // l="https://github.com/moshowgame/SpringBootCodeGenerator/releases/tag/2022.02.09"
      // let urlGetRepo = strUtil.urlAdd(GITHUB_URL, repoName);
      // console.log("urlGetRepo");
      // console.log(urlGetRepo);
      this.$router.push({ path: "issues", query: { repoName: repoName } });

      // this.netUrl = urlGetRepo;
      // this.parseApi();
      // this.getIssuesDo();
    },
    getIssuesDo(pagePrams) {
      if (this.api === null) {
        ElMessage.error("api 没有");
        return;
      }
      if (!pagePrams) {
        pagePrams = {
          page: 1,
          per_page: 10,
        };
      }
      var data = {
        url: strUtil.urlAdd(this.api, "issues"),
        per_page: pagePrams.per_page,
        page: pagePrams.page,
      };
      console.log("data");
      console.log(data);
      const jsonDic = {
        headers: {
          "Content-Type": "application/json;charset=utf-8", // 头部信息
        },
      };
      // Global
      axios
        .post(Global.axiosUrl + "issue/issues", data, jsonDic)
        .then((response) => {
          if (response.data.port === codeError) {
            // this.$message.error('账号或者密码有误');
            ElMessage.success("账号或者密码有误");
          } else {
            // this.issues=response.data.data;
            this.tableData = response.data.data;

            // console.log("this.issues")
            // console.log(this.issues)

            console.log("this.tableData");
            console.log(this.tableData);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getIssues() {
      if (this.canHit) {
        this.getIssuesDo();
        // 防抖
        this.canHit = false;
        var auth_timetimer = setInterval(() => {
          // this.timer--;
          this.canHit = true;
          clearInterval(auth_timetimer);
        }, 1000);
      }
    },
    getHistory() {
      method
        .postV3("/history/list", null)
        .then((response) => {
          if (response.data.port === codeError) {
            this.$message.error("账号或者密码有误");
          } else {
            // this.issues=response.data.data;
            // this.tableData=response.data.data;
            this.history = response.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    search_repositories() {
      if(this.doMock){
        // that.search_r
      let  res=mock_serach_repos_res
        this.search_repositories_list = res.data.data.data.items;
        return 
      }
      let q = this.$route.query.q;
      let that = this;
      // search_code
      // method.get("gitPageRepo/getRepos",{})
      let  service="repositories"
      method
      // .get(`gitPageRepo/search_${service}`,
        .get(`search/${service}`,
         {
          q: q,
        })
        .then((res) => {
          console.log(`gitPageRepo/search_${service} res`);
          console.log("res");
          console.log(res);
          console.log(res.data);
          // let  data=res.data
          //  let  search_code_list=data
          //  that.search_code_list=search_code_list
          // that.search_code_list = res.data.data;
          // that.search_code_list = res.data.data.data.items;
          that.search_repositories_list = res.data.data.data.items;
          // name
          console.log("that.search_code_list");
          console.log(that.search_code_list);
        
        });
    },

    search_code() {
      let q = this.$route.query.q;
      let that = this;
      // search_code
      // method.get("gitPageRepo/getRepos",{})
      method
        .get("gitPageRepo/search_code", {
          q: q,
        })
        .then((res) => {
          console.log("gitPageRepo/search_code res");
          console.log("res");
          console.log(res);
          console.log(res.data);
          // let  data=res.data
          //  let  search_code_list=data
          //  that.search_code_list=search_code_list
          // that.search_code_list = res.data.data;
          that.search_code_list = res.data.data.data.items;
          // name
          console.log("that.search_code_list");
          console.log(that.search_code_list);
        
        });
    },
    getRepos() {
      if (this.reposQuery.queryWord === null) {
        util.getMsg(this).error("输入要查询的");
        return;
      }

      this.getReposStatus = "查询中";
      method
        .postV3("gitPageRepo/getRepos", this.reposQuery)
        // method.post("gitPageRepo/getRepos", this.reposQuery, this)
        .then((response) => {
          if (response.data.code === codeError) {
            // response.data.msg;
            util.getMsg(this).error("getRepos 失败" + response.data.msg);
            // this.$message.error('getRepos 失败');
            // this.getReposStatus = "查询失败"
            this.getReposStatus = "查询失败，现在在后台轮询，请过几秒再重试";
          } else {
            this.getReposStatus = "查询成功";
            // this.issues=response.data.data;
            // this.tableData=response.data.data;
            this.git_page_repos = response.data.data;

            // console.log("this.issues")
            // console.log(this.issues)
            this.git_page_repos.forEach((o) => {
              if (o.repoName) {
                o.repo_name = o.repoName;
              }
            });
            console.log("this.git_page_repos");
            console.log(this.git_page_repos);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 问后台要的是一个接口 这个个数是要问github要的吧 因为他才是最新的
    //             reqIssNum(apiUrl) {
    //             可以让后端转发啊 后端做逻辑
    //             @de
    reqIssNum() {
      // 会传进来一个 evt
      // apiUrl=apiUrl||this.netUrl
      const apiUrl = this.netUrl;
      var total_issues;

      var that = this;
      this.$axios.get(apiUrl).then((res) => {
        //获取你需要用到的数据
        console.log("res");
        console.log(res);
        that.repoInfoGet = res;
        total_issues = res.open_issues;
      });
      this.total_issues = total_issues;

      console.log("Total issues: " + total_issues);
      return total_issues;
    },

    parseApi() {
      // parse
      // var urlSplit = crtUrl.split('/');
      var urlSplit = this.netUrl.split("/");
      //console.log(urlSplit);//list
      var username = urlSplit[3];
      var repopath = urlSplit[4];
      var repoInfo = this.repoInfo;
      repoInfo.username = username;
      repoInfo.repopath = repopath;
      // repoInfo.username = username;
      // repoInfo.repopath = repopath;
      console.log("repoInfo");
      console.log(repoInfo);
      var api = "https://api.github.com/repos/" + username + "/" + repopath;
      // /repos/{owner}/{repo}/issues/{issue_number}
      this.api = api;
      console.log("Get GitHub api URL:" + api);
      // return api;
      // apiMark
      localStorage.setItem(apiMark, api);
      // this.$cookies.set(apiMark,api);
    },

    makeUrl() {
      this.netUrl = `https://github.com/${this.username}/${this.repo}`;
      let api =
        "https://api.github.com/repos/" + this.username + "/" + this.repo;

      this.api = api;
    },

    // Commoc
    // 编辑操作
    onIssueClicked(index, row) {
      console.log("row.url");
      console.log(row.url);
      console.log("row.number");
      console.log(row.number);
      // issue 121
      // this.$router.push(row.url)
      // 传过去一个id
      // https://blog.csdn.net/sinat_17775997/article/details/68941091
      // 带查询参数，变成/backend/order?selected=2
      //                 this.$router.push({path: '/backend/order', query: {selected: "2"}});
      //                 this.$router.push({path: 'Issue', query: {issueId: row.issueId}});
      // 保存当前页面上data数据
      sessionStorage.setItem(dataGitHub, JSON.stringify(this.$data));

      this.$router.push({ path: "Issue", query: { issueId: row.number } });
    },

    onIssueClickedByRow(row) {
      console.log("row.url");
      console.log(row.url);
      console.log("row.number");
      console.log(row.number);
      // issue 121
      // this.$router.push(row.url)
      // 传过去一个id
      // https://blog.csdn.net/sinat_17775997/article/details/68941091
      // 带查询参数，变成/backend/order?selected=2
      //                 this.$router.push({path: '/backend/order', query: {selected: "2"}});
      //                 this.$router.push({path: 'Issue', query: {issueId: row.issueId}});
      // 保存当前页面上data数据
      sessionStorage.setItem(dataGitHub, JSON.stringify(this.$data));

      this.$router.push({ path: "Issue", query: { issueId: row.number } });
      // router.push({path: 'Issue', query: {issueId: row.number}})
      // $router.push 保存这个页面的数据
      // 链接是项目的 还是 github的
      // if(row.deleteFlag==1)
      // {
      //     this.$message.error("该单位不可用！");
      // }else{
      //     this.idx = index;
      //     this.form = row;
      //     this.editVisible = true;
      // }
    },
  },
  created() {
    let q = this.$route.query.q;
    // let q=    this.$route.path.q
    console.log("q", q);
    // this.search_code();
    this.search_repositories()
  },
  data() {
    
    return {
      doMock:true,
      search_code_word: null,
      search_code_list: [
        {
          id: 1,
          repo_name: "TheAlgorithms/Python",
          page: null,
          sketch: "All Algorithms implemented in Python",
          topics:
            '["python","hacktoberfest","education","algorithm","practice","interview","sorting-algorithms","learn","algos","algorithm-competitions","sorts","algorithms-implemented","community-driven","searches"]',
          star: "130k",
          query_word: null,
          create_time: null,
        },
      ],
      search_repositories_list:[],
      issueId: 1,
      // <el-pagination
      //   @size-change="handleSizeChange"
      //   @current-change="handleCurrentChange"
      //   :current-page="currentPage"
      currentPageIssues: 1,
      getIssuesPage: {},
      imgSrc: "http://starplatinumora.top/images/1581927163111766.jpg",
      auth: null,
      repoInfoGet: null,
      total_issues: null,
      api: null,
      // netUrl:null,
      // netUrl: "https://github.com/moshowgame/SpringBootCodeGenerator",
      // netUrl: netUrl || "https://github.com/starplatinum3/starplatinum",
      repoInfo: {},
     
      getReposStatus: "请输入查询",
      postIssue: null,
      username: null,
      repo: null,
      postTitle: null,
      currentPage: 1,
    };
  },
};
</script>

<!--其他地方定义的 css 不引入的话 应该不行的吧-->
<style type="text/css">
.white {
  color: white;
}
.center {
  text-align: center;
}
.get-issue-btn-row {
  margin-top: 10px;
  margin-bottom: 10px;
}
.btn-margin {
  margin-top: 10px;
  margin-bottom: 10px;
}
/* .get-issue-btn-row{
    margin-top: 10px;
    margin-bottom: 10px;
} */
.time {
  display: flex;
  flex-direction: row;
  font-size: 50%;
  margin-top: 10px;
}

.created_at {
  margin-right: 10px;
  margin-left: 5px;
}
.updated_at {
  margin-right: 10px;
  margin-left: 5px;
}

.elliptical-background {
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  font-size: 20px;
  border: 1px red solid;
  border-radius: 50px;
  background-color: bisque;
}
.open-bg {
  /* width: 200px;
  height: 200px; */
  /* width: 100px;
  height: 50px; */
  width: 80px;
  height: 30px;
  /* line-height: 200px; */
  /* line-height: 100px; */
  /* line-height: 50px; */
  line-height: 30px;
  text-align: center;
  /* font-size: 20px; */
  font-size: 5px;
  border: 1px greenyellow solid;
  border-radius: 50px;
  background-color: rgb(213, 255, 196);
}

.img-container {
  /* width: 20px;
  height: 20px; */

  width: 100px;
  height: 100px;
}
.username {
  /* 加粗 */
  font-weight: bold;
  margin-right: 5px;
}

.description{
  font-size: 20px;
  color: gray;
}
.topic{
  /* border-radius: 50%; */
  margin-right: 10px;
  border-radius: 20px;
  background-color: aquamarine;
}
</style>
