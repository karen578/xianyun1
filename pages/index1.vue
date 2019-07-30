<template>
  <div class="container">
    <!-- 轮播图 -->
    <!-- interval是表示的间隔时间，arrow是切换箭头的显示时机 -->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item,index) in images" :key="index">
        <!-- 因为图片的地址是后端服务器获得，跨域了就要用$axios.defaults.baseURL的基准路径拼接 -->
        <div class="bgcimgs" :style="`background: url(${$axios.defaults.baseURL}${item.url}) no-repeat`">
          <!-- 按钮 -->
          <div class="search">
            <el-row type="flex">
            <input type="button" :value="item.title"
            v-for="(item,index) in btns" :key="index"
            @click="handleClick(index)"
            :class="{active:current}"
             class="btn"/>
             </el-row>
             <!-- btns的索引值要用data里面定义的数据 -->
            <el-input :placeholder="btns[current].placeholder"
             class="input-with-select" style="width:500px">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
      ],
      btns:[
        {title:'攻略',placeholder:'搜索城市'},
        {title:'酒店',placeholder:'请输入城市搜索酒店'},
        {title:'机票',placeholder:''}
      ],
      current:0
    };
  },
  methods:{
    handleClick(index){
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
       this.images=res.data.data
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang='less' scoped>
/deep/.el-carousel__container {
  height: 700px;
}
.bgcimgs {
  height: 700px;
}
.search{
  position: absolute;
  left: 30%;
  top: 50%;
.btn{
  display: block;
  width: 80px;
  height: 50px;
  margin-bottom: -5px;
  color: black;
  
}
}
/deep/.el-input__inner{
    height: 50px;
  }
  .active{
    background-color: #fff ;
  }
</style>
