<template>
  <div class="addfood">
    <h3>添加食物信息</h3>
    <Button @click="$router.go(-1)" class="h-btn h-btn-text-primary">
      <i class="h-icon-left"></i>返回
    </Button>
    <hr />
    <div class="food-data">
      <label>食物名称:</label>
      <input type="text" v-model="foodname" />
      <em class="red-color">*</em>
    </div>
    <div class="food-data">
      <label>价格:</label>
      <input type="text" v-model="price" />
    </div>
    <div class="food-data">
      <label>食品类型:</label>
      <select name="categroy" v-model="categroy">
        <option value>请选择食品类型</option>
        <template v-if="typeNameList.length>0">
          <option
            v-for="(item,index) in typeNameList"
            :key="index"
            :value="item._id"
          >{{item.typeName}}</option>
        </template>
      </select>
      <em class="red-color">*</em>
    </div>

    <div class="food-data">
      <label>图片展示:</label>
      <div class="img-container">
        <i class="icon iconfont icon-icon-test32" v-if="!isShowPic"></i>
        <input type="file" @change="pictureChoose($event)" name="picture" />
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
    <div class="btn-submit">
      <Button class="h-btn h-btn-primary" @click="saveFood2Store">保存</Button>
      <Button class="h-btn h-btn-gray">取消</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit",
  data() {
    return {
      foodname: "",
      price: "",
      categroy: "",
      description: "",
      province: "",
      city: "",
      area: "",
      typeName: "",
      detail: "",
      address: "",
      isShowPic: false,
      imgName: "",
      showPic: "",
      cityList: [],
      cities: [],
      areaList: [],
      picFile: null,
      typeNameList: [],
      baseImgURL: "http://localhost:9000"
    };
  },
  watch: {
    
  },
  methods: {
    pictureChoose(e) {
      this.picFile = e.target.files[0];
      this.imgName = this.picFile.name;
      this.isShowPic = true;
      this.showPic = window.URL.createObjectURL(this.picFile);
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
      this.city = "";
      this.area = "";
      let pids = this.cityList.filter((item, index) => {
        return this.province == item.pid;
      });
      this.cities = pids;
    },
    //获取行政区的名称
    chooseAreaName() {
      this.area = "";
      let cids = this.cityList.filter((item, index) => {
        return this.city == item.pid;
      });

      this.areaList = cids;
    },
    //添加/保存食物
    saveFood2Store() {
      if (this.detail) {
        let prov = this.cityList.find((item, index) => {
          return this.province == item.cid;
        });
        let cty = this.cityList.find((item, index) => {
          return this.city == item.cid;
        });
        let zone = this.cityList.find((item, index) => {
          return (this.area = item.cid);
        });

        this.address =
          prov.cTitle +
          "/" +
          cty.cTitle +
          "/" +
          zone.cTitle +
          "/" +
          this.detail;
      }
      //console.log(this.foodname,this.price,this.description,this.categroy,this.picFile,this.address)
      let formdata = new FormData();
      formdata.append("foodname", this.foodname);
      formdata.append("price", this.price);
      formdata.append("description", this.description);
      formdata.append("categroy", this.categroy);
      formdata.append("picture", this.picFile);
      formdata.append("address", this.address);

      if (this.foodname == "" || this.categroy == "") {
        this.$Notice["error"]("食物名称和食物类型不能为空");
        return;
      } else {
        this.$axios
          .post("/food/add", formdata)
          .then(ret => {
            if (ret.data.err != 999) {
              if (
                ret.data.err == 2 ||
                ret.data.err == -1 ||
                ret.data.err == 1
              ) {
                this.$Notice["error"](`${ret.data.msg}`);
                return;
              }
              this.$router.push({ name: "home" });
            } else {
              this.$router.push({ name: "login" });
            }
          })
          .catch(err => {
            this.$Notice["error"](`添加食物失败:${err}`);
          });
      }
    },
    //获取食品分类
    getCategroy() {
      this.$axios
        .get("/categroy/all")
        .then(ret => {
          if (ret.data.list.length > 0) {
            this.typeNameList = ret.data.list;
          }
        })
        .catch(err => {
          this.$Notice["error"](`获取食品类型错误${err}`);
        });
    },
    //根据_id值获取当前编辑的项目
    getFoodInfoById() {
      let _id = this.$route.params.arg;
      if (_id != undefined) {
        this.$axios
          .get("/food/findOne", { params: { _id } })
          .then(ret => {
            console.log(ret);
            if (ret.data.list) {
              this.foodname = ret.data.list.foodname;
              this.price = ret.data.list.price;
              this.categroy = ret.data.list.categroy;
              this.description = ret.data.list.description;
              this.address = ret.data.list.address;
              this.showPic = this.baseImgURL + ret.data.list.picture;
              if (this.showPic) {
                this.isShowPic = true;
              }
            }
          })
          .catch(err => {
            this.$Notice["error"](`获取食物信息失败了:${err}`);
          });
      } else {
        this.$router.go(-1);
      }
    }
  },
  mounted() {
    this.getCategroy();
    this.getAllCity();
    this.getFoodInfoById();
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
  input {
    margin-right: 10px;
  }
  em {
    font-size: 20px;
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
.btn-submit {
  display: flex;
  justify-content: flex-start;

  padding: 20px 170px;
  button {
    margin-right: 20px;
  }
}
</style>