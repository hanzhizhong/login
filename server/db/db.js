const mongoose=require('mongoose')
const config=require('../config/config')
mongoose.connect(`mongodb://${config.db.address}/${config.db.name}`)
db=mongoose.connections;
db.on('error',(err)=>{
    console.log(`数据库连接失败${err}`);

})
db.once('open',()=>{
    console.log('数据库连接成功')
})

module.exports=mongoose;