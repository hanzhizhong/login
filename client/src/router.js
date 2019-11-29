import Vue from 'vue' 
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入路由组件名
import Login from './pages/login/Login'
import Home from './pages/home/index'
import AddFood from './pages/home/AddFood'
const Agency =()=>import ('./pages/agency/Agency')
const ReportData=()=>{ return import('./pages/report/ReportData')}

import EditFood from './pages/home/EditFood'
import NotExist from './pages/404/NotExist'

//定制路径规则
const routes=[
    {
        path:'/login',name:'login',component:Login,meta:{
            show:false
        }
    },
    {
        path:'/home',name:'home',component:Home,meta:{
            show:true
        }
    },
    {
        path:'/home/add',name:'addFood',component:AddFood,meta:{
            show:true
        }
    },
    {
        path:'/home/edit',name:'editFood',component:EditFood,meta:{
            show:true
        }
    },
    {
        path:'/agency',name:'agency',component:Agency,meta:{
            show:true
        }
    },
    {
        path:'/report',name:'report',component:ReportData,meta:{
            show:true
        }
    },
    {
        path:'/',redirect:{name:'home'}
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