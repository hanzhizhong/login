const express=require('express')
const router=express.Router()
const md5=require('md5')

//导入数据库映射模型
const User=require('../../models/users/users')

router.get('/',(req,res)=>{
    res.json({
        err:0,
        msg:'this is user login or register Api'
    })
})

//用户注册
router.post('/register',(req,res)=>{
    let {username,password,age,gender,email}=req.body;
    User.find({username}).then(data=>{
        if(data.length>0){
            res.json({
                err:1,
                msg:'用户已经存在,请直接登录'
            })
        }else{
            password=md5(password)
            let person=new User({username,password,age,gender,email})
            person.save().then(dat=>{
                req.session.isLogin=true;
                res.json({
                    err:0,
                    msg:'注册成功了',
                    data:{username,email,age,gender}
                })
                
            }).catch(err=>{
                res.json({
                    err:2,
                    msg:`注册失败了:${err}`
                })
            })
        }
    }).catch(err=>{
        res.json({
            err:-1,
            msg:`未知错误${err}`
        })
    })
})
//登录
router.post('/login',(req,res)=>{
    let {username,password}=req.body 
    password=md5(password)
    User.findOne({username,password}).then(data=>{
        if(data){
            req.session.isLogin=true;
            res.json({
                err:0,
                msg:'登录成功',
                data:{username,email:data.email,gender:data.gender,age:data.age}
            })
        }else{
            User.find({username}).then(dat=>{
                if(dat.length>0){
                    res.json({
                        err:1,
                        msg:'用户密码错误'
                    })
                }else{
                    res.json({
                        err:2,
                        msg:'新用户请先注册'
                    })
                }
            }).catch(err=>{
                res.json({
                    err:-1,
                    msg:`未知错误：${err}`
                })
            })
            
        }
    }).catch(err=>{
        res.json({
            err:-1,
            msg:`未知错误：${err}`
        })
    })
})

//查询所有用户
router.get('/find',(req,res)=>{
    let {username,password,age,gender,email,pageIndex=1,pageSize=5}=req.query
    User.find().then(data=>{
        res.json({
            err:0,
            msg:'success',
            data:data,
            
        })
    }).catch(err=>{
        res.json({
            err:-1,
            msg:`未知错误：${err}`
        })
    })
})


module.exports=router;