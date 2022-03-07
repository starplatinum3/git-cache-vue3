<template>
<!-- type="dark" -->
  <b-navbar  id="navbar" type="dark"  class="custom-info dark"  sticky>
    <b-navbar-brand id="nav-logo" :to="{ name: 'home' }"
      >Vue-Quiz</b-navbar-brand
    >

    <b-navbar-nav class="ml-auto">
      <b-nav-item :to="{ name: 'home' }">New Game </b-nav-item>
      <b-nav-item href="#" target="_blank">About</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import * as Vue from 'vue'
export default {
  name: 'Navbar',
}
</script>

<style scoped>
/* scoped */
.dark{
 background: black;
}
</style>
