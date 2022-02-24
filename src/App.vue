<template>
    <!--  <img alt="Vue logo" src="./assets/logo.png">-->
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <div id="nav">
        <router-link to="/">主页</router-link>
        |
        <router-link to="/news">学校新闻</router-link>
        |
<!--        School institutions-->
        <router-link to="/institutions">学校机构</router-link>
        |
        <router-link to="/about">关于</router-link>
    </div>
    <router-view/>
    <Time></Time>
</template>
<!--https://blog.csdn.net/TrZoey/article/details/85088621-->
<script>

    import HelloWorld from './components/HelloWorld.vue'
    import Time from './components/Time.vue'

    // import HelloWorld from './src/components/HelloWorld.vue'
    // import Time from './src/components/Time.vue'
    // import HelloWorld from 'src/components/HelloWorld.vue'
    // 这样不行
    export default {
        name: 'App',
        components: {
            HelloWorld,Time
        }
    }
</script>

<!--<style  lang="scss">-->
<!--scoped-->
<!--没有  scoped 是有效的-->
<!--<style lang="scss" type="text/scss" >-->
<!--scoped 全部都往左边去了-->
<style lang="scss" type="text/scss"  >
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    /*代码用 scss idea */


    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;
            margin: 0px 50px;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }

</style>
