
<template>
<!--  https://blog.csdn.net/qq_41619796/article/details/108888760-->
<!--  样式没有上去-->
<!--  class="bg-white"-->
  <div>
    <p class="font-white center">{{comicName}}</p>
<!--   elme ui 让一个 居中-->
<!--    https://blog.csdn.net/qq_27627195/article/details/99933906-->
  <vue-viewer multiple
              :thumb="imageList"
              list-ul-class="image-list"
              :full="imageList">
    <!--在列表中加入右上角删除按钮-->
    <template slot-scope="target">
      <span class="icon-remove" @click.stop="onRemove(target.index)" style="">&times;</span>
    </template>
  </vue-viewer>

    <el-form :model="comicForm" :label-position="labelPosition" status-icon :rules="rules2" ref="ruleForm2"
             label-width="100px" class="login-Form">
      <el-form-item label="服务器: " prop="usrname" class="labelName">
        <el-input v-model="comicForm.server"></el-input>
      </el-form-item>
      <el-form-item label="漫画名字: " prop="usrname" class="labelName">
        <el-input v-model="comicForm.comic"></el-input>
      </el-form-item>
      <el-form-item label="册名字: " prop="usrname" class="labelName">
        <el-input v-model="comicForm.comic"></el-input>
      </el-form-item>
<!--      this.comic = "jojo/jojo7"-->
<!--      // this._volume = 1-->
<!--      this.volume = 1-->
<!--      this.pageIndex = 1-->
<!--      this.pageSize = 93-->
<!--      this.volumeName = "JOJO SBR-01"-->
<!--      this.server = "http://starplatinumora.top/images/commic/"-->
      <el-form-item label="密码: " prop="pass" class="labelName">
        <el-input type="password" v-model="comicForm.pass" auto-complete="off">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')" class="submitBtn">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Comic from "../entity/Comic";
  import method from "../util/method";
  import {codeError, codeSuccess} from "../common/common";
  // codeError
  // codeSuccess
  // method
    export default {
        // Commic 写错了 应该是 comic
        name: 'Commic',
        data () {
            return {
                volume:"JOJO SBR-01",
                pageSize:93,
                comicPrefix:"http://starplatinumora.top/images/commic/",
                // whatComic:"jojo/jojo7/JOJO%20SBR-01/",
                whatComic:"jojo/jojo7/",
                comicName:"JOJO SBR-01",
                msg: 'vue2-viewer-test',
                imageList: [
                    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550224739247&di=512032866bea6329b1e46c735d50ac8b&imgtype=0&src=http%3A%2F%2Fimglf2.ph.126.net%2FdHH6OM2rD8JucPGAotUfag%3D%3D%2F6608219914074710297.jpg',
                    'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=488030022,1694816207&fm=173&app=25&f=JPEG?w=580&h=347&s=A08FB35A5E0616C664F5631C030010D6',
                    'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2574767313,3929397124&fm=173&app=25&f=JPEG?w=580&h=868&s=B784EEA3460236E17A1F137F0300A058',
                    'http://starplatinumora.top/images/commic/jojo/jojo7/JOJO%20SBR-01/1-1.jpg'
                ],
                comicForm:null,
            }
        },
        onload:function() {
            console.log("onload")
            this.makeComicLst()
        },
        created(){
            // https://blog.csdn.net/qq_25905159/article/details/107737266
            console.log("created")
            this.makeComicLst()
        },
        methods: {
            submitForm() {

                // method.
                // method.post()
                var comic=Comic()
                comic.volume=1
                // 问后台要数据
                method.post("comic/list",this.comicForm,this)
                    .then(response => {

                        if(response.data.port=="400") {
                            this.$message.error('账号或者密码有误');
                        }else{
                            this.$message.success('登录成功');
                            localStorage.setItem('ms_username', this.param.username);
                            this.$cookies.set("token",response.data.token);
                            this.$router.push('/');
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });

                // this.$axios.get(this._api + 'admin',{
                //     params: {
                //         name:this.param.username,
                //         password:  this.param.password
                //     },headers: {
                //         "Content-Type": "application/json;charset=utf-8" //头部信息
                //     }
                // })
                // // this._ajax({ //在api.js后面合并的axios属性名_ajax一致,名字随意
                // //     url:this._api + 'admin',  //基地址加上后面不同的url地址
                // //     method:'GET',
                // //     timeout:6000,
                // //     params:{}
                // // })
                //     .then(response => {
                //
                //
                //         if(response.data.port=="400")
                //         {
                //             this.$message.error('账号或者密码有误');
                //         }else{
                //             this.$message.success('登录成功');
                //             localStorage.setItem('ms_username', this.param.username);
                //             this.$cookies.set("token",response.data.token);
                //             this.$router.push('/');
                //         }
                //
                //
                //     })
                //     .catch(function(error) {
                //         console.log(error);
                //     });



            },
            onRemove(index) {
                alert(index);
            },
            // 1-- 93 图片
            makeComicLst(){
                // como
              // var  token=this.$route.query.token
              var  volume=this.$route.query.volume
                // console.log("token")
                // console.log(token)

                // Comic
                console.log("volume")
                console.log(volume)
                // this.imageList
                // var comic=  new Comic(1)
                // comic.pageSize=
                this.imageList=[]
                var pageIndex=1
                for (let i = 0; i <this.pageSize ; i++) {
                    // this.imageList.push(this.comicPrefix+this.whatComic+"1-"+pageIndex+".jpg")
                    this.imageList.push(this.comicPrefix+this.whatComic+this.volume+"/"+"1-"+pageIndex+".jpg")
                    pageIndex++
                }
            }
        }
    }
</script>
<!--不能scoped ，如果scoped 样式就不行了-->
<!--scoped-->
<style >
  .center{
    text-align: center;
  }

  .bg-white{
    background: white;
  }
  .font-white{
    color: white;
  }
  .image-list{
    /*margin: 0; */
    margin: 20px;
    padding: 0
  }
  .image-list li {
    display: inline-block;
    margin: 0 10px;
    list-style: none;
    position: relative;
  }
  .image-list li img {
    box-shadow: 0 0 5px #333;
  }
  .icon-remove{
    width: 20px; height:20px;
    text-align: center; line-height: 20px;
    background:#f33;
    position:absolute; top:-10px; right:-10px;
    border-radius: 10px;
    cursor: pointer;
    color:#fff;
  }
  a {
    color: #42b983;
  }
</style>
