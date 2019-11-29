<template>
  <div id="app">
    <template v-if="$route.meta.show">
      <v-header>top信息</v-header>
      <v-aside :menus="menus">左边</v-aside>
      <div class="main-content">
        <keep-alive :exclude="['edit']">
          <router-view class="animated fadeIn"></router-view>
        </keep-alive>
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
      menus: [
        {
          name: "活动列表",
          icons: "icon iconfont icon-icon-test",
          path: "/home"
        },
        {
          name: "供应商",
          icons: "icon iconfont icon-icon-test37",
          path: "/agency"
        },
        {
          name: "报告数据",
          icons: "icon iconfont icon-icon-test39",
          path: "/report"
        }
      ]
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
    left: 200px;
    top: 50px;
    bottom: 0;
    right: 0;
    padding: 10px;
    overflow-y:auto;
  }
}
.h-loading {
  background-color: rgba(0, 0, 0, 0.5) !important;
  color: #ffffff !important;
}
</style>
