<template>
  <div class="addfood">
    <h3>添加食物信息</h3>
    <Button class="h-btn h-btn-text-primary">
      <i class="h-icon-left"></i>返回
    </Button>
    <hr />
    <div class="food-data">
      <label>食物名称:</label>
      <input type="text" v-model="foodname" />
    </div>
    <div class="food-data">
      <label>价格:</label>
      <input type="text" v-model="price" />
    </div>
    <div class="food-data">
      <label>食品类型:</label>
      <select name="categroy" v-model="categroy">
        <option value>请选择食品类型</option>
      </select>
    </div>

    <div class="food-data">
      <label>图片展示:</label>
      <div class="img-container">
        <i class="icon iconfont icon-icon-test32" v-if="!isShowPic"></i>
        <input type="file" @change="pictureChoose($event)" />
        <div v-if="isShowPic" class="img-food">
          <img :src="showPic" alt />
          <span>{{imgName}}</span>
        </div>
      </div>
    </div>
    <div class="food-data">
      <label>当前描述:</label>
      <textarea name="description" cols="30" rows="10" v-model="description"></textarea>
    </div>
    <div class="food-data">
      <label>地址信息:</label>
      <select name="province" v-model="province" @change="chooseCityName">
        <option value>请选择省市</option>
        <template v-for="(item,index) in cityList">
          <option :key="index" v-if="item.pid==null" :value="item.cid">{{item.cTitle}}</option>
        </template>
      </select>
      <select name="city" v-model="city" @change="chooseAreaName">
        <option value>请选择城市</option>
        <template v-if="cities.length>0">
          <option v-for="(item,index) in cities" :key="index" :value="item.cid">{{item.cTitle}}</option>
        </template>
      </select>
      <select name="area" v-model="area">
        <option value>选择地区</option>
        <template v-if="areaList.length>0">
          <option v-for="(item,index) in areaList" :key="index" :value="item.cid">{{item.cTitle}}</option>
        </template>
      </select>
      <input type="text" v-model="detail" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      foodname: "",
      price: "",
      categroy: "",
      description: "",
      province: "",
      city: "",
      area: "",
      detail: "",
      isShowPic: false,
      imgName: "",
      showPic: "",
      cityList: [],
      cities: [],
      areaList: []
    };
  },
  methods: {
    pictureChoose(e) {
      let file = e.target.files[0];
      this.imgName = file.name;
      this.isShowPic = true;
      this.showPic = window.URL.createObjectURL(file);
    },
    getAllCity() {
      this.$axios
        .get("/city/all")
        .then(ret => {
          if (ret.data.err != 999) {
            this.cityList = ret.data.list;
          } else {
            this.$router.push({ name: "login" });
          }
        })
        .catch(err => {
          this.$Notice["error"](`获取城市失败${err}`);
        });
    },
    //获取澄市名称
    chooseCityName() {
      this.city=""
      this.area=''
      let pids = this.cityList.filter((item, index) => {
        return this.province == item.pid;
      });
      this.cities = pids;
    },
    //获取行政区的名称
    chooseAreaName() {
      this.area=''
      let cids = this.cityList.filter((item, index) => {
        return this.city == item.pid;
      });

      this.areaList = cids;
    }
  },
  mounted() {
    this.getAllCity();
  }
};
</script>

<style lang="less" scoped>
@color: #666666;
.addfood {
  width: 100%;
  background-color: #fff;
  padding: 20px;
}
hr {
  margin: 20px 0 0;
  border: none;
  border-bottom: 1px solid;
  border-color: lighten(#000000, 85%) !important;
}
h3 {
  color: @color;
  font-size: 20px;
  float: left;
  min-width: 150px;
  margin-right: 20px;
}
.food-data {
  padding: 20px 0;
  display: flex;
  align-items: center;
  label {
    min-width: 150px;
    text-align: right;
    margin-right: 20px;
  }
  textarea {
    min-width: 400px;
    resize: none;
  }
  select {
    height: 40px;
    border-color: lighten(#000000, 90%);
    border-radius: 4px;
    margin-right: 10px !important;
  }
  &:nth-of-type(5) {
    label {
      align-self: flex-start;
    }
  }
  &:nth-of-type(4) {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    label {
      align-self: flex-start;
    }
    .img-container {
      width: 300px;
      height: 300px;
      background-color: #dedede;
      position: relative;
      text-align: center;
      align-self: flex-start;
      margin-left: 170px;
      input {
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
      }
      i {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 100px;
        color: #ccc;
      }
      .img-food {
        position: absolute;
        left: 0;
        top: 0;
        width: 300px;
        height: 300px;
        overflow: hidden;
        img {
          height: 260px;
          width: auto;
          position: absolute;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
        }
        span {
          width: 100%;
          text-align: center;
          position: absolute;
          bottom: 0;
          left: 0;
          line-height: 40px;
        }
      }
    }
  }
}
</style>