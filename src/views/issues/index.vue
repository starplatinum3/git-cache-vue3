<template>
  <el-card :key="rowData.id" v-for="rowData in tableData">
    <issue :rowData="rowData"></issue>
  </el-card>
</template>
<script>
import { reactive, toRefs } from "vue";
// import Issue from '../Issue.vue';
// import Issue from '../cop/Issue.vue';
// import Issue from "../components/issue";
import Issue from "../../components/issue";
import { useRoute, useRouter } from "vue-router";
import strUtil from "@/util/strUtil";
import axios from "axios";
// strUtil
// axios.reactive

import method from "@/util/method";
// import strUtil from "../util/strUtil";
import Global from "@/util/global";
import DateUtil from "../../util/DateUtil";
import {
  codeError,
  apiMark,
  QuickVue,
  GITHUB_URL,
  dataGitHub,
} from "../../common/common";
// import  codeError from "../../common/common";
import util from "../../util/util";
// import DateShow from "../components/date-show";
// src\components
// import axios from "axios";
// import {codeError} from "../common/common";
import { ElMessage } from "element-plus";
// import $store from "../store/index";

export default {
  components: { Issue },
  setup() {
 
   
    const route = useRoute();
    const router = useRouter();
  //  let repoName = route.query.repoName;
  //   console.log("repoName");
  //   console.log(repoName);
    const getIssuesDo = (api) => {
      if (api === null) {
        ElMessage.error("api 没有");
        return;
      }
      var data = {
        url: strUtil.urlAdd(api, "issues"),
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
            ElMessage.success("账号或者密码有误");
          } else {
            // this.issues=response.data.data;
            // this.tableData = response.data.data;
            state.tableData = response.data.data;
            console.log("this.tableData");
            console.log(this.tableData);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    let repoName = route.query.repoName;
    // let repoName = this.$route.query.repoName;

    //   let username = this.$route.query.username;
    // let urlGetRepo = strUtil.urlAdd(GITHUB_URL, repoName);
    //  let api = "https://api.github.com/repos/" + username + "/" + repopath;
    let api = "https://api.github.com/repos/" + repoName;
    // this.netUrl = urlGetRepo;
    // this.parseApi();
    // this.getIssuesDo(api);
    localStorage.setItem(apiMark, api);
    getIssuesDo(api);
    // vue  input
    const state = reactive({
      data: {
        list: ["学习", "吃饭", "睡觉"],
        inputVal: "好好学习，天天向上",
      },
      showingBottom: true,
      tableData: null,
    });
    const add = () => {
      console.log("state.data.inputVal");
      console.log(state.data.inputVal);
      state.data.list.push(state.data.inputVal);
      // input 双向绑定
    };
    const remove = (index) => state.data.list.splice(index, 1);
    // 把1位置的东西替换掉了，替换的东西没有写 就是删除的意思
    const clear = () => {
      state.data.list = [];
      state.showingBottom = false;
    };

    return {
      ...toRefs(state),
      add,
      remove,
      clear,
      getIssuesDo,
    };
  },
};
</script>

<style scoped>
</style>
