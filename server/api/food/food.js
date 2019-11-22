const express=require('express')
const router=express.Router()

const Food=require('../../models/foods/foods')
const multer=require('multer')
const upload=multer({dest:'uploads/'})

//食物的增删改查 create read delete update
//create
router.post('/add',upload.single('picture'),(req,res)=>{
    console.log(req.file)
    console.log(req.body)
    let {foodname}=req.body;
    /* Food.find({foodname}).then(ret=>{
        if(ret.length>0){
            res.json({
                err:2,
                msg:'食物名已经存在，请重新命名'
            })
        }else{
            console.log('aa',req.body)
            new Food(req.body).save().then(result=>{
                res.json({
                    err:0,
                    msg:'食物添加成功'
                })
            }).catch(error=>{
                res.json({
                    err:1,
                    msg:`食物添加失败：${error}`
                })
            })
        }
    }).catch(err=>{
        res.json({
            err:-1,
            msg:`未知的错误:${err}`
        })
    }) */
})

//删除
router.delete('/delete',(req,res)=>{
    let {_id}=req.query 
    Food.remove({_id}).then(ret=>{
        res.json({
            err:0,
            msg:'删除成功'
        })
    }).catch(err=>{
        res.json({
            err:-1,
            msg:`未知错误:${err}`
        })
    })

})
//查询
router.get('/findAll',(req,res)=>{
    let {pageIndex=1,pageSize=5}=req.query
    Food.find().countDocuments().then(count=>{
        Food.find().skip((Number(pageIndex)-1)*Number(pageSize)).limit(Number(pageSize)).then(ret=>{
            res.json({
                err:0,
                msg:'success',
                list:ret,
                total:count,
                pageIndex:Number(pageIndex),
                pageSize:Number(pageSize),
                pages:Number(Math.ceil(count/pageSize))
            })
        }).catch(error=>{
            res.json({
                err:-1,
                msg:`未知错误${error}`
            })  
        })
    })
    .catch(err=>{
        res.json({
            err:-1,
            msg:`未知错误${err}`
        })
    })
})
//模糊查询
router.post('/findByCondition',(req,res)=>{
    let {param,pageIndex=1,pageSize=5}=req.body;
    Food.find({$or:[{foodname:param},{description:{$regex:param}}]}).countDocuments().then(count=>{
        if(count){
            Food.find({$or:[{foodname:param},{description:{$regex:param}}]}).skip((Number(pageIndex-1)*Number(pageSize))).limit(Number(pageSize)).then(ret=>{
                res.json({
                    err:0,
                    msg:'success',
                    list:ret,
                    pageIndex:Number(pageIndex),
                    total:count,
                    pages:Math.ceil(count/Number(pageSize)),
                    pageSize:Number(pageSize),
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

module.exports=router