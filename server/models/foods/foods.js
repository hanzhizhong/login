const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const foodSchema=new Schema({
    foodname:{
        type:String,
        required:true
    },
    price:{
        type:String,
        default:'20元'
    },
    description:{
        type:String,
    },
    picture:{
        type:String,
        default:'/img/default_food.png'
    },
    address:{
        type:String,
        required:false
    },
    categroy:{
        type:Number,
        required:true

    },
    createdTime:{
        type:Date,
        default:Date.now
    }

})

const Food=mongoose.model('food',foodSchema)

/* let food=new Food({
    foodname:'炒青菜',
    description:'家常炒青菜，翠玉盘',
    address:'上海市松江区',
    categroy:1
})
food.save() */



module.exports=Food 