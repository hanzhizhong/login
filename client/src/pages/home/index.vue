<template>
  <div class="home">
    <div class="search">
      <div class="search-wrap">
        <input type="text" v-model="search" @keyup.enter="searchFoodInfo" placeholder="食物名称或者描述内容" />
        <i class="icon iconfont icon-icon-test12" @click="searchFoodInfo"></i>
      </div>
      <Button class="h-btn h-btn-primary" @click="addNewFoodInfo">+新建活动</Button>
    </div>
    <table class="home-table">
      <thead>
        <th>食物名称</th>
        <th>价格</th>
        <th>类别</th>
        <th>图片展示</th>
        <th>描述</th>
        <th>店面地址</th>
        <th>操作</th>
      </thead>
      <tbody>
        <template v-if="tableList.length>0">
          <tr v-for="(item,index) in tableList" :key="index">
            <td>{{item.foodname}}</td>
            <td>{{item.price}}</td>
            <td>{{item.categroy|turn2Text}}</td>
            <td>
              <p style="display:flex;justify-content:center;">
                <ImagePreview :datas="baseImgUrl+item.picture" :width="70" @click="openPreview"></ImagePreview>
              </p>
            </td>
            <td>{{item.description}}</td>
            <td>{{item.address}}</td>
            <td>
              <Button @click="editFoodById(item._id)" class="h-btn h-btn-no-border h-btn-transparent h-btn-text-primary">查看</Button>
              <Button
                class="h-btn h-btn-no-border h-btn-transparent h-btn-text-red"
                @click="delOneFood(item._id)"
              >删除</Button>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="7">暂无数据，敬请期待</td>
        </tr>
      </tbody>
    </table>
    <Pagination
      v-if="tableList.length"
      v-model="pagination"
      layout="pager"
      align="right"
      @change="currentChange"
    ></Pagination>
  </div>
</template>

<script>
let categroyList= []
export default {
  name:'home',
  data() {
    return {
      baseImgUrl: "http://localhost:9000",
      tableList: [],
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      //categroyList: [],
      search: ""
    };
  },
  filters: {
    turn2Text(val){
      let result=categroyList.find((item,index)=>{
        return item._id==val
      })
      if(result!=undefined){
        return result.typeName
      }else{
        return '-'
      }
      
    }
  },
  methods: {
    getTrClass(data, index) {
      if (index == 0) {
        return ["bg-blue-color"];
      }
    },
    getAllFoodList({ ...args }) {
      this.$axios
        .get("/food/findAll", { params: args })
        .then(ret => {
          if (ret.data.err != 999) {
            this.tableList = ret.data.list;
            this.pagination.page = ret.data.pageIndex;
            this.pagination.size = ret.data.pageSize;
            this.pagination.total = ret.data.total;
          } else {
            this.$router.push({ name: "login" });
          }
        })
        .catch(err => {
          this.$Notice["error"](`获取食物信息出错${err}`);
        });
    },
    //页面跳转
    currentChange(value) {
      let pageIndex = value.cur;
      this.getAllFoodList({ pageIndex });
    },
    //图片预览
    openPreview(data) {
      this.$ImagePreview(data);
    },
    //删除一条数据
    delOneFood(_id) {
      this.$axios
        .delete("/food/delete", { params: { _id } })
        .then(ret => {
          if (ret.data.err == 0) {
            this.$Notice["success"]("删除成功");
            this.getAllFoodList({ pageIndex: this.pagination.page });
          }
        })
        .catch(err => {
          this.$Notice["error"](`删除失败了${err}`);
        });
    },
    //查询数据
    searchFoodInfo() {
      let [param, pageIndex, pageSize] = [
        this.search,
        this.pagination.page,
        this.pagination.size
      ];
      if (param != "") {
        this.$axios
          .post("/food/findByCondition", { param })
          .then(ret => {
            if (ret.data.list.length > 0) {
              this.tableList = ret.data.list;
              this.pagination.page = ret.data.pageIndex;
              this.pagination.size = ret.data.pageSize;
              this.pagination.total = ret.data.total;
            } else {
              this.tableList = [];
            }
          })
          .catch(err => {
            this.$Notice["error"](`模糊查询失败:${err}`);
          });
      } else {
        this.getAllFoodList({ pageIndex, pageSize });
      }
    },
    //添加新的食物信息
    addNewFoodInfo() {
      this.$router.push({ name: "addFood" });
    },
    //获取所有的食品类型
    getAllCategroyName() {
      this.$axios
        .get("/categroy/all")
        .then(ret => {
          categroyList = ret.data.list;
        })
        .catch(err => {
          this.$Notice["error"](`获取食品类型出错:${err}`);
        });
    },
    //编辑所选项，编程是导航
    editFoodById(arg){
      this.$router.push({name:'editFood',params:{arg}})
    }
  },
  mounted() {
    this.getAllFoodList();
    this.getAllCategroyName();
  }
};
</script>

<style lang="less" scoped>
@color: #ffffff;
@bg: #000;
.home {
  width: 100%;
  background-color: @color;
  padding: 20px;
}
.search {
  display: flex;
  justify-content: space-between;
  .search-wrap {
    width: 300px;
    height: 36px;
    position: relative;
    background-color: lighten(@bg, 80%);
    border-radius: 5px;
    input {
      outline: none;
      width: 100%;
      height: 100%;
      background-color: transparent;
      border: none;
    }
    i {
      position: absolute;
      right: 8px;
      font-size: 20px;
      line-height: 20px;
      top: 8px;
      color: lighten(@bg, 50%);
    }
  }
}
.border() {
  border-top: 1px solid lighten(@bg, 95%);
  border-bottom: 1px solid lighten(@bg, 95%);
}
.home-table {
  width: 100%;
  margin: 20px 0;
  border-bottom: 1px solid lighten(@bg, 95%);
  border-collapse: collapse;
  thead {
    th {
      .border();
      height: 50px;
      flex: 1;
    }
    th:nth-of-type(1) {
      width: 13%;
    }
    th:nth-of-type(2) {
      width: 13%;
    }
    th:nth-of-type(3) {
      width: 13%;
    }
    th:nth-of-type(4) {
      width: 13%;
    }
    th:nth-of-type(5) {
      width: 13%;
    }
    th:nth-of-type(6) {
      width: 13%;
    }
  }
  tbody {
    tr {
      &:hover {
        background-color: lighten(@bg, 98%);
      }
    }
    td {
      height: 50px;
      text-align: center;
      color: lighten(@bg, 50%);
      font-size: 14px;
    }
  }
}
</style>