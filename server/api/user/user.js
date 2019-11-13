const express=require('express')
const router=express.Router()

router.get('/',(req,res)=>{
    res.json({
        err:0,
        msg:'this is user login or register Api'
    })
})

module.exports=router;