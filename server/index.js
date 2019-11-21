const express=require('express')
const app=express()
const db=require('./db/db')
const bodyParser=require('body-parser')
const session=require('express-session')
const config=require('./config/config')
const path=require('path')
//跨域的解决方法cors
//const cors=require('cors')

//配置静态文件的路径
app.use(express.static(path.join(__dirname,'public')))

//配置session的中间件
app.use(session({
    name:'session_id',
    resave:false,
    saveUninitialized:true,
    secret:config.secret,
    cookie:{maxAge:7*24*60*60*1000}
    //cookie:{maxAge:10*1000} 
})) 

//使用cors的第三方插件解决前端跨域问题
//app.use(cors())

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


const user=require('./api/user/user')
const food=require('./api/food/food')
const city=require('./api/city/city')

//在登录时判断是否在登录状态，如果不是登录状态，那么就要用户先登录
app.use('/api',(req,res,next)=>{
    if(req.url=='/user/login'||req.url=='/user/register'){
        next()
    }else{
        if(req.session.isLogin){
            next()
        }else{
            //res.redirect('/api/user/login')
            res.json({
                err:999,
                msg:'请先登录,否则无法操作任何数据'
            })
        }
    }
})

//使用路由的中间件
app.use('/api/user',user)
app.use('/api/food',food)
app.use('/api/city',city)
app.listen(9000,function(){
    console.log('server is running at port 9000')
}) 