
const globalVars=require('./src/assets/css/var.js')

module.exports={
    lintOnSave:false,
    css:{
        loaderOptions:{
            less:{
                globalVars
            }
        }
    }

}

