const express = require('express')
const router = express.Router();

const City = require('../../models/city/city')

//查询数据

router.get('/all', (req, res) => {
    City.find().then(ret => {
        res.json({
            err: 0,
            msg: 'success',
            list:ret,
        })
    }).catch(err => {
        console.log(`未知错误:${err}`)
    })
})

//插入城市
/* router.post('/add', (req, res) => {
    const fs = require('fs')
    const path = require('path')
    fs.readFile(path.join(__dirname, '../../utils/city.json'), (err, data) => {
        if (err) {
            res.json({
                err: 1,
                msg:`读取文件失败:${err}`
            })
        } else {
            City.insertMany(JSON.parse(data)).then(ret => {
                res.json({
                    err: 0,
                    msg: 'success'
                })
            }).catch(error => {
                res.json({
                    err: -1,
                    msg:`未知错误:${error}`
                })
            })
        }
    })

}) */
module.exports = router