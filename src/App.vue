<template>
<!--    <img src="./assets/logo.png">-->
<!--    <div>-->
<!--        <p>-->
<!--            If Element Plus is successfully added to this project, you'll see an-->
<!--            <code v-text="'<el-button>'"></code>-->
<!--            below-->
<!--        </p>-->
<!--        <el-button type="primary">el-button</el-button>-->
<!--    </div>-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <router-view></router-view>
    <el-button type="primary" @click="toGithub">toGithub</el-button>
    <el-button type="primary" @click="toWelcome">toWelcome</el-button>
     <el-button type="primary" @click="toNoteBook">toNoteBook</el-button>
     <el-button type="primary" @click="toZhihu">toZhihu</el-button>
       <el-button type="primary" @click="toImgs">toImgs</el-button>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'
    import { useRouter } from "vue-router";
// import strUtil from './util/strUtil';
    export default {
        name: 'App',
        components: {
            // HelloWorld
        },
        setup(props, context) {
            // strUtil
            const router = useRouter();

            const toGithub = async () => {
                await router.push("Github")

            };
            const toImgs = async () => {
                await router.push("imgs")

            };
            const toWelcome = async () => {
                await router.push("Welcome")

            };
               const toNoteBook = async () => {
                await router.push("NoteBook")

            };
            const toZhihu = async () => {
                await router.push("zhihu")

            };

            return {
                toGithub,
                toWelcome,
                toZhihu,
                toImgs
            };
        },
    }
</script>

<style>
    /*#app {*/
    /*    font-family: Avenir, Helvetica, Arial, sans-serif;*/
    /*    -webkit-font-smoothing: antialiased;*/
    /*    -moz-osx-font-smoothing: grayscale;*/
    /*    text-align: center;*/
    /*    color: #2c3e50;*/
    /*    margin-top: 60px;*/
    /*}*/
</style>
