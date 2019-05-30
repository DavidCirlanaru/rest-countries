<template>
  <div id="app">
    <div class="container-fluid app-container">
      <Header></Header>
      <div class="content">
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "./components/Header.vue";
  import "bootstrap/dist/css/bootstrap.css";
  import "bootstrap-vue/dist/bootstrap-vue.css";

  export default {
      name: 'App',
      components: { Header },
  }

</script>

<style lang="scss">
@import "../src/styles/style.scss";
</style>