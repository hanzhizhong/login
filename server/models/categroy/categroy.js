const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const CategroySchema=new Schema({
    typeName:{
        type:String,
        required:true
    },
    createdTime:{
        type:Date,
        default:Date.now
    }
})

const Categroy=mongoose.model('categroy',CategroySchema)

module.exports=Categroy 