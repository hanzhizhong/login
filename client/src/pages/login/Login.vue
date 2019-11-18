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
          <input
            type="text"
            class="username"
            v-model="username"
            @focus="clearErrorStyle($event)"
            @blur="checkRegularRequrie($event)"
          />
        </div>
        <div class="form">
          <label for="password">密码：</label>
          <input
            type="password"
            class="password"
            v-model="password"
            @focus="clearErrorStyle($event)"
            @blur="checkRegularRequrie($event)"
          />
        </div>
        <div class="form">
          <Button @click="loginSystem" class="h-btn h-btn-primary">登录</Button>
        </div>
      </div>
      <div v-if="isRegister" class="submit-form register-submit animated fadeIn">
        <div class="form">
          <label>用户名：</label>
          <input
            type="text"
            class="username"
            v-model="username"
            @blur="checkRegularRequrie($event)"
            @focus="clearErrorStyle($event)"
          />
        </div>
        <div class="form">
          <label>密码：</label>
          <input
            type="password"
            class="password"
            v-model="password"
            @blur="checkRegularRequrie($event)"
            @focus="clearErrorStyle($event)"
          />
        </div>
        <div class="form">
          <label>确定密码：</label>
          <input type="password" v-model="password2" @blur="checkPassword" />
        </div>
        <div class="form">
          <label>邮箱：</label>
          <input
            type="text"
            class="email"
            v-model="email"
            @blur="checkRegularRequrie($event)"
            @focus="clearErrorStyle($event)"
          />
        </div>
        <div class="form">
          <label>年龄：</label>
          <input
            type="text"
            class="age"
            v-model="age"
            @blur="checkRegularRequrie($event)"
            @focus="clearErrorStyle($event)"
          />
        </div>
        <div class="form">
          <label>性别：</label>
          <Radio v-model="gender" :datas="genderParams"></Radio>
        </div>
        <div class="form">
          <Button class="h-btn h-btn-primary" @click="registerSystem">同意协议并注册</Button>
          <a href="#" class="gray-color">注册协议</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      password2: "",
      email: "",
      isLogin: true,
      isRegister: false,
      gender: "-1",
      age: 0,
      genderParams: { "-1": "保密", "0": "女", "1": "男" },
      isCorrectOfUsername: false,
      isCorrectOfPassword: false,
      isCorrectOfEmail: false,
      isCorrectOfAge: false
    };
  },
  methods: {
    loginBySignIn() {
      this.isLogin = true;
      this.isRegister = false;
    },
    loginBySignUp() {
      this.isLogin = false;
      this.isRegister = true;
    },
    loginSystem() {
      if (this.isCorrectOfUsername && this.isCorrectOfPassword) {
        let [username, password] = [this.username, this.password];
        this.$axios
          .post("/user/login", { username, password })
          .then(dat => {
            if (dat.data.err != 0) {
              this.$Notice["error"](`登录出错:${dat.data.msg}`);
            } else {
              sessionStorage.setItem("userInfo", JSON.stringify(dat.data.data));
              this.$router.push("/home");
            }
          })
          .catch(err => {
            this.$Notice["error"](`登录出错:${err}`);
          });
      } else {
        this.$Notice["error"]("姓名和密码不能为空,且要符合提交条件");
        if (this.username == "") {
          document.querySelector(".username").style.borderColor = "red";
        }
        if (this.password == "") {
          document.querySelector(".password").style.borderColor = "red";
        }
      }
    },
    clearErrorStyle(event) {
      event.target.style.borderColor = "";
    },
    //用户名和密码的正则匹配
    checkRegularRequrie(event) {
      let text = event.target.value;
      switch (event.target.className) {
        case "username":
          if (!/\w{5,}/.test(text)) {
            this.$Message["info"](
              "用户名格式错误，只能包含字母数字下划线,最小5位字符"
            );
            event.target.style.borderColor = "red";
            this.isCorrectOfUsername = false;
          } else {
            this.isCorrectOfUsername = true;
          }
          break;
        case "password":
          if (!/\w{6,}/.test(text)) {
            this.$Message["info"](
              "密码格式错误，只能包含字母数字下划线,最小6位字符"
            );
            event.target.style.borderColor = "red";
            this.isCorrectOfPassword = false;
          } else {
            this.isCorrectOfPassword = true;
          }
          break;
        case "email":
          if (
            !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(text)
          ) {
            this.$Message["info"]("邮箱格式错误");
            event.target.style.borderColor = "red";
            this.isCorrectOfEmail = false;
          } else {
            this.isCorrectOfEmail = true;
          }
          break;
        case "age":
          if (!/^[0-9]{1,2}$|^[1][0-1][0-9]$|^120$/.test(text)) {
            this.$Message["info"]("年龄的限制在0-120之间");
            event.target.style.borderColor = "red";
            this.isCorrectOfAge = false;
          } else {
            this.isCorrectOfAge = true;
          }
          break;
      }
    },
    //注册
    registerSystem() {
      if (
        this.isCorrectOfEmail &&
        this.isCorrectOfUsername &&
        this.isCorrectOfPassword &&
        this.isCorrectOfAge
      ) {
        let [username, password, age, gender, email] = [
          this.username,
          this.password,
          this.age,
          this.gender,
          this.email
        ];
        //console.log(username,password,age,gender,email)
        this.$axios
          .post("/user/register", { username, password, age, gender, email })
          .then(res => {
            if (res) {
              if(res.data.err!=0){
                this.$Notice['error'](`${res.data.msg}`)
              }else{
                sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
              this.$router.push({ name: "home" });
              }
              
            }
          })
          .catch(err => {
            this.$Notice["error"](`注册失败了:${err}`);
          });
      } else {
        this.$Notice["error"]("提交的表单项中有不符合条件,请检查后重新注册");
      }
    },
    //检验密码是否一致
    checkPassword() {
      if (this.password != "" && this.password2 != "") {
        if (this.password != this.password2) {
          this.$Message["error"]("两次密码不一样，请重新确认密码");
        }
      } else {
        this.$Message["warn"]("密码或确认密码不能为空");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: url("../../assets/img/bg.jpg") no-repeat;
  background-position: center top;
  background-size: convert;
  h3 {
    text-align: center;
    margin: 60px auto 20px;
    font-size: 24px;
    color: #fff;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
  }
  .login-method {
    max-width: 400px;
    background-color: #fff;
    margin: 0 auto;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    .login-register-choose {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      height: 50px;
      align-content: center;
      border-bottom: 1px solid #dedede;
      span {
        display: inline-block;
        line-height: 50px;
        position: relative;
        padding: 0 5px;
      }
      .active {
        &:after {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          border: 2px solid red;
        }
      }
    }
    .submit-form {
      padding: 40px;
    }
  }
}
.form {
  margin: 15px auto;
  display: flex;
  justify-content: center;
  height: 40px;
  line-height: 40px;
  label {
    width: 100px;
    text-align: right;
  }
  input {
    flex: 3;
  }
  button {
    margin-left: 100px;
    flex: 1;
  }
  a {
    text-decoration: underline;
    font-size: 12px;
    padding-left: 10px;
  }
}
</style>