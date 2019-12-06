const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const path = require('path')
const fs=require('fs')

const Food = require('../../models/foods/foods')
/* const multer=require('multer')
const upload=multer({dest:'uploads/'}) */


//食物的增删改查 create read delete update
//create
router.post('/add', (req, res) => {
    let form = new formidable.IncomingForm()
    form.uploadDir = 'upload'
    form.keepExtensions = true
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.parse(req, (err, fields, files) => {

        if (err) {
            console.error(err)
            return
        }
        let {
            foodname,
            price,
            description,
            categroy,
            address
        } = fields;
        let picture=''
        if(Object.keys(files).length!=0){
            picture = '/'+(files.picture.path.replace(/\\/gi,'/'))
        }

        Food.find({
            foodname
        }).then(ret => {
            if (ret.length > 0) {
                if(Object.keys(files).length!=0){
                    fs.unlink('upload/'+path.basename(files.picture.path),(err)=>{
                        if(err){
                            console.log('文件删除',err)
                        }
                    })
                }
                res.json({
                    err: 2,
                    msg: '食物名已经存在，请重新命名'
                })
            } else {
                new Food({foodname, price, description, categroy, address, picture}).save().then(result => {
                    res.json({
                        err: 0,
                        msg: '食物添加成功'
                    })
                }).catch(error => {
                    if(Object.keys(files).length!=0){
                        fs.unlink('upload/'+path.basename(files.picture.path),(err)=>{
                            if(err){
                                console.log('文件删除',err)
                            }
                        })
                    }
                    res.json({
                        err: 1,
                        msg: `食物添加失败：${error}`
                    })
                })
            }
        }).catch(err => {
            if(Object.keys(files).length!=0){
                fs.unlink('upload/'+path.basename(files.picture.path),(err)=>{
                    if(err){
                        console.log('文件删除',err)
                    }
                })
            }
            res.json({
                err: -1,
                msg: `未知的错误:${err}`
            })
        })


    })

    
})

//删除
router.delete('/delete', (req, res) => {
    let {
        _id
    } = req.query
    Food.deleteOne({
        _id
    }).then(ret => {
        res.json({
            err: 0,
            msg: '删除成功'
        })
    }).catch(err => {
        res.json({
            err: -1,
            msg: `未知错误:${err}`
        })
    })

})
//查询
router.get('/findAll', (req, res) => {
    let {
        pageIndex = 1, pageSize = 5
    } = req.query
    Food.find().countDocuments().then(count => {
            Food.find().sort({createdTime:-1}).skip((Number(pageIndex) - 1) * Number(pageSize)).limit(Number(pageSize)).then(ret => {
                res.json({
                    err: 0,
                    msg: 'success',
                    list: ret,
                    total: count,
                    pageIndex: Number(pageIndex),
                    pageSize: Number(pageSize),
                    pages: Number(Math.ceil(count / pageSize))
                })
            }).catch(error => {
                res.json({
                    err: -1,
                    msg: `未知错误${error}`
                })
            })
        })
        .catch(err => {
            res.json({
                err: -1,
                msg: `未知错误${err}`
            })
        })
})
//模糊查询
router.post('/findByCondition', (req, res) => {
    let {
        param,
        pageIndex = 1,
        pageSize = 5
    } = req.body;
    Food.find({
        $or: [{
            foodname: param
        }, {
            description: {
                $regex: param
            }
        }]
    }).countDocuments().then(count => {
        if (count) {
            Food.find({
                $or: [{
                    foodname: param
                }, {
                    description: {
                        $regex: param
                    }
                }]
            }).sort({createdTime:-1}).skip((Number(pageIndex - 1) * Number(pageSize))).limit(Number(pageSize)).then(ret => {
                res.json({
                    err: 0,
                    msg: 'success',
                    list: ret,
                    pageIndex: Number(pageIndex),
                    total: count,
                    pages: Math.ceil(count / Number(pageSize)),
                    pageSize: Number(pageSize),
                })
            }).catch(error => {
                res.json({
                    err: -1,
                    msg: `未知错误:${error}`
                })
            })
        } else {
            res.json({
                err: 0,
                msg: 'success',
                list: []
            })
        }

    }).catch(err => {
        res.json({
            err: -1,
            msg: `未知错误:${err}`
        })
    })
})

//查询一条数据
router.get('/findOne',(req,res)=>{
    let {_id}=req.query 
    Food.findOne({_id}).then(ret=>{
            res.json({
                err:0,
                msg:'success',
                list:ret 
            })
    }).catch(err=>{
        res.json({
            err:-1,
            msg:`未知错误：${err}`
        })
    })
})

//编辑
router.put('/update',(req,res)=>{
    let form =new formidable.IncomingForm()
    form.uploadDir='upload';
    form.keepExtensions=true;
    form.maxFileSize=2*1024*1024
    
    form.parse(req,(err,fields,files)=>{
        if(err){
            res.json({
                err:-1,
                msg:`修改失败：${err}`
            })
            return 

        }
        let {
            _id,
            foodname,
            price,
            description,
            categroy,
            address
        } = fields;
        Food.updateOne({_id},{$set:{foodname,price,description,categroy,address}}).then(ret=>{
            res.json({
                err:0,
                msg:'update success',
                list:ret 
            })
        }).catch(err=>{
            res.json({
                err:-1,
                msg:`未知错误:${err}`
            })
        })
    })
})

module.exports = router