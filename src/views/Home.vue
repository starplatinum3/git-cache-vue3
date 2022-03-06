<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="欢迎您的光临！"/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import HelloWorld from './src/components/HelloWorld.vue'
import HelloWorld from '../components/HelloWorld.vue'

export default {
  // name: 'Home',
  // name: 'home-home',
  name: 'starp-home',
  components: {
    // HelloWorld
      HelloWorld
  }
}
</script>
<style scoped>
.home {
  border:1px solid blue;
  margin: 10px;
}
</style>
