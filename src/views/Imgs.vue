<template>
  <div>
  <div :key="img.id" v-for="img in imgList">
    <!-- <img :src="`{img.img}`"/> -->
      <img class="img" :src="img.absUrl"/>
      <el-button @click="deleteImg(img)">删除</el-button>
  </div>
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
    deleteImg(img){
      //  img.img 
      console.log("img");
         console.log(img);
         console.log("img.id");
          console.log(img.id);
          // https://www.jianshu.com/p/cb9af5c47697
       axios.delete(`${Global.axiosUrl}img/delete/${img.id}`, {id:img.id}).then((res) => {
        console.log("res");
         console.log(res);
      });

let params={
  id: img.id
}
let body={
  id: img.id
}
      //  axios.delete(`${Global.axiosUrl}img/delete`, {
      //   //  params:params,
      //  body:body
      //  }).then((res) => {
      //   console.log("res");
      //    console.log(res);
      // });
    },
  
  },
  created() {
    // axios.
    let that=this
      axios.get(`${Global.axiosUrl}img/list`, {}).then((res) => {
        console.log("res");
         console.log(res);
        //  this.imgList=res.data
          // that.imgList=res.data
           that.imgList=res.data.data
        //  for (let img of    this.imgList) {
          // 获得一个
            for (let img of    that.imgList) {
           console.log("img");
             console.log(img);
           img.absUrl=Global.axiosUrl+ img.img
         }
        
      });
 
  },
 
 data(){
   return{
     imgList:[]
   }
 }
};
</script >

<!--其他地方定义的 css 不引入的话 应该不行的吧-->
<style type="text/css" scope>

.img{

  width: 100px;
 height: 100px;
}

</style>
