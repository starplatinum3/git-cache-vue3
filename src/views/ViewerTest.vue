<template>
<!--  https://www.jianshu.com/p/7e67ed15d67a-->
  <div id="imgTooles">
    <ul>
      <li v-for="(item,index) in this.imgList " :key="index">
        <img :data-original='`${item}`' :src="item">
      </li>
    </ul>
  </div>
</template>
<script>
    import Viewer from 'viewerjs';
    import 'viewerjs/dist/viewer.css';
    // ViewerTest
    export default {
        mounted(){
            this.getInfo();
        },
        data(){
            return{
                imgList : [],
            }
        },
        methods:{
            getInfo(){
                //发送ajax请求图片list
                //...
                //this.imgList = res.data.list;
                this.imgList=['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550224739247&di=512032866bea6329b1e46c735d50ac8b&imgtype=0&src=http%3A%2F%2Fimglf2.ph.126.net%2FdHH6OM2rD8JucPGAotUfag%3D%3D%2F6608219914074710297.jpg',
                    'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=488030022,1694816207&fm=173&app=25&f=JPEG?w=580&h=347&s=A08FB35A5E0616C664F5631C030010D6',
                    'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2574767313,3929397124&fm=173&app=25&f=JPEG?w=580&h=868&s=B784EEA3460236E17A1F137F0300A058']
                //重点：要在图片已经请求到再调用！！
                this.$nextTick(() => {
                    this.initImageTools();
                });
            },
            initImageTools(){
                //初始化 viewerjs
                const ViewerDom = document.getElementById('imgTooles');
                const viewer = new Viewer(ViewerDom, {
                    url: "data-original",
                    show: function(){
                        viewer.update();
                    }
                });

            },
        }
    }
</script>
