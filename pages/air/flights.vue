<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 因为过滤的时候已经把flightsData的数据改变了，造成过滤完不能恢复原状，所以需要用 缓存cacheFlights-->
        <FlightsFilters :data="cacheFlights" @getDataList="getDataList" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in flightsList" :key="index" :data="item" />
      </div>
      <!-- 侧边栏 -->
      <div class="aside">
        <FlightsAside />
      </div>
    </el-row>
    <!-- 分页   事件size-change是pagesize改变的时候触发
    事件current-change是pagenum改变的时候会触发-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FlightsAside from "@/components/air/flightsAside.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsAside,
    FlightsFilters
  },
  data() {
    return {
      cacheFlights: {
        info: {},
        options: {}
      },
      flightsData: {
        //因为发送的是异步请求，不一定会info,options这个属性，为了不报错所以需要先添加上去
        info: {},
        options: {}
      },
      pagenum: 1,
      pagesize: 2,
      total: 0,
      //保存当前显示的列表数据
      flightsList: []
    };
  },
  methods: {
    // 当pagesize改变的时候触发事件
    handleSizeChange(value) {
      // 参数value值就是pagesize的值
      this.pagesize = value;
      // 然后调用页面数据显示的方法
      this.getDataList();
    },
    handleCurrentChange(value) {
      // 根据当前显示的数据可以知道开始的索引值0，当页面条数是2，
      this.pagenum = value;
      this.getDataList();
    },
    getDataList(arr) {
      if (arr) {
        this.flightsData.flights = arr;
        this.total = arr.length;
      }
      // 当前页面的显示是封装的函数，因为当pagesize和pagenum改变的时候都会触发上面的事件
      this.flightsList = this.flightsData.flights.slice(
        (this.pagenum - 1) * this.pagesize,
        (this.pagenum - 1) * this.pagesize + this.pagesize
      );
    },
    // 请求列表数据
    getData() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        this.flightsData = res.data;
        //因为刷选的时候需要进行分页，但数据不能被改变
        this.cacheFlights = { ...res.data };
        console.log(this.flightsData);
        this.total = this.flightsData.flights.length;
        //让当前显示的数据=大数据的前面两条，用slice()的数组方法
        this.flightsList = this.flightsData.flights.slice(0, 2);
      });
    }
  },
  watch: {
    //监听url的变化用$toute函数，想要侦听哪个属性的变化，
    // 就添加与这个属性同名的侦听器，只有名字完全一致，才会进行侦听，否则不会触发
    $route() {
       this.getData()
    }
  },

  mounted() {
    this.getData()
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>