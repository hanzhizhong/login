import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "animate.css"
import "heyui/themes/index.less";
import "heyui/themes/common.less";
import './assets/css/iconfont.css'
import { install, Prototypes, Button, DropdownMenu,Pagination,Radio } from 'heyui';
Vue.use(install,{components:{Button, DropdownMenu,Pagination,Radio},prototypes:Prototypes})

import axios from 'axios'
axios.defaults.baseURL='/api'
Vue.prototype.$axios=axios 

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
