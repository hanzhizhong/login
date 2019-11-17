<template>
  <div class="aside">
    <h3>LOGO</h3>
    <ul>
      <li @click="changePageByPath(item.path)" class v-for="(item,index) in menus" :key="index">
        <i :class="item.icons"></i>
        <span>{{item.name}}</span> 
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    menus: Array
  },
  data() {
    return {};
  },
  methods:{
    changePageByPath(path){
      this.$router.push(path).catch(err=>{
        err
      })
    }
  } 
};
</script>

<style lang="less" scoped>
@color:#fff;
.backgroundImge(@option,@startColor,@endColor){
    background-image:-webkit-linear-gradient(@option,@startColor,@endColor);
    background-image:-moz-linear-gradient(@option,@startColor,@endColor);
    background-image:-o-linear-gradient(@option,@startColor,@endColor);
    background-image:-ms-linear-gradient(@option,@startColor,@endColor);
    background-image:linear-gradient(@option,@startColor,@endColor);
}
.aside {
  width: 200px;
//   background-color: cornflowerblue;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  .backgroundImge(-180deg,rgb(66,137,198),rgb(48,206,172));
}
h3 {
    font-size:24px;
    text-align:center;
    height:100px;
    line-height:100px;
    color:@color;
}
ul {
  li {
    text-indent: 40px;
    height: 40px;
    line-height: 40px;
    color:@color;
    span {
      margin-left: 20px;
      color:fadeOut(@color,30%);
    }
    &:hover{
        background-color:fadeOut(@color,90%);
    }
  }
}
</style>