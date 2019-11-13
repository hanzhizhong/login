<template>
  <div class="aside">
      <h4>aside的部分</h4>
      <ul>
          <li class="active" v-for="(item,index) in menus" :key="index">
              <span><i :class="item.icon"></i>{{item.name}}</span>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    props:{
        menus:Array,
    },
    data(){
        return{

        }
    }
}
</script>

<style lang="less" scoped>
    .aside{
        width:200px;
        background-color:cornflowerblue;
        position:absolute;
        left:0;
        top:0;
        bottom:0;
    }
</style>