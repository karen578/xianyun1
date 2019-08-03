<template>
  <div class="airhome">
    <div class="header">
      <h2>
        <i class="iconfont iconfeiji"></i>
        国内机票
      </h2>
    </div>
    <el-row type="flex" class="row-bg" justify="space-between">
      <!-- 搜索框 -->
      <SearchForm />
      <!-- tab栏 -->
      <div class="tab">
        <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt />
      </div>
    </el-row>
    <!-- 导航栏 -->
    <el-row type="flex" class="navs" justify="space-between">
      <span>
        <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>100%航协认证
      </span>
      <span>
        <i class="iconfont iconbaozheng" style="color:green;"></i>出行保证
      </span>
      <span style="border-right:none">
        <i class="iconfont icondianhua" style="color:#409EFF;"></i>7x24小时服务
      </span>
    </el-row>
    <div class="sale">
      <h3>
        <i class="iconfont icontejiajipiao"></i> 特价机票
      </h3>
      <div class="salePic">
        <el-row type="flex" justify="space-around">
          <el-col :span="6" v-for="(item,index) in pics" :key="index" class="picsP">
            <img :src="item.cover" alt />
            <el-row type="flex" class="picsText" justify="space-around">
            <span>{{item.departCity}}-{{item.destCity}}</span>
            <span>￥{{Number(item.price).toFixed(2)}}</span>
          </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import SearchForm from "@/components/air/searchForm";
export default {
  components: {
    SearchForm
  },
  data() {
    return {
      pics: []
    };
  },
  mounted() {
    this.$axios({
      url: "/airs/sale"
    }).then(res => {
      this.pics = res.data.data;
    });
  }
};
</script>
<style lang="less" scoped>
.airhome {
  width: 1000px;
  margin: 0 auto;
  margin-top: 5px;
  .header {
    margin: 20px 0;
    i {
      font-size: 20px;
      color: #ffa500;
    }
    h2 {
      color: #ffa500;
      font-weight: normal;
    }
  }
  .navs {
    //   height: 70px;
    line-height: 34px;
    background-color: #f5f5f5;
    margin-bottom: 20px;
    span {
      display: block;
      flex: 1;
      text-align: center;
      margin: 13px 30px;
      border-right: 1px solid #ccc;
      i {
        font-size: 30px;
        vertical-align: middle;
        padding: 0 5px;
      }
    }
  }
  .sale {
    margin-bottom: 30px;
    h3 {
      font-size: 20px;
      color: #4cacff;
      font-weight: 400;
      margin-bottom: 15px;
      i {
        font-size: 30px;
        vertical-align: middle;
      }
    }
    .salePic{
      border: 1px solid #ccc;
      
        .picsP{
            width: 225px;
            height: 150px;
            overflow: hidden;
            padding: 20px 0;
            margin-bottom: 20px;
            position: relative;
            img{
              width: 100%;
            }
        }
        .picsText{
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            background:rgba(0,0,0,.5);
            span{
              color: #fff;
              // margin-left: 20px;
            }
        }
    }
  }
}
</style>

