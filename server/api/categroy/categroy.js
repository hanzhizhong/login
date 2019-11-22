const express=require('express')
const router=express.Router()

const Categroy=require('../../models/categroy/categroy')

router.get('/',(req,res)=>{
    let {pageIndex=1,pageSize=5}=req.query
    Categroy.find().countDocuments().then(count=>{
        if(count>0){
            Categroy.find().skip((pageIndex-1)*Number(pageSize)).limit(Number(pageSize)).then(ret=>{
                res.json({
                    err:0,
                    msg:'success',
                    list:ret,
                    pageIndex:Number(pageIndex),
                    pageSize:Number(pageSize),
                    total:count,
                    pages:Number(Math.ceil(count/pageSize))
                })
            }).catch(error=>{
                res.json({
                    err:-1,
                    msg:`未知错误:${error}`
                })
            })
        }else{
            res.json({
                err:0,
                msg:'success',
                list:[]
            })
        }
    }).catch(err=>{
        res.json({
            err:-1,
            msg:`未知错误:${err}`
        })
    })
})
//查询所有
router.get('/all',(req,res)=>{
    Categroy.find().then(ret=>{
        res.json({
            err:0,
            msg:'success',
            list:ret,
        })
    }).catch(error=>{
        res.json({
            err:-1,
            msg:`未知错误:${error}`
        })
    })
})
//类型添加
router.post('/add',(req,res)=>{
    let {typeName}=req.body
    Categroy.findOne({typeName}).then(ret=>{
        if(ret){
            res.json({
                err:1,
                msg:'食物类型已经存在，请重新定义'
            })
        }else{
            Categroy.create(req.body).then(dat=>{
                res.json({
                    err:0,
                    msg:'add success'
                })
            }).catch(error=>{
                res.json({
                    err:-1,
                    msg:`未知错误：${error}`
                })
            })
        }
    })
    .catch(err=>{
        res.json({
            err:-1,
            msg:`未知的错误:${err}`
        })
    })
})
//删除类型
router.delete('/delete',(req,res)=>{
    let {_id}=res.body;
    Categroy.remove({_id}).then(ret=>{
        res.json({
            err:0,
            msg:'delete success'
        })
    }).catch(err=>{
        res.json({
            err:-1,
            msg:`未知错误:${err}`
        })
    })
})

//编辑
router.put('/update',(req,res)=>{
    let {_id,typeName}=req.body 
    Categroy.updateOne({_id},{$set:{typeName}}).then(ret=>{
        res.json({
            err:0,
            msg:'update success'
        })
    }).catch(err=>{
        res.json({
            err:-1,
            msg:`未知错误：${err}`
        })
    })
})

module.exports=router