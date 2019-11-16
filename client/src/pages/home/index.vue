<template>
  <div class="home">
    <div class="search">
      <div class="search-wrap">
        <input type="text" v-model="search" placeholder="活动ID,活动名称">
        <i class="icon iconfont icon-icon-test12"></i>
      </div>
      <Button class="h-btn h-btn-primary">+新建活动</Button>
    </div>
    <table class="home-table">
      <thead>
        <th>活动</th>
        <th>活动名称</th>
        <th>品牌类别</th>
        <th>品牌</th>
        <th>进度</th>
        <th>DOT</th>
        <th>操作</th>
      </thead>
      <tbody>
        <template v-if="tableList.length>0">
          <tr v-for="(item,index) in tableList" :key="index">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.goods}}</td>
            <td>{{item.brand}}</td>
            <td>{{item.progress}}</td>
            <td>{{item.transport}}</td>
            <td>
              <Button class="h-btn h-btn-no-border h-btn-transparent h-btn-text-primary">查看</Button>
              <Button class="h-btn h-btn-no-border h-btn-transparent h-btn-text-red">删除</Button>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="7">
            暂无数据，敬请期待
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination v-model="pagination" layout="pager" align="right" @change="currentChange"></Pagination>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tableList: [
        {
          id: 3003003,
          name: "清扬推广活动",
          goods: "洗发水",
          brand: "清扬",
          progress: "Request&Brief",
          transport: "PLA Request"
        },
        {
          id: 3003003,
          name: "清扬推广活动",
          goods: "洗发水",
          brand: "清扬",
          progress: "Request&Brief",
          transport: "PLA Request"
        },
        {
          id: 3003003,
          name: "清扬推广活动",
          goods: "洗发水",
          brand: "清扬",
          progress: "Request&Brief",
          transport: "PLA Request"
        },
        {
          id: 3003003,
          name: "清扬推广活动",
          goods: "洗发水",
          brand: "清扬",
          progress: "Request&Brief",
          transport: "PLA Request"
        }
      ],
      pagination: {
        page: 1,
        size: 10,
        total: 100
      }
    };
  },
  computed:{
    search:{
      get(){
        return ''
      },
      set(val){
        console.log('val',val)
      }
    }
  },
  methods:{
    getTrClass(data,index){
      if(index==0){
        return ['bg-blue-color']
      }
    },
    currentChange(value) {
      console.log(value);
    }
  }
};
</script>

<style lang="less" scoped>
@color: #ffffff;
@bg:#000;
.home {
  width:100%;
  background-color: @color;
  padding:20px;
  
}
.search{
    display:flex;
    justify-content:space-between;
    .search-wrap{
      width:300px;
      height:36px;
      position:relative;
      background-color:lighten(@bg,80%);
      border-radius: 5px;
      input{
        outline:none;
        width:100%;
        height:100%;
        background-color:transparent;
        border:none;
      }
      i{
        position:absolute;
        right:8px;
        font-size:20px;
        line-height:20px;
        top:8px;
        color:lighten(@bg,50%);
      }
    }

  }
  .border(){
    border-top:1px solid lighten(@bg,95%);
    border-bottom:1px solid lighten(@bg,95%);
  }
  .home-table{
    width:100%;
    margin:20px 0;
    border-bottom:1px solid lighten(@bg,95%);
    border-collapse:collapse;
    thead{
      th{
        .border();
        height:50px;
        flex:1;
      }
      th:nth-of-type(1){
        width:13%;
      }
      th:nth-of-type(2){
        width:13%;
      }
      th:nth-of-type(3){
        width:13%;
      }
      th:nth-of-type(4){
        width:13%;
      }
      th:nth-of-type(5){
        width:13%;
      }
      th:nth-of-type(6){
        width:13%;
      }
      
    }
    tbody{
      tr{
        &:hover{
          background-color:lighten(@bg,98%);
        }
      }
      td{
      height:50px;
      text-align:center;
      color:lighten(@bg,50%);
      font-size:14px;
    }
    }
  }
</style>