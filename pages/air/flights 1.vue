<template>
  <div class="flights">
    <el-row type="flex" justify="space-between">
      <!-- 主要内容 -->
      <el-col :span="18" class="contain">
        <!-- 列表头部信息 -->
        <div class="flightsListHeard">
          <el-row type="flex" class="listHear" justify="space-around">
            <el-col :span="6" v-for="(item,index) in ['航空信息','起飞时间','到达时间','价格']" :key="index">
              <span>{{item}}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 列表详情 先循环当前页面显示的条数，然后进行父传子值 -->
        <FlightsItem v-for="(item,index) in flightsList" :key="index" :data="item" />
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageindex"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-col>

      <!-- 右侧边 -->
      <el-col :span="6" class="rightAside"></el-col>
    </el-row>
  </div>
</template>
<script>
import FlightsItem from "@/components/air/flightsItem";
export default {
  components: {
    FlightsItem
  },
  data() {
    return {
      flightsData: {},
      pageindex: 1,
      pagesize: 2,
      total: 0,
      flightsList: [] //把当前页面显示的机票列表先存起来
    };
  },
  methods: {
    //改变页面条数触发事件
    handleSizeChange(value) {
      this.pagesize = value;
      this.getPage()
    },
    //改变当前页触发事件
    handleCurrentChange(value) {
      //   当前页面的显示this.flightsData.flights.slice(0,2)//(2,4)
      this.pageindex=value
      this.getPage()
    },
    getPage() {
      this.flightsList = this.flightsData.flights.slice(
        (this.pageindex - 1) * this.pagesize,
       (this.pageindex - 1) * this.pagesize + this.pagesize
      );
    }
  },
  mounted() {
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      this.flightsData = res.data;
      this.total = this.flightsData.flights.length;
      this.flightsList = this.flightsData.flights.slice(0, 2);
      //  console.log(this.flightsList);
    });
  }
};
</script>
<style lang="less" scoped>
.flights {
  width: 1000px;
  margin: 20px auto;
  .flightsListHeard {
    // width: 930px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #f6f6f6;
    border: 1px solid #ccc;
    font-size: 12px;
  }
}
</style>


