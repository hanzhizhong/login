const mongoose=require('mongoose')
const config=require('../config/config')
mongoose.connect(`${config.db.address}/${config.db.name}`,{useNewUrlParser: true, useUnifiedTopology: true})
let db=mongoose.connection;
db.on('error',(err)=>{
    console.log(`数据库连接失败${err}`);

})
db.once('open',()=>{
    console.log('数据库连接成功')
})