const mongoose=require('../../db/db')

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
        type:Number,
        required:true
    },
    createdTime:{
        type:Date,
        default:Date.now
    }
})

const User=mongoose.model('user',userSchema)

