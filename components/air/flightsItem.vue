<template>
  <div class="flightslist" @click="isShow=!isShow">
    <!-- 显示出来的列表详情 -->
    <el-row type="flex" class="listDetail" justify="space-between">
      <el-col :span="7" class="flightName">
        <span>{{data.airline_name}}</span>
        <span>{{data.flight_no}}</span>
      </el-col>
      <el-col :span="4" class="desLocation">
        <p>{{data.dep_time}}</p>
        <span>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
      </el-col>
      <el-col :span="4" class="timing">
        <p>{{getTime}}</p>
      </el-col>
      <el-col :span="4" class="desLocation">
        <p>{{data.arr_time}}</p>
        <span>{{data.dst_airport_name}}{{data.dst_airport_quay}}</span>
      </el-col>
      <el-col :span="5" class="price">
        <span>￥</span>
        <strong>{{data.seat_infos[0].org_settle_price_child}}</strong>
        <span>起</span>
      </el-col>
    </el-row>
    <!-- 隐藏的列表详情 align="middle"是为了侧轴水平方向垂直-->
    <div class="hiddenBox">
      <el-row type="flex" class="contain" justify="space-between" align="middle" v-show="isShow">
        <el-col :span="4" class="leftContain">
          <span>低价推荐</span>
        </el-col>
        <el-col :span="20">
          <!-- 需要把一列列改成一行行，用el-row -->
          <el-row
            type="flex"
            class="middleContain"
            justify="space-between"
            align="middle"
            v-for="(item,index) in data.seat_infos"
            :key="index"
          >
            <el-col :span="14" class="containText">
              <span>{{item.group_name}}</span>
              | {{item.supplierName}}
            </el-col>
            <el-col :span="4" class="priceCoupon">
              <span>￥{{item.settle_price_coupon}}</span>
            </el-col>
            <el-col :span="4" class="selectBtn">
              <p class="btn">选定</p>
              <p class="remain">剩余{{item.discount}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  // 计算属性
  computed: {
    getTime() {
      //    22:10  20:20
      const des = this.data.dep_time.split(":"); //[20,20]
      const arr = this.data.arr_time.split(":"); //[22,10]
      const desValue = des[0] * 60 + +des[1];
      const arrValue = arr[0] * 60 + +arr[1];
      let dis = Math.floor((arrValue - desValue) / 60);
      if (desValue > arrValue) {
        dis += 24;
      }
      const min = dis % 60;
      //   return返回多数据时记得带上括号
      return dis + "时" + min + "分";
    }
  }
};
</script>
<style lang="less" scoped>
.flightslist {
  margin: 10px 0;
  // height: 100px;
  .listDetail {
    border: 1px solid #ccc;
    padding: 20px 0;
    .flightName {
      font-size: 14px;
      margin-left: 65px;
      margin-top: 10px;
    }
    .desLocation {
      margin-left: -50px;
      p {
        font-size: 24px;
        margin-top: -5px;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }
    .timing {
      margin-left: -50px;

      p {
        width: 55px;
        font-size: 14px;
        color: #999;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
      }
    }
    .price {
      margin-top: 5px;
      span {
        font-size: 14px;
      }
      strong {
        font-size: 24px;
        color: #ffa500;
        font-weight: normal;
      }
    }
  }
  .hiddenBox {
    background-color: #f6f6f6;
    font-size: 12px;
    .contain {
      .leftContain {
        text-align: center;
        vertical-align: middle;
        font-size: 14px;
      }
      .middleContain {
        padding: 20px 0;
        border-bottom: 1px solid #eee;
        .containText {
          span {
            color: #22922b;
          }
        }
        .priceCoupon {
          font-size: 20px;
          color: #ffa500;
        }
        .selectBtn {
          .btn {
            width: 75px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #fff;
            background-color: #ffa500;
            border-radius: 5px;
          }
          .remain{
            font-size: 14px;
            color: #666;
            margin-top: 10px;
            margin-left: 15px;
          }
        }
      }
    }
  }
}
</style>


