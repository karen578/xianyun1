<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.airport"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.company"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="(item,index) in  airSizeLabel"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //接收父元素传过来的属性
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      airSizeLabel: [
        { label: "大", value: "L" },
        { label: "中", value: "M" },
        { label: "小", value: "S" }
      ]
    };
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      var arr = this.data.flights.filter(v => {
        return v.org_airport_name === value;
      });
      //调用父传子的方法,参数是方法名和要传递的数据
      this.$emit("getDataList", arr);
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      // console.log(value);6,12
      const [from, to] = value.split(",");
      const arr = this.data.flights.filter(v => {
        const start = v.dep_time.split(":")[0]; //[08,00]
        return start >= from && start < to;
      });
      //过滤后把数据传给父组件
      this.$emit("getDataList", arr);
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      //是刷选列表里面的数据，不是航空公司的分类
      const arr = this.data.flights.filter(v => {
        return v.airline_name === value;
      });
      this.$emit("getDataList", arr);
    },

    // 选择机型时候触发
    handleAirSize(value) {
      const arr = this.data.flights.filter(item => {
        return item.plane_size === value;
      });
      this.$emit("getDataList", arr);
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
        //因为双向绑定了数据，直接把数据清空就可以
        this.airport=''
        this.flightTimes=''
        this.company=''
        this.airSizeLabel=[]
        //清空了数据需要恢复到全部数据，就传入所以数据的数组
        this.$emit("getDataList",this.data.flights)
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>