const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const CityModel=new Schema({
    cid:{
        type:String,
        required:false,
    },
    cTitle:{
        type:String,
        required:false,
    },
    pid:{
        type:String, 
        required:false
    }
})

const City=mongoose.model('city',CityModel)

/* new City({"cid":"110000","cTitle":"北京市","pid":null}).save().then(ret=>{
    console.log(ret)
}).catch(err=>{
    console.log('err',err)
}) */

/* const fs=require('fs')
const path=require('path')
fs.readFile(path.join(__dirname,'../../utils/city.json'),(err,data)=>{
    if(err){
        console.log('读取文件失败',err)
    }else{
        City.insertMany(JSON.parse(data)).then(ret=>{
            console.log('ret',ret)
        }).catch(error=>{
            console.log('err',error)
        })
    }
})
 */


module.exports=City