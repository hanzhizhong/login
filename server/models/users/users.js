const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:false,
    },
    gender:{
        type:Number,
        enum:[-1,0,1],
        default:-1
    },
    email:{
        type:String,
        requried:true,
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:'/img/avatar_default.png'
    },
    createdTime:{
        type:Date,
        default:Date.now
    }
})

const User=mongoose.model('user',userSchema)


/* user.save().then(res=>{
    console.log('res',res)
}).catch(err=>{
    console.log('error',err)
}) */

module.exports=User;