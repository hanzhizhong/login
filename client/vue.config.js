
const globalVars=require('./src/assets/css/var.js')

module.exports={
    lintOnSave:false,
    css:{
        loaderOptions:{
            less:{
                globalVars
            }
        }
    },
    //前端跨域的解决方法
    devServer:{
        proxy:{
            '/api':{
                target:'http://localhost:9000/api',
                changeOrigin:true,
                secure:false,//https:时为true
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }

}

