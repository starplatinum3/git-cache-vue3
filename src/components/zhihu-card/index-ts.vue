<template>
    <div class="screen">

        <div class="content">
            <h2>题目</h2>
            <div class="mid-box">
                <div class="mid-left">
                    <div class="row nickname-row">
                        <!--          为什么这个不显示-->
                        <!--          flex row 里的图片不显示-->
                        <img class="avatar-img" src="@/assets/miku.jpg" alt="miku"/>
                        <!--             <div class="avatar">头像-->
                        <!--                 &lt;!&ndash; <img src="src/assets/miku.jpg"/> &ndash;&gt;-->
                        <!--                 &lt;!&ndash; src 不行 &ndash;&gt;-->
                        <!--                  <img class="avatar-img" src="@/assets/miku.jpg"/>-->
                        <!--             </div>-->
                        <span class="nickname">昵称</span>
                        <span class="personal-signature">昵称</span>
                    </div>
                    <!--            <img class="avatar-img" src="@/assets/miku.jpg" alt="miku"/>-->


                    <div class="content-article">内容</div>

                </div>
                <div class="mid-right">
                    <img  class="mid-right-img" src="@/assets/miku.jpg" alt="miku"/>
                </div>
            </div>

            <div class="brows-cnt">浏览</div>

        </div>

    </div>
</template>

<script  setup lang="ts">

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

    /*有头绪了 貌似是这里有padding*/
    .row {
        background: red;
        display: flex;
        flex-direction: row;
        /* flex-direction: row; */
    }

    .row * {
        padding: 0;
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
    /*    @avatar_img_size: 20px;*/
    @avatar_img_size: 30px;
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
        /*width: 183px;*/
        width: 123px;
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
        border-radius: 50%;
        /*margin-left: 30px;*/
        width: @avatar_img_size;
        height: @avatar_img_size;
    }

    .nickname-row {
        height: 30px;
    }

    .personal-signature {
        color: #999999;

        width: 111px;
    }

    .content-article {
        /*width: 349px;*/
        height: 72px;
        background: #000dba;
    }

    .brows-cnt {
        color: #999999;
        font-size: 80%;
        background: #ff9854;
    }

    .mid-box {
        width: 375px;
        height: 102px;
        display: flex;
        /*flex-direction: column;*/
        flex-direction: row;
    }

    .mid-right{
        display: flex;
        align-content: center;
        align-items: center;
        /*width: 73px;*/
        /*height: 73px;*/
        width: 102px;
        height: 102px;
        justify-content: center;
    }

    .mid-right-img{
        width: 73px;
        height: 73px;
    }

    .mid-left{
        width: 274px;
    }
</style>
