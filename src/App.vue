<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">

      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',

}
</script>

<style>
  @import "assets/css/user.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
 width: 100%;
  height: 100%;
  width: 100%;
  position: relative;
}
  html,body{
    font-size: 37.5rem;
  }
</style>
