<template>
  <div class="header">
      <div class="avatar">
          <span><img :src="imgUrl"></span>{{username}}
      </div>
      <Button class="h-btn h-btn-no-border h-btn-text-red"><i class="icon iconfont icon-tuichu"></i>退出</Button>
  </div>
</template>

<script>
import defaultImg from '../../assets/img/avatar.jpeg'
export default {
    data(){
        return{
            username:'admin',
            imgUrl:defaultImg,
        }
    },
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
        min-width:100px;
        vertical-align: middle;
        line-height: 50px;
        span{
            width:30px;
            height:30px;
            border-radius:50% 50%;
            overflow:hidden;
            margin:10px 5px 0 0;
            float:left;
        }
        img{
            width:auto;
            height:30px;
            
        }
    }
</style>