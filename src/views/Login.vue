<template>
  <div>
    <!-- 用户名<el-input v-model="username"></el-input> -->
  auth  <el-input v-model="auth"></el-input>

  <el-button type="primary" @click="authDo" class="submit">鉴权</el-button>
  </div>
</template>

<script>

import $store from "../store/index";
export default {
  name: "GithubHome",
  methods: {
   authDo(){
    //  this.$store.commit('auth', this.auth)
      $store.commit('auth', this.auth)
    //  ElMessage.succes
     this.$message.success("认证成功");
     this.$router.push('Github');
   }
  },
  created() {
    // this. 
    // this.$store
    //  this.$store.commit('auth', this.auth)
  },
  data() {
  

    return {
    
      auth: null,
     
    };
  }
};
</script>

<!--其他地方定义的 css 不引入的话 应该不行的吧-->
<style type="text/css">
.white {
  color: white;
}
.center{
      text-align: center;
}
.get-issue-btn-row{
    margin-top: 10px;
    margin-bottom: 10px;
}
.btn-margin{
     margin-top: 10px;
    margin-bottom: 10px;
}
/* .get-issue-btn-row{
    margin-top: 10px;
    margin-bottom: 10px;
} */
</style>
