import Vue from 'vue' 
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入路由组件名
import Login from './pages/login/Login'
import Home from './pages/home/index'
import NotExist from './pages/404/NotExist'

//定制路径规则
const routes=[
    {
        path:'/login',name:'login',component:Login
    },
    {
        path:'/home',name:'index',component:Home
    },
    {
        path:'/',redirect:{name:'index'}
    },
    {
        path:'*',component:NotExist
    }
]

//创建路由的实例对象
const router=new VueRouter({
    mode:'history',
    routes,
})
//到处录用的实例
export default router 