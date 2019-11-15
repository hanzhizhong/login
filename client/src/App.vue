<template>
  <div id="app">
    <template v-if="$route.meta.show">
      <v-header :menus="menus">top信息</v-header>
    <v-aside>左边</v-aside>
    <div class="main-content">
      <router-view></router-view>
    </div>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
import Aside from "./components/aside/Aside";
import Header from "./components/header/Header";
export default {
  components: {
    "v-aside": Aside,
    "v-header": Header
  },
  data() {
    return {
      menus: [{ name: "活动" }]
    };
  }
};
</script>

<style lang="less">
#app {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  .main-content {
    position: absolute;
    left:200px;
    top:50px;
    bottom:0;
    right:0;
    padding:10px;
  }
}
</style>
