import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "animate.css"
import "heyui/themes/index.less";
import "heyui/themes/common.less";

import './assets/css/iconfont.css'


import { install, Prototypes, Button, DropdownMenu } from 'heyui';
Vue.use(install,{components:{Button, DropdownMenu},prototypes:Prototypes})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
