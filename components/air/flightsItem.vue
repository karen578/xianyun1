<template>
  <div class="flight-item"  @click="isShow=!isShow">
    <div>
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{data.airline_name}}</span>{{data.flight_no}}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{data.dep_time}}</strong>
              <span>{{data.org_airport_name}}T1</span>
            </el-col>
            <el-col :span="8" class="flight-time">
                <!-- 计算属性写起来和方法一样，但用起来是属性 -->
              <span>{{rankTime}}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{data.arr_time}}</strong>
              <span>{{data.dst_airport_name}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">{{data.seat_infos[0].org_settle_price}}</span>起
        </el-col>
      </el-row>
    </div>
    <div class="flight-recommend">
      <!-- 隐藏的座位信息列表 -->
      <el-row type="flex" justify="space-between" align="middle" v-show="isShow">
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row type="flex" justify="space-between" align="middle" 
           class="flight-sell" v-for="(item,index) in data.seat_infos" :key="index">
            <el-col :span="16" class="flight-sell-left">
              <span>{{item.group_name}}</span> | {{item.supplierName}}
            </el-col>
            <el-col :span="5" class="price">￥{{item.settle_price_coupon}}</el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini">选定</el-button>
              <p>剩余：{{item.discount}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
            default:{}
        }
    },
    data(){
        return{
            isShow:false

        }
    },
    computed:{
        rankTime(){
            // 08:35用字符串split（）方法分割成数组
           const arr=this.data.arr_time.split(':')
           const dep=this.data.dep_time.split(':')
           //数组的第一项是小时，需要变成分钟，又因为两个字符串可以用++强制变成number
           const arrVal=arr[0]*60+ +arr[1]
           const depVal=dep[0]*60+ +dep[1]
        //    到达时间-出发时间，用Math.floor方法向下取值
           let dis=Math.floor((arrVal-depVal)/60)
        //    如果是凌晨达到的话需要进行+24
           if(arrVal<depVal){
              dis+=24 
           }
        //    得到的小时用%取余就是分钟
           let min=dis%60  
           //因为是一个函数，所以需要return返回数据
           return (dis+"小时"+min+"分")
        }
    }
};
</script>

<style scoped lang="less">
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>