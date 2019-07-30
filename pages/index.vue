<template>
  <div class="home">
    <!-- 轮播图 -->
    <el-carousel height="700px" arrow="always">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div class="banners" :style="`background:url(${$axios.defaults.baseURL}${item.url})`"></div>
      </el-carousel-item>
    </el-carousel>
    <div class="search">
      <el-row type="flex">
        <span
          v-for="(item,index) in options"
          :key="index"
          @click="handleClick(index)"
          :class='{active:current===index}'
          class="sbtn"
        >{{item.titile}}</span>
      </el-row>
      <!-- 搜索框 -->
      <el-input :placeholder="options[current].placeholder" style="width:380px">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
  </div>
</template>
.<script>
export default {
  data() {
    return {
      banners: [],
      options: [
        { titile: "攻略", placeholder: "搜索城市" },
        { titile: "酒店", placeholder: "请输入城市搜索酒店" },
        { titile: "机票", placeholder: "搜索城市" }
      ],
      current: 0
    };
  },
  methods: {
    handleClick(index) {
        this.current=index
        if(this.current===2){
            this.$router.push('/air')
        }
    }
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    })
      .then(res => {
        this.banners = res.data.data;
        console.log(this.banners);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less" scoped>
/deep/.el-carousel-item {
  height: 700px;
}
.banners {
  height: 700px;
}
.search {
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 30%;
  .sbtn {
    cursor: pointer;
    width: 80px;
    height: 50px;
    line-height: 30px;
    text-align: center;
    display: block;
    margin-bottom: -20px;
    border: 1px solid #4c5553;
  }
  .active{
      background-color: #fff;
  }
}
</style>


