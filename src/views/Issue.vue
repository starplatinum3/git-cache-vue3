<template>
  <div class="white">
    <!--    <h2>{{title}}</h2>-->
    <!--    <p> {{content}}</p>-->
    <el-card style="margin-bottom: 20px">
    <div style="margin-left: 20px">

      <h2>{{issue.title}}</h2>
<!--      <p> {{issue.body}}</p>-->
<!--      <vue-markdown>i am a ~~tast~~ **test**.</vue-markdown>-->
      <vue-markdown>{{issue.body}}</vue-markdown>

      <p> api {{api}}</p>
      <p> issue number {{issue.number}}</p>
      <p> issue state {{issue.state}}</p>
      <p> issue createdAt {{issue.createdAt}}</p>
      <p> issue updatedAt {{issue.updatedAt}}</p>
      <p> issue closedAt {{issue.closedAt}}</p>
      <p> issue authorAssociation {{issue.authorAssociation}}</p>
      <p> issue 用户 {{issue.user.login}}</p>
      <p> issue reactions totalCount {{issue.reactions.totalCount}}</p>
      <!--    <p> {{issue.title}}</p>-->
    </div>
    </el-card>
    <el-table
      :data="tableData"
      style="width: 100%">
      <!--      <el-table-column-->
      <!--        prop="date"-->
      <!--        label="日期"-->
      <!--        width="180">-->
      <!--      </el-table-column>-->
      <el-table-column
        prop="title"
        label="标题"
        width="500">
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="postTest" class="submitBtn">postTest</el-button>

    <div>
      <div>评论标题</div>
      <div>评论内容</div>
      <div>鼓掌</div>
      <div>角色</div>
    </div>
    <el-button type="primary" @click="toGithub" class="submitBtn">返回github首页</el-button>


    <p>回复</p>
    <p> 评论数 {{issue.comments}}</p>
    <!--    <div v-for="cm"></div>-->
    <div v-for="comment in comments">
      <!--      {{ tab.text }}-->
      <el-card>
        <!--        <div>评论标题</div>-->
        <!--        <div>评论内容</div>-->
        <!--        <div>鼓掌</div>-->
        <!--        <div>角色</div>-->
        <!--        <div>{{comment.title}}</div>-->
        <div>{{comment.body}}</div>
        <!--        <div>用户: {{comment.user.login}}</div>-->
        用户: {{comment.user.login}}
<!--        创建时间：{{comment.created_at}}-->
<!--        更新时间：{{comment.updated_at}}-->
        创建时间：{{comment.createdAt}}
        更新时间：{{comment.updatedAt}}

        <!--        <div>{{comment.created_at}}</div>-->
      </el-card>
    </div>

    <!--    <el-card></el-card>-->

  </div>

</template>

<script>
    import method from "../util/method";
    import {apiMark, codeError, RouteMark} from "../common/common";
    import util from "../util/util";
    import strUtil from "../util/strUtil";
    import router from "../router";
    import VueMarkdown from 'vue-markdown' // production
    export default {
        components: {
            VueMarkdown
        },
        // 代码来自
        // G:\project\JSProject\gissue.github.io\js\gissue.js
        methods: {
            getComments() {
                // let api = localStorage.getItem(apiMark)
                // console.log("api")
                // console.log(api)
                let api =   this.api
                // api.
                // this.$router
                // this.$router query 获取
                // let age = this.$route.query.age; //问号后面参数会被封装进 this.$route.query;
                let issueId = this.$route.query.issueId;

                console.log("issueId")
                console.log(issueId)
                //
                let url = strUtil.urlAdd(api, `/issues/${issueId}/comments`)
                // let urlGetIss=  strUtil.urlAdd(api,`/issues/${issueId}`)

                let data = {
                    commentsUrl: url
                }
                method.post("/comment/comments", data, this).then(response => {
                    console.log("response")
                    console.log(response)

                    if (response.data.code === codeError) {
                        this.$message.error('账号或者密码有误');
                    } else {
                        // this.$message.success('登录成功');
                        this.comments = response.data.data
                        console.log("this.comments")
                        console.log(this.comments)
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            parseApi(crtUrl) {
                var urlSplit = crtUrl.split('/');
                //console.log(urlSplit);//list
                var username = urlSplit[3];
                var repopath = urlSplit[4];
                var repoInfo = this.repoInfo
                repoInfo.username = username;
                repoInfo.repopath = repopath;
                // repoInfo.username = username;
                // repoInfo.repopath = repopath;
                var api = "https://api.github.com/repos/" + username + "/" + repopath;

                console.log("Get GitHub api URL:" + api);
                return api;
            },
            toGithub(){
                // router.routes.na
                // RouteMark.Github
                // this.$router.push({path:  RouteMark.Github, query: {issueId: row.number}});
                this.$router.push({path:  RouteMark.Github});
            },
            postTest() {
                var user = {
                    login: "login",
                    nodeId: "nodeId"
                }
                var userStr = JSON.stringify(user)
                var issueForm = {
                    "activeLockReason": "string",
                    "assignee": "string",
                    "assignees": "string",
                    "authorAssociation": "string",
                    "body": "string",
                    "closedAt": "2022-02-09T09:55:46.631Z",
                    "comments": 0,
                    "commentsUrl": "string",
                    "createdAt": "2022-02-09T09:55:46.631Z",
                    "date": "2022-02-09T09:55:46.631Z",
                    "eventsUrl": "string",
                    "htmlUrl": "string",
                    "id": 0,
                    "labels": "string",
                    "labelsUrl": "string",
                    "locked": 0,
                    "milestone": "string",
                    "nodeId": "string",
                    "number": 0,
                    "performedViaGithubApp": 0,
                    "reactions": "string",
                    "repositoryUrl": "string",
                    "state": "string",
                    "timelineUrl": "string",
                    "title": "string",
                    "updatedAt": "2022-02-09T09:55:46.631Z",
                    "url": "string",
                    // "user": user,
                    "user": userStr,
                    "userAvatar": "string",
                    "userName": "string",
                    "userUrl": "string"
                }

                // user 不是string
                console.log("issueForm")
                console.log(issueForm)
                method.post("/issue/save", issueForm, this)
                    .then(response => {
                        console.log("response")
                        console.log(response)

                        if (response.data.port == "400") {
                            this.$message.error('账号或者密码有误');
                        } else {
                            this.$message.success('登录成功');
                            localStorage.setItem('ms_username', this.param.username);
                            this.$cookies.set("token", response.data.token);
                            this.$router.push('/');
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            // 编辑操作
            onIssueClicked(index, row) {
                console.log("row.url")
                console.log(row.url)
                this.$router.push(row.url)
                // issue 界面 但是参数
                // 所有的issues 一个界面 列表
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

            // onIssueClicked(evt){
            //     // 获取点击的 对象 a vue
            //
            //     console.log("evt")
            //     console.log(evt)
            //
            //     // 获取的是 html
            //     // vue 点击 获取数据
            //     console.log("evt.currentTarget");
            //     console.log(evt.currentTarget);
            //     console.log("evt.target");
            //     console.log(evt.target);
            // }
        },
        data() {

            let comment = {
                "url": "https://api.github.com/repos/vmg/redcarpet/issues/comments/787130124",
                "html_url": "https://github.com/vmg/redcarpet/issues/690#issuecomment-787130124",
                "issue_url": "https://api.github.com/repos/vmg/redcarpet/issues/690",
                "id": 787130124,
                "node_id": "MDEyOklzc3VlQ29tbWVudDc4NzEzMDEyNA==",
                "user": {
                    "login": "robin850",
                    "id": 354185,
                    "node_id": "MDQ6VXNlcjM1NDE4NQ==",
                    "avatar_url": "https://avatars.githubusercontent.com/u/354185?v=4",
                    "gravatar_id": "",
                    "url": "https://api.github.com/users/robin850",
                    "html_url": "https://github.com/robin850",
                    "followers_url": "https://api.github.com/users/robin850/followers",
                    "following_url": "https://api.github.com/users/robin850/following{/other_user}",
                    "gists_url": "https://api.github.com/users/robin850/gists{/gist_id}",
                    "starred_url": "https://api.github.com/users/robin850/starred{/owner}{/repo}",
                    "subscriptions_url": "https://api.github.com/users/robin850/subscriptions",
                    "organizations_url": "https://api.github.com/users/robin850/orgs",
                    "repos_url": "https://api.github.com/users/robin850/repos",
                    "events_url": "https://api.github.com/users/robin850/events{/privacy}",
                    "received_events_url": "https://api.github.com/users/robin850/received_events",
                    "type": "User",
                    "site_admin": false
                },
                "created_at": "2021-02-27T20:24:06Z",
                "updated_at": "2021-02-27T20:24:06Z",
                "author_association": "COLLABORATOR",
                "body": "Hello,\r\n\r\nSorry for the late answer but actually the problem lies in the fact that `Redcarpet::Render::Base` doesn't implement any method by default ; `nil` is returned from every callback so you have to provide an implementation for each of them.\r\n\r\nThus, to fix your problem, you might have to do the following:\r\n\r\n~~~ruby\r\nclass ArticleCardHTMLRender < Redcarpet::Render::Base\r\n  def paragraph(text)\r\n    %(<p>#{text}</p>)\r\n  end\r\n\r\n  # ...\r\nend\r\n~~~\r\n\r\nOr extends from `Redcarpet::Render::HTML` as you mentioned (it's generally easier to go this way).",
                "reactions": {
                    "url": "https://api.github.com/repos/vmg/redcarpet/issues/comments/787130124/reactions",
                    "total_count": 0,
                    "+1": 0,
                    "-1": 0,
                    "laugh": 0,
                    "hooray": 0,
                    "confused": 0,
                    "heart": 0,
                    "rocket": 0,
                    "eyes": 0
                },
                "performed_via_github_app": null
            }
            let comments = [
                comment, comment
            ]

            var issues = [
                {
                    title: "111",
                    url: "url",

                }
            ]
            var originData = [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]

            let issue = {
                "id": 1012912885,
                "userName": null,
                "userUrl": null,
                "userAvatar": null,
                "date": null,
                "url": "https://api.github.com/repos/moshowgame/SpringBootCodeGenerator/issues/122",
                "body": "背景 : 当重新打开一个页面时,有很多设置需要重复操作,浪费时间\r\n修改 :\r\n    1 main.html: 增加 加载 cookie 的逻辑\r\n    2 common.js: 增加 cookie 设置 和 get 的 通用逻辑\r\n    3 main.js: 增加 将所有需要纪录的字段写入cookie逻辑,并加载到页面",
                "repositoryUrl": "https://api.github.com/repos/moshowgame/SpringBootCodeGenerator",
                "labelsUrl": "https://api.github.com/repos/moshowgame/SpringBootCodeGenerator/issues/122/labels{/name}",
                "commentsUrl": "https://api.github.com/repos/moshowgame/SpringBootCodeGenerator/issues/122/comments",
                "eventsUrl": "https://api.github.com/repos/moshowgame/SpringBootCodeGenerator/issues/122/events",
                "htmlUrl": "https://github.com/moshowgame/SpringBootCodeGenerator/pull/122",
                "nodeId": "PR_kwDOCMCWTc4sin5A",
                "number": 122,
                "title": "避免重复配置",
                "user": "{\"avatarUrl\":\"https://avatars.githubusercontent.com/u/45098520?v=4\",\"eventsUrl\":\"https://api.github.com/users/Thixiaoxiao/events{/privacy}\",\"followersUrl\":\"https://api.github.com/users/Thixiaoxiao/followers\",\"followingUrl\":\"https://api.github.com/users/Thixiaoxiao/following{/other_user}\",\"gistsUrl\":\"https://api.github.com/users/Thixiaoxiao/gists{/gist_id}\",\"gravatarId\":\"\",\"htmlUrl\":\"https://github.com/Thixiaoxiao\",\"id\":45098520,\"login\":\"Thixiaoxiao\",\"nodeId\":\"MDQ6VXNlcjQ1MDk4NTIw\",\"organizationsUrl\":\"https://api.github.com/users/Thixiaoxiao/orgs\",\"receivedEventsUrl\":\"https://api.github.com/users/Thixiaoxiao/received_events\",\"reposUrl\":\"https://api.github.com/users/Thixiaoxiao/repos\",\"siteAdmin\":0,\"starredUrl\":\"https://api.github.com/users/Thixiaoxiao/starred{/owner}{/repo}\",\"subscriptionsUrl\":\"https://api.github.com/users/Thixiaoxiao/subscriptions\",\"type\":\"User\",\"url\":\"https://api.github.com/users/Thixiaoxiao\"}",
                "state": "closed",
                "labels": "[]",
                "locked": 0,
                "assignee": null,
                "assignees": "[]",
                "milestone": null,
                "comments": 0,
                "createdAt": "2021-10-01T05:25:32.000+00:00",
                "updatedAt": "2021-10-30T16:48:12.000+00:00",
                "closedAt": "2021-10-30T16:48:12.000+00:00",
                "authorAssociation": "CONTRIBUTOR",
                "activeLockReason": null,
                "reactions": "{\"confused\":0,\"eyes\":0,\"heart\":0,\"hooray\":0,\"laugh\":0,\"rocket\":0,\"totalCount\":0,\"url\":\"https://api.github.com/repos/moshowgame/SpringBootCodeGenerator/issues/122/reactions\"}",
                "timelineUrl": "https://api.github.com/repos/moshowgame/SpringBootCodeGenerator/issues/122/timeline",
                "performedViaGithubApp": null
            }

            let ddd={
                "id": 1012912885,
                "userName": null,
                "userUrl": null,
                "userAvatar": null,
                "date": null,
                "url": "https://api.github.com/repos/moshowgame/SpringBootCodeGenerator/issues/122",
                "body": "背景 : 当重新打开一个页面时,有很多设置需要重复操作,浪费时间\r\n修改 :\r\n    1 main.html: 增加 加载 cookie 的逻辑\r\n    2 common.js: 增加 cookie 设置 和 get 的 通用逻辑\r\n    3 main.js: 增加 将所有需要纪录的字段写入cookie逻辑,并加载到页面",
                "repositoryUrl": "https://api.github.com/repos/moshowgame/SpringBootCodeGenerator",
                "labelsUrl": "https://api.github.com/repos/moshowgame/SpringBootCodeGenerator/issues/122/labels{/name}",
                "commentsUrl": "https://api.github.com/repos/moshowgame/SpringBootCodeGenerator/issues/122/comments",
                "eventsUrl": "https://api.github.com/repos/moshowgame/SpringBootCodeGenerator/issues/122/events",
                "htmlUrl": "https://github.com/moshowgame/SpringBootCodeGenerator/pull/122",
                "nodeId": "PR_kwDOCMCWTc4sin5A",
                "number": 122,
                "title": "避免重复配置",
                "user": {
                    "id": null,
                    "login": null,
                    "nodeId": null,
                    "avatarUrl": null,
                    "gravatarId": null,
                    "url": "https://api.github.com/repos/moshowgame/SpringBootCodeGenerator/issues/122/reactions",
                    "htmlUrl": null,
                    "followersUrl": null,
                    "followingUrl": null,
                    "gistsUrl": null,
                    "reposUrl": null,
                    "subscriptionsUrl": null,
                    "organizationsUrl": null,
                    "starredUrl": null,
                    "eventsUrl": null,
                    "receivedEventsUrl": null,
                    "type": null,
                    "siteAdmin": null
                },
                "state": "closed",
                "labels": [],
                "locked": 0,
                "assignee": null,
                "assignees": [],
                "milestone": null,
                "comments": 0,
                "createdAt": "2021-10-01T05:25:32.000+00:00",
                "updatedAt": "2021-10-30T16:48:12.000+00:00",
                "closedAt": "2021-10-30T16:48:12.000+00:00",
                "authorAssociation": "CONTRIBUTOR",
                "activeLockReason": null,
                "reactions": {
                    "id": null,
                    "url": "https://api.github.com/repos/moshowgame/SpringBootCodeGenerator/issues/122/reactions",
                    "totalCount": 0,
                    "addOne": null,
                    "minusOne": null,
                    "laugh": 0,
                    "heart": 0,
                    "hooray": 0,
                    "confused": 0,
                    "rocket": 0,
                    "eyes": 0
                },
                "timelineUrl": "https://api.github.com/repos/moshowgame/SpringBootCodeGenerator/issues/122/timeline",
                "performedViaGithubApp": null
            }

            return {
                repoInfo: {},
                title: "title",
                content: "content",
                tableData: issues,
                // comments: comments,
                comments: null,
                issue: issue,
                api:null,
            }
        },
        created() {
            // https://blog.csdn.net/qq_25905159/article/details/107737266
            console.log("created")
            // this.makeComicLst()
            // let api= this.$cookies.get(apiMark);
            let api = localStorage.getItem(apiMark)
            console.log("api")
            console.log(api)
            this.api=api
            // api.
            // this.$router
            // this.$router query 获取
            // let age = this.$route.query.age; //问号后面参数会被封装进 this.$route.query;
            let issueId = this.$route.query.issueId;

            console.log("issueId")
            console.log(issueId)
            //
            let url = strUtil.urlAdd(api, `/issues/${issueId}/comments`)
            let urlGetIss = strUtil.urlAdd(api, `/issues/${issueId}`)
            // getIssue

            method.post("/issue/getIssue", {url: urlGetIss}, this).then(response => {
                console.log("response")
                console.log(response)

                if (response.data.code === codeError) {
                    this.$message.error('账号或者密码有误');
                } else {
                    // this.$message.success('登录成功');
                    this.issue = response.data.data
                    // this.comments=response.data.data
                    console.log("this.issue")
                    console.log(this.issue)
                    // comments
                    if (this.issue.comments > 0) {

                        this.getComments()
                    }
                }
            })
                .catch(function (error) {
                    console.log(error);
                });

            // let data={
            //     commentsUrl:url
            // }
            // method.post("/comment/comments",data,this)   .then(response => {
            //     console.log("response")
            //     console.log(response)
            //
            //     if (response.data.code === codeError) {
            //         this.$message.error('账号或者密码有误');
            //     } else {
            //         this.$message.success('登录成功');
            //         this.comments=response.data.data
            //         console.log( "this.comments")
            //         console.log( this.comments)
            //     }
            // })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
        },
    }
</script>
<!--其他地方定义的 css 不引入的话 应该不行的吧-->
<style type="text/css">
  .white {
    color: white;
  }
</style>
