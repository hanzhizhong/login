<template>
  <div class="login">
      <h3>xxx系统登录注册</h3>
      <div class="login-method">
        <div class="login-register-choose">
            <span :class="{'active':isLogin}" @click="loginBySignIn">快速登录</span>
            <span :class="{'active':isRegister}" @click="loginBySignUp">快速注册</span>
        </div>
        <div v-if="isLogin" class="submit-form login-submit animated fadeIn">
            <div class="form">
                <label for="username">用户名：</label>
                <input type="text" name="username" v-model="username">
            </div>
            <div class="form">
                <label for="password">密码：</label>
                <input type="password" name="password" v-model="password">
            </div>
            <div class="form">
                <Button class="h-btn  h-btn-primary">登录</Button>
            </div>
        </div>
        <div v-if="isRegister" class="submit-form register-submit animated fadeIn">
            <div class="form">
                <label>用户名：</label>
                <input type="text" name="username" v-model="username">
            </div>
            <div class="form">
                <label>密码：</label>
                <input type="password" name="password" v-model="password">
            </div>
            <div class="form">
                <label>确定密码：</label>
                <input type="password" name="password2" v-model="password2">
            </div>
            <div class="form">
                <label>
                    邮箱： 
                </label>
                <input type="text" name="email" v-model="email">
            </div>
            <div class="form">
                <Button class="h-btn h-btn-primary">同意协议并注册</Button><a href="#" class="gray-color">注册协议</a>
            </div>
        </div>
      </div>
      
  </div>
</template>

<script>
export default {
    data(){
        return{
            username:'',
            password:'',
            password2:'',
            email:'',
            isLogin:true,
            isRegister:false,
        }
    },
    methods:{
        loginBySignIn(){
            this.isLogin=true;
            this.isRegister=false;
        },
        loginBySignUp(){
            this.isLogin=false;
            this.isRegister=true;
        }
    }
}
</script>

<style lang="less" scoped>
    .login{
        position:absolute;
        left:0;
        top:0;
        bottom:0;
        right:0;
        background:url('../../assets/img/bg.jpg') no-repeat;
        background-position:center top;
        background-size: convert;
        h3{
            text-align:center;
            margin:60px auto 20px;
            font-size:24px;
            color:#fff;
            text-shadow:1px 1px 1px rgba(0,0,0,0.8);
        }
        .login-method{
            max-width:400px;
            background-color:#fff;
            margin:0 auto;
            box-shadow: 0 0 5px rgba(0,0,0,0.5);
            .login-register-choose{
                display:flex;
                flex-direction: row;
                justify-content: space-around;
                height:50px;
                align-content: center;
                border-bottom:1px solid #dedede;
                span{
                    display:inline-block;
                    line-height:50px;
                    position:relative;
                    padding:0 5px;
                    
                }
                .active{
                    &:after{
                        content:'';
                        display:block;
                        position:absolute;
                        left:0;
                        bottom:0;
                        width:100%;
                        border:2px solid red;
                    }
                }

            }
            .submit-form{
                padding:40px;
            }
        }
    }
    .form{
        margin:15px auto;
        display:flex;
        justify-content:center;
        height:40px;
        line-height:40px;
        label{
            width:100px;
            text-align:right;
        }
        input{
            flex:3;
        }
        Button{
            margin-left:100px;
            flex:1;
        }
        a{
            text-decoration:underline;
            font-size:12px;
            padding-left:10px;
        }
        
    }
</style>