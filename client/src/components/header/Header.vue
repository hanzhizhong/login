<template>
  <div class="header">
      <div class="avatar">
          <p><img :src="imgUrl" alt="用户头像"></p>{{username}}
      </div>
      <Button>退出</Button>
      <div><img src="../../assets/img/avatar.jpeg" alt=""></div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            username:'admin',
            imgUrl:'../../assets/img/avatar.jpeg'
        }
    }
}
</script>

<style lang="less" scoped>
    .header{
        height:50px;
        background-color:#fff;
        position:absolute;
        left:200px;
        top:0;
        right:0;
        display:flex;
        justify-content: flex-end;
    }
    .avatar{
        display:flex;
        align-content: center;
        p{
            width:30px;
            height:30px;
            border-radius:50% 50%;
            overflow:hidden;
        }
        img{
            width:30px;
            height:auto;
        }
    }
</style>