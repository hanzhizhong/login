import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "animate.css"
import "heyui/themes/index.less";
import "heyui/themes/common.less";
import './assets/css/iconfont.css'
import { install, Prototypes, Button, DropdownMenu,Pagination,Radio,Loading} from 'heyui';

Vue.use(install,{components:{Button, DropdownMenu,Pagination,Radio,Loading},prototypes:Prototypes})


import axios from 'axios'
axios.defaults.baseURL='/api'
axios.interceptors.request.use((config)=>{
  Prototypes.$Loading.open('加载中...')
  return config
})
axios.interceptors.response.use((config)=>{
  Prototypes.$Loading.close()
  return config;
})
Vue.prototype.$axios=axios 

Vue.config.productionTip = false

//路由页面的跳转显示进度条
router.beforeEach((to,from,next)=>{
  Prototypes.$LoadingBar.start()
  next()
})
router.afterEach(()=>{
  Prototypes.$LoadingBar.success()
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
