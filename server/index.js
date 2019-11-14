const express=require('express')
const app=express()

const user=require('./api/user/user')

//使用路由的中间件
app.use('/api/user',user)

app.listen(9000,function(){
    console.log('server is running at port 9000')
}) 