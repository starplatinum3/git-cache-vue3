<template>
  <div>
    <el-input v-model="search_code_word"></el-input>
    <el-button type="primary" @click="search_code" class="submit"
      >search_code</el-button
    >

    <el-button type="primary" @click="search_code_go" class="submit"
      >search_code</el-button
    >
    <div class="">网址</div>
    <el-input v-model="netUrl" @change="onNetUrlChange"></el-input>

    <el-button type="primary" @click="getIssues" class="submitBtn"
        >获取issues</el-button
      >
      
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChangeIssues"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout=" prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    <view></view>
    <el-card :key="rowData.id" v-for="rowData in tableData">
      <!-- <p>{{ rowData.title }}</p> -->

      <!-- <p>{{ rowData.user.login }}</p> -->
      <div>{{ rowData.title }}</div>

      <div class="time">
        <!-- <div>{{ DateUtil.format(rowData.created_at,"yyyy-MM-dd hh:mm:ss")  }}</div> -->
        <!-- <div>{{ rowData.created_at .format("yyyy-MM-dd hh:mm:ss") }}</div> -->
        <!-- <div>{{ rowData.updated_at }}</div> -->
        <div class="username">{{ rowData.user.login }}</div>
        创建于
        <DateShow class="created_at" :date="rowData.created_at"></DateShow>
        更新于
        <DateShow class="updated_at" :date="rowData.updated_at"></DateShow>
        <!-- <div class="elliptical-background">{{ rowData.state }}</div> -->
        <div class="open-bg">{{ rowData.state }}</div>
      </div>
      <!-- <p>{{ rowData.created_at }}</p>
      <p>{{ rowData.updated_at }}</p> -->
      <!--            @click="onIssueClicked(scope.$index, scope.row)"-->
      <el-button
        type="text"
        icon="el-icon-edit"
        @click="onIssueClickedByRow(rowData)"
        >链接</el-button
      >
      html_url
      {{ rowData.html_url }}
    </el-card>

    
    search_code_list
    <div :key="code.id" v-for="code in search_code_list">{{ code.repo_name }}</div>
   
    <!--    https://blog.csdn.net/woshisangsang/article/details/113539967-->
    用户名<el-input v-model="username"></el-input> 仓库名字
    <el-input v-model="repo"></el-input>

    <!-- <el-row>
    <el-input v-model="username">用户名</el-input>
</el-row>
<el-row>
    仓库名字  <el-input v-model="repo"></el-input>
</el-row> -->

    <el-button type="primary" @click="makeUrl" class="submit"
      >makeUrl</el-button
    >
    <!-- <div class="white">网址</div> -->
    <div class="">网址</div>
    <el-input v-model="netUrl" @change="onNetUrlChange"></el-input>
    <div class="">issue id</div>
    <el-input v-model="issueId"></el-input>

    <div class="center btn-margin">
      <el-button type="primary" @click="parseApi" class="submitBtn"
        >解析</el-button
      >
      <!-- <el-button type="primary" @click="reqIssNum" class="submitBtn">reqIssNum</el-button> -->
      <el-button type="primary" @click="getIssues" class="submitBtn"
        >获取issues</el-button
      >
      <el-button type="primary" @click="lookOneIssue" class="submitBtn"
        >lookOneIssue</el-button
      >
      <!-- <el-button type="primary" @click="getHistory" class="submitBtn">历史记录</el-button> -->
    </div>

    <!-- getIssuesPage -->
    <el-pagination
      @size-change="handleSizeChangeGetIssues"
      @current-change="handleCurrentChangeGetIssues"
      :current-page="currentPageIssues"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout=" prev, pager, next, jumper"
      :total="400"
    ></el-pagination>

    <el-card>
      <!-- <p>total_issues : {{ total_issues }}</p>
      <p>api : {{ api }}</p> -->

      <div>total_issues : {{ total_issues }}</div>
      <div>api : {{ api }}</div>
      <!--    获取issues 是/获取issues-->

      <div>历史记录</div>
      <!--    <div v-for="his in history">{{his.url}}</div>-->
      <div :key="his.url" v-for="his in history">{{ his.url }}</div>
   
    </el-card>
    <el-card>
    
      <div>queryWord</div>
      <el-input class="center" v-model="reposQuery.queryWord"></el-input>

<el-button @click="search_code">search_code</el-button>
     
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout=" prev, pager, next, jumper"
        :total="400"
      ></el-pagination>

      <div class="center">
        <!-- <el-input v-model="reposQuery.queryWord"></el-input> -->

        <el-button type="primary" @click="getRepos" class="submitBtn btn-margin"
          >浏览仓库</el-button
        >
      </div>
      <div>{{ getReposStatus }}</div>
    </el-card>
    <!--    <div class="white" :key="" v-for="repo  in git_page_repos">-->
    <div class="white" :key="repo.id" v-for="repo in git_page_repos">
      <el-card>
   

        <el-button
          @click="toIssues(repo.repo_name)"
          type="text"
          class="button"
          >{{ repo.repo_name }}</el-button
        >

      
        <div>{{ repo.sketch }}</div>

        <div>star {{ repo.star }}</div>
        <div>主题 {{ repo.topics }}</div>
      </el-card>
    </div>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入标题"
      v-model="postTitle"
    ></el-input>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="postIssue"
    ></el-input>
    <el-button type="primary" @click="submitIssue" class="submit"
      >提交issue</el-button
    >
    <el-button type="primary" @click="toLogin" class="submit"
      >toLogin</el-button
    >
    <el-button type="primary" @click="toComic" class="submit"
      >toComic</el-button
    >

    <div class="upload-btn">上传图片</div>
    <!-- <input @onchange="onchange" type="file" id="fileinput" /> -->
    <input @change="onchange" type="file" id="fileinput" />
    <img :src="imgSrc" class="img-container" />

    <el-button type="primary" @click="getDashboard" class="submit"
      >getDashboard</el-button
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
  
      var api = "https://api.github.com/repos/" +     this.repoInfo.username + "/" +  
      this.repoInfo.repopath+`/issues/${this.issueId}`;
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
    handleCurrentChangeIssues(val) {
      console.log(`当前页: ${val}`);
      this.reposQuery.page = val;
      // this.getRepos();
      // this.getIssuesDo()
      this.getIssues()
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
    search_code_go(){
      let router=this.$router
      router.push({ name: 'search', query: { q: this.search_code_word } })
    },
    search_code(){
      let that=this
      method.get("gitPageRepo/getRepos",{})
      .then(res => {
        console.log("gitPageRepo/getRepos res" );
        console.log("res");
        console.log(res);
        console.log(res.data);
        // let  data=res.data
      //  let  search_code_list=data
      //  that.search_code_list=search_code_list
       that.search_code_list=res.data.data
       console.log("that.search_code_list");
       console.log( that.search_code_list);
        let resExampale={
    "data": {
        "code": 200,
        "data": [
            {
                "id": 1,
                "repo_name": "TheAlgorithms/Python",
                "page": null,
                "sketch": "All Algorithms implemented in Python",
                "topics": "[\"python\",\"hacktoberfest\",\"education\",\"algorithm\",\"practice\",\"interview\",\"sorting-algorithms\",\"learn\",\"algos\",\"algorithm-competitions\",\"sorts\",\"algorithms-implemented\",\"community-driven\",\"searches\"]",
                "star": "130k",
                "query_word": null,
                "create_time": null
            },
            {
                "id": 2,
                "repo_name": "geekcomputers/Python",
                "page": null,
                "sketch": "My Python Examples",
                "topics": "[]",
                "star": "24.7k",
                "query_word": null,
                "create_time": null
            },
            {
                "id": 3,
                "repo_name": "walter201230/Python",
                "page": null,
                "sketch": "最良心的 Python 教程：",
                "topics": "[\"python\",\"python3\"]",
                "star": "11.5k",
                "query_word": null,
                "create_time": null
            },
            {
                "id": 4,
                "repo_name": "injetlee/Python",
                "page": null,
                "sketch": "Python脚本。模拟登录知乎， 爬虫，操作excel，微信公众号，远程开机",
                "topics": "[\"python\",\"crawler\",\"excel\",\"wechat\"]",
                "star": "7.5k",
                "query_word": null,
                "create_time": null
            },
            {
                "id": 5,
                "repo_name": "kubernetes-client/python",
                "page": null,
                "sketch": "Official Python client library for kubernetes",
                "topics": "[\"kubernetes\",\"k8s\",\"library\",\"client-python\",\"k8s-sig-api-machinery\"]",
                "star": "4.6k",
                "query_word": null,
                "create_time": null
            },
            {
                "id": 6,
                "repo_name": "Show-Me-the-Code/python",
                "page": null,
                "sketch": "Show Me the Code Python version.",
                "topics": "[]",
                "star": "3.3k",
                "query_word": null,
                "create_time": null
            },
            {
                "id": 7,
                "repo_name": "xxg1413/python",
                "page": null,
                "sketch": "Python Books && Courses",
                "topics": "[\"python\",\"learning-python\",\"python-book\",\"python-course\"]",
                "star": "2.6k",
                "query_word": null,
                "create_time": null
            },
            {
                "id": 8,
                "repo_name": "jakevdp/PythonDataScienceHandbook",
                "page": null,
                "sketch": "Python Data Science Handbook: full text in Jupyter Notebooks",
                "topics": "[\"python\",\"numpy\",\"scikit-learn\",\"jupyter-notebook\",\"pandas\",\"matplotlib\"]",
                "star": "32.7k",
                "query_word": null,
                "create_time": null
            },
            {
                "id": 9,
                "repo_name": "joeyajames/Python",
                "page": null,
                "sketch": "Python code for YouTube videos.",
                "topics": "[]",
                "star": "1.2k",
                "query_word": null,
                "create_time": null
            },
            {
                "id": 10,
                "repo_name": "docker-library/python",
                "page": null,
                "sketch": "Docker Official Image packaging for Python",
                "topics": "[]",
                "star": "1.8k",
                "query_word": null,
                "create_time": null
            }
        ],
        "msg": ""
    },
    "status": 200,
    "statusText": "OK",
    "headers": {
        "content-length": "2291",
        "content-type": "application/json; charset=utf-8"
    },
    "config": {
        "transformRequest": {},
        "transformResponse": {},
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "headers": {
            "Accept": "application/json, text/plain, */*"
        },
        "method": "get",
        "params": {},
        "url": "http://localhost:7001/gitPageRepo/getRepos"
    },
    "request": {}
}
      })
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
    let dataObj = sessionStorage.getItem(dataGitHub);
    if (dataObj === null) {
      console.log("没有");
      return;
    }

    //  this.netUrl= localStorage.getItem("netUrl");
    let netUrl = localStorage.getItem("netUrl");
    console.log("赋值");
    // 获取源数据
    let data = JSON.parse(dataObj);
    // Object.assign方法 赋值 （目标对象， 源对象）
    Object.assign(this, data);
  },
  data() {
    let netUrl = localStorage.getItem("netUrl");

    let git_page_repo = {
      repoName: "repo_name",
      page: "page",
      sketch: "sketch",
      topics: "topics",
      star: "star",
      queryWord: "query_word",
    };
    let reposQuery = {
      page: 1,
      queryWord: null,
    };
    let git_page_repos = [
      // git_page_repo,
      {
        id: 21,
        repoName: "Louiszhai/tool",
        sketch: "开发效率提升：Mac生产力工具链推荐",
        topics: '["mac","tool"]',
        star: "5.1k",
        queryWord: "tool",
        page: null,
      },
    ];
    let issue = {
      assignees: [],
      created_at: "2021-09-29T07:41:49Z",
      title: "支持大佬，求在mybatis里加入批量插入接口",
      body: null,
      labels_url:
        "https://api.github.com/repos/moshowgame/SpringBootCodeGenerator/issues/121/labels{/name}",
      author_association: "NONE",
      number: 121,
      updated_at: "2021-09-29T07:41:49Z",
      performed_via_github_app: null,
      comments_url:
        "https://api.github.com/repos/moshowgame/SpringBootCodeGenerator/issues/121/comments",
      active_lock_reason: null,
      repository_url:
        "https://api.github.com/repos/moshowgame/SpringBootCodeGenerator",
      id: 1010607155,
      state: "open",
      locked: false,
      timeline_url:
        "https://api.github.com/repos/moshowgame/SpringBootCodeGenerator/issues/121/timeline",
      comments: 0,
      closed_at: null,
      url: "https://api.github.com/repos/moshowgame/SpringBootCodeGenerator/issues/121",
      labels: [],
      milestone: null,
      events_url:
        "https://api.github.com/repos/moshowgame/SpringBootCodeGenerator/issues/121/events",
      html_url:
        "https://github.com/moshowgame/SpringBootCodeGenerator/issues/121",
      reactions: {
        confused: 0,
        "-1": 0,
        total_count: 0,
        "+1": 0,
        rocket: 0,
        hooray: 0,
        eyes: 0,
        url: "https://api.github.com/repos/moshowgame/SpringBootCodeGenerator/issues/121/reactions",
        laugh: 0,
        heart: 0,
      },
      assignee: null,
      user: {
        gists_url: "https://api.github.com/users/xuhao199224/gists{/gist_id}",
        repos_url: "https://api.github.com/users/xuhao199224/repos",
        following_url:
          "https://api.github.com/users/xuhao199224/following{/other_user}",
        starred_url:
          "https://api.github.com/users/xuhao199224/starred{/owner}{/repo}",
        login: "xuhao199224",
        followers_url: "https://api.github.com/users/xuhao199224/followers",
        type: "User",
        url: "https://api.github.com/users/xuhao199224",
        subscriptions_url:
          "https://api.github.com/users/xuhao199224/subscriptions",
        received_events_url:
          "https://api.github.com/users/xuhao199224/received_events",
        avatar_url: "https://avatars.githubusercontent.com/u/2443665?v=4",
        events_url: "https://api.github.com/users/xuhao199224/events{/privacy}",
        html_url: "https://github.com/xuhao199224",
        site_admin: false,
        id: 2443665,
        gravatar_id: "",
        node_id: "MDQ6VXNlcjI0NDM2NjU=",
        organizations_url: "https://api.github.com/users/xuhao199224/orgs",
      },
      node_id: "I_kwDOCMCWTc48PKQz",
    };
    var issues = [
      // {
      //   title: "111",
      //   url: "url",
      //   issueId: 111,
      //   user:{
      //     login:"dada"
      //   }
      // },
      issue,
    ];
    var originData = [
      {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
      },
      {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄",
      },
      {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄",
      },
      {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄",
      },
    ];

    return {
      search_code_word:null,
      search_code_list:[
        {
                "id": 1,
                "repo_name": "TheAlgorithms/Python",
                "page": null,
                "sketch": "All Algorithms implemented in Python",
                "topics": "[\"python\",\"hacktoberfest\",\"education\",\"algorithm\",\"practice\",\"interview\",\"sorting-algorithms\",\"learn\",\"algos\",\"algorithm-competitions\",\"sorts\",\"algorithms-implemented\",\"community-driven\",\"searches\"]",
                "star": "130k",
                "query_word": null,
                "create_time": null
            },
      ],
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
      netUrl: netUrl || "https://github.com/starplatinum3/starplatinum",
      repoInfo: {},
      tableData: issues,
      // tableData: null,
      canHit: true,
      history: null,
      git_page_repo: git_page_repo,
      git_page_repos: git_page_repos,
      // git_page_repos: null,
      reposQuery: reposQuery,
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
</style>
