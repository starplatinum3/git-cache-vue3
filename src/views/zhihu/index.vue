<template>
    <div class="screen">

        <div class="content">
            <h2>题目</h2>
            <div class="row">
                <!--          为什么这个不显示-->
                <!--          flex row 里的图片不显示-->
                <img class="avatar-img" src="@/assets/miku.jpg" alt="miku"/>
                <!--             <div class="avatar">头像-->
                <!--                 &lt;!&ndash; <img src="src/assets/miku.jpg"/> &ndash;&gt;-->
                <!--                 &lt;!&ndash; src 不行 &ndash;&gt;-->
                <!--                  <img class="avatar-img" src="@/assets/miku.jpg"/>-->
                <!--             </div>-->
                <div class="nickname">昵称</div>
            </div>
            <img class="avatar-img" src="@/assets/miku.jpg" alt="miku"/>


            <div>内容</div>
            <div>浏览</div>

        </div>

    </div>
</template>

<script>

    export default {
        components: {},
        name: "GithubHome",
        methods: {
            toLogin() {
                this.$router.push("Login");
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
                this.$router.push({path: "issues", query: {repoName: repoName}});

                // this.netUrl = urlGetRepo;
                // this.parseApi();
                // this.getIssuesDo();
            },
            getIssuesDo() {
                if (this.api === null) {
                    // this.$mess
                    // vue
                    // this.messge.
                    // this.$message.error("该单位不可用！");
                    // QuickVue.vue.$me
                    // QuickVue.messge.error("api 没有")
                    // this.message.error("api 没有")
                    // this.$message.error("api 没有")
                    // QuickVue.getMsg(this).error("api 没有")
                    // util.methods.getMsg()
                    // util.getMsg(this).error("api 没有r4141")
                    ElMessage.error("api 没有");
                    return;
                }
                var data = {
                    url: strUtil.urlAdd(this.api, "issues"),
                };
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

                // method.post("/repo/issues",data,this)
                // method.post("/issue/issues", data, this)
                //     .then(response => {
                //
                //         if (response.data.port === codeError) {
                //             this.$message.error('账号或者密码有误');
                //         } else {
                //             // this.issues=response.data.data;
                //             this.tableData = response.data.data;
                //
                //             // console.log("this.issues")
                //             // console.log(this.issues)
                //
                //             console.log("this.tableData")
                //             console.log(this.tableData)
                //
                //         }
                //     })
                //     .catch(function (error) {
                //         console.log(error);
                //     });
            },
            getIssues() {
                if (this.canHit) {
                    this.getIssuesDo();
                    this.canHit = false;
                    var auth_timetimer = setInterval(() => {
                        // this.timer--;
                        this.canHit = true;
                        clearInterval(auth_timetimer);
                    }, 1000);
                }
                //                 this.timer = 300;
                //                 this.canHit=false
                //                 var auth_timetimer = setInterval(() => {
                //                     this.timer--;
                //                     if (this.timer <= 0) {
                //                         // this.sendAuthCode = true;
                //                         clearInterval(auth_timetimer);
                //                         // window.location.reload();
                //                         // window.opener=null;
                //                         // window.open('',self);
                //                         // window.close();
                //                     }
                //                 }, 1000);
                // // ————————————————
                // // 版权声明：本文为CSDN博主「年轻即出发」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
                // // 原文链接：https://blog.csdn.net/weixin_42246997/article/details/103736039
                // //
                //                 var data={
                //                     url:strUtil.urlAdd(this.api,"issues")
                //                 }
                //                 // method.post("/repo/issues",data,this)
                //                 method.post("/issue/issues",data,this)
                //                     .then(response => {
                //
                //                         if(response.data.port===codeError) {
                //                             this.$message.error('账号或者密码有误');
                //                         }else{
                //                             // this.issues=response.data.data;
                //                             this.tableData=response.data.data;
                //
                //                             // console.log("this.issues")
                //                             // console.log(this.issues)
                //
                //                             console.log("this.tableData")
                //                             console.log(this.tableData)
                //
                //                         }
                //                     })
                //                     .catch(function(error) {
                //                         console.log(error);
                //                     });
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
                // method.post("/history/list", null, this)
                //     .then(response => {
                //
                //         if (response.data.port === codeError) {
                //             this.$message.error('账号或者密码有误');
                //         } else {
                //             // this.issues=response.data.data;
                //             // this.tableData=response.data.data;
                //             this.history = response.data.data;
                //
                //
                //         }
                //     })
                //     .catch(function (error) {
                //         console.log(error);
                //     });
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
                // method.post()
                // Vue

                // https://segmentfault.com/a/1190000016653561
                // this.$axios.get(this.GLOBAL.host.+“后台接口地址”,{
                // strUtil.urlAdd(Vue._api,)
                // https://segmentfault.com/a/1190000016653561
                var that = this;
                this.$axios.get(apiUrl).then((res) => {
                    //获取你需要用到的数据
                    console.log("res");
                    console.log(res);
                    that.repoInfoGet = res;
                    total_issues = res.open_issues;
                });
                this.total_issues = total_issues;
                // $.ajax({
                //     url: apiUrl,
                //     type: "GET",
                //     async: false,
                //     success: function (repoInfo) {
                //         total_issues = repoInfo.open_issues;
                //     }
                // });

                console.log("Total issues: " + total_issues);
                return total_issues;
            },
            // zipIssues(apiUrl) {
            //     apiUrl = apiUrl || this.netUrl
            //     var zip = new JSZip();
            //     var total_issues = reqIssNum(apiUrl);
            //     var maxPageIssuesNum = 30;
            //     var total_pages = Math.ceil(total_issues / maxPageIssuesNum);
            //     console.log("Total pages: " + total_pages);
            //     // var doSave = false
            //     var doSave = true
            //     if (total_issues == undefined) {
            //         $("#status").text("Request failed.");
            //         return;
            //     } else if (total_issues == 0) {
            //         $("#status").text("No issue.");
            //         return;
            //     }
            //     for (var p = 1; p <= total_pages; p++) {
            //         var issueInfo = reqIssData(apiUrl, p);
            //         if (issueInfo == undefined) {
            //             $("#status").text("Request failed.");
            //         }
            //         var len = issueInfo.length;
            //         //当前页的issue总数
            //         console.log("p" + p + " issues number: " + len);
            //         for (var i = 0; i < len; i++) {
            //             var oneIssueInfo = issueInfo[i]
            //             var title = issueInfo[i].title;
            //             var number = issueInfo[i].number;
            //             var content = issueInfo[i].body;
            //             var tags = "";
            //             var lablesNum = issueInfo[i].labels.length;
            //
            //             var cmts = reqIssComments(oneIssueInfo.comments_url)
            //
            //             console.log("cmts");
            //             console.log(cmts);
            //             let fileContent = makeMdFileContent(title, content, cmts)
            //             //   这里可以走
            //             for (var j = 0; j < lablesNum; j++) {
            //                 var label = issueInfo[i].labels[j].name;
            //                 tags += label;
            //                 if (j < lablesNum - 1) {
            //                     tags += ",";
            //                 }
            //             }
            //             tags = tags.replace(/[\\]/g, "↘").replace(/[\/]/g, "↗");//防止/和\构成文件夹
            //             title = title.replace(/[\\]/g, "↘").replace(/[\/]/g, "↗");
            //             //添加md文件名称和内容
            //             if (doSave) {
            //                 if (tags != "") {
            //                     // zip.folder("P" + p).file(number + " " + tags + "-" + title + ".md", content);
            //                     zip.folder("P" + p).file(number + " " + tags + "-" + title + ".md", fileContent);
            //                 } else {
            //                     // zip.folder("P" + p).file(number + " " + title + ".md", content);
            //                     zip.folder("P" + p).file(number + " " + title + ".md", fileContent);
            //                 }
            //             }
            //         }
            //     }
            //
            //
            //     if (doSave) {
            //         zip.generateAsync({
            //             type: "blob"
            //         }).then(function (content) {
            //             //打包
            //             saveAs(content, "[Gissue] " + repoInfo.username + "-" + repoInfo.repopath + " #" + repoInfo.newest + ".zip");
            //         });
            //     }
            //
            //     $("#status").text("Done.");
            // },
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

            // parseApi(crtUrl) {
            //     var urlSplit = crtUrl.split('/');
            //     //console.log(urlSplit);//list
            //     var username = urlSplit[3];
            //     var repopath = urlSplit[4];
            //     var repoInfo = this.repoInfo
            //     repoInfo.username = username;
            //     repoInfo.repopath = repopath;
            //     // repoInfo.username = username;
            //     // repoInfo.repopath = repopath;
            //     var api = "https://api.github.com/repos/" + username + "/" + repopath;
            //
            //     console.log("Get GitHub api URL:" + api);
            //     return api;
            // },

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

                this.$router.push({path: "Issue", query: {issueId: row.number}});
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

                this.$router.push({path: "Issue", query: {issueId: row.number}});
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
        created() {

        },
        data() {
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
                auth: null,
                repoInfoGet: null,
                total_issues: null,
                api: null,
                // netUrl:null,
                // netUrl: "https://github.com/moshowgame/SpringBootCodeGenerator",
                netUrl: "https://github.com/starplatinum3/starplatinum",
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
<!-- <style type="text/css" scoped>-->
<style lang="less" scoped>
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

    .row {
        background: red;
        display: flex;
        flex-direction: row;
        /* flex-direction: row; */
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

    .username {
        /* 加粗 */
        font-weight: bold;
        margin-right: 5px;
    }

    // @avatar_size:50px;
    // @avatar_size:70px;
    // @avatar_size:24px;
    // @avatar_size:24*2px;
    @avatar_size: 24px;
    @avatar_img_size: 20px;
    /*不是尺寸的原因*/
    .avatar {
        background: yellow;
        // width: 30px;
        // height: 30px;
        width: @avatar_size;
        height: @avatar_size;
        border-radius: 50%;
    }

    @screen_width: 414px;
    .nickname {
        background: purple;
        //  width: 300px;
        //  width: 183*2px;
        //  height: 22*2px;
        width: 183px;
        height: 22px;
        margin-left: 30px;
    }

    .screen {
        background: green;
        width: @screen_width;
    }

    .content {
        // padding-left: 10px;
        padding-left: 30px;
        padding-right: 10px;
    }

    .avatar-img {
        margin-left: 30px;
        width: @avatar_img_size;
        height: @avatar_img_size;
    }
</style>
