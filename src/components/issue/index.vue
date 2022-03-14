<template>
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
</template>

<script>
// import * as Vue from 'vue'
// import QuestionBody from './QuestionBody'
// import DateUtil from "@/util/DateUtil";
// DateUtil.
// import DateShow from "../components/date-show";
// import DateShow from "./components/date-show";
import DateShow from "../../components/date-show";
import {
  codeError,
  apiMark,
  QuickVue,
  GITHUB_URL,
  dataGitHub,
} from "../../common/common";
export default {
     components: {
    DateShow,
  },
  name: "Answer",
  props: {
    rowData: {
      required: true,
    },
  },
  //   components: {
  //     QuestionBody,
  //   },
  created() {
    // console.log("this.date ");
    // console.log(this.date);
    // console.log("typeof this.date");
    // console.log(typeof this.date);
    // if (typeof this.date === "string") {
    //   //   this.date=new Date(this.date)
    //   this.dateMe = new Date(this.dateMe);
    // }
    // // let dateShow=  DateUtil.format(this.date,"yyyy-MM-dd hh:mm:ss")
    // let dateShow = DateUtil.format(this.dateMe, "yyyy-MM-dd hh:mm:ss");
    // // DateUtil.format("")
    // console.log("dateShow");
    // console.log(dateShow);
    // this.dateShow = dateShow;
  },

  methods: {
       onIssueClickedByRow(row) {
      console.log("row.url");
      console.log(row.url);
      console.log("row.number");
      console.log(row.number);
   
      sessionStorage.setItem(dataGitHub, JSON.stringify(this.$data));

      this.$router.push({ path: "Issue", query: { issueId: row.number } });
   
    },
  },
  data() {
    return {
      //   dateMe: this.date,
      //   dateShow: null,
    };
  },
};
</script>

<style scoped>
.answer-card >>> .card-header {
  border-radius: 0;
}

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
.username {
  /* 加粗 */
  font-weight: bold;
  margin-right: 5px;
}
</style>
