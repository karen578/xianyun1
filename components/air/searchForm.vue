<template>
  <div class="search">
    <el-row type="flex" class="tabBtns" justify="space-between">
      <span
        v-for="(item,index) in tabClick"
        :key="index"
        :class="{active:currentTab===index}"
        @click="handleClick(index)"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>
    <div class="tabShow">
      <el-row type="flex" justify="center" class="tabRows">
        <span>出发城市</span>
        <el-autocomplete
          v-model="airForm.departCity"
          :fetch-suggestions="querySearchFrom"
          placeholder="请搜索出发城市"
          @select=" handleSelectFrom"
        ></el-autocomplete>
      </el-row>
      <el-row type="flex" justify="center" class="tabRows">
        <span>到达城市</span>
        <el-autocomplete
          v-model="airForm.destCity"
          :fetch-suggestions="querySearchTo"
          placeholder="请搜索到达城市"
          @select=" handleSelectTo"
        ></el-autocomplete>
      </el-row>
      <el-row type="flex" justify="center" class="tabRows">
        <span>出发时间</span>
        <el-date-picker
          v-model="airForm.departDate"
          type="date"
          placeholder="选择日期时间"
          style="width:210px"
          @change="handleChange"
        ></el-date-picker>
      </el-row>
      <p @click="searchSubmit">
        <i class="el-icon-search"></i> 搜索
      </p>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      airForm: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      tabClick: [
        { name: "单程", icon: "iconfont icondancheng" },
        { name: "往返", icon: "iconfont iconshuangxiang" }
      ],
      currentTab: 0
    };
  },
  methods: {
    //   点击按钮触发事件
    handleClick(index) {
      this.currentTab = index;
      if (index === 1) {
        this.$alert("暂时不提供往返功能", "提示", { tyep: "warning" });
      }
    },
    //出发输入框输入触发事件 ,cb的格式是一个数组，里面是一个个对象，对象的属性必须有value
    querySearchFrom(value, cb) {
      //cb为空数组的时候不会触发事件
      if (!value) {
        cb([]);
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: { name: value }
      }).then(res => {
        console.log(res);
        const { data } = res.data;
        //获取到的数据是一个数组。
        // 数组里面的对象没有value值。需要给对象添加一个value值属性，因为cb是展示下来列表的数据，需要有value属性
        const newData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });

        // 如果用户没有从下来列表中选中数据，就默认从下拉列表的数据是用户输入的数据
        this.airForm.departCity = newData[0].name;
        this.airForm.departCode = newData[0].sort;
        cb(newData);
      });
    },
    //到达输入框输入触发事件
    querySearchTo(value, cb) {
      if (!value) {
        cb([]);
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: { name: value }
      }).then(res => {
        const { data } = res.data;
        const newData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        this.airForm.destCity = newData[0].name;
        this.airForm.destCode = newData[0].sort;
        cb(newData);
      });
    },
    //出发下拉列表选择触发事件
    handleSelectFrom(item) {
      console.log(item);
      this.airForm.departCity = item.name;
      this.airForm.departCode = item.sort;
    },
    //出发下拉列表选择触发事件
    handleSelectTo(item) {
      this.airForm.destCity = item.name;
      this.airForm.destCode = item.sort;
    },
    // 选中日期触发事件
    handleChange(value) {
       this.airForm.departDate=moment(value).format('YYYY-MM-DD')   
    },
    // 提交搜索触发的事件
     searchSubmit(){
         if(!this.airForm.departCity){
             this.$alert('出发城市不能为空','提示',{type:'warning'})
             return
         }
         if(!this.airForm.destCity){
             this.$alert('达到城市不能为空','提示',{type:'warning'})
             return
         }
         if(!this.airForm.departDate){
             this.$alert('出发时间不能为空','提示',{type:'warning'})
             return
         }
        //  console.log(this.airForm);
        this.$axios({
            url:'/airs',
            params:this.airForm
        }).then(res=>{
            // console.log(res);
            // 获取到了数据，跳转到机票列表页面
            this.$router.push({
                path:'/air/flights',
                query:this.airForm
            })
        })
         
     }

  }
};
</script>
<style lang="less" scoped>
.search {
  width: 445px;
  height: 350px;
  border: 1px solid #ccc;
  margin-right: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
  .tabBtns {
    background-color: #eeeeee;
    margin-bottom: 10px;
    span {
      flex: 1;
      text-align: center;
      display: block;
      padding: 15px 0;
    }
    .active {
      border-top: 3px solid #ffa500;
      background-color: #fff;
    }
  }
  .tabShow {
    .tabRows {
      padding: 10px 0;
      span {
        margin-right: 8px;
        font-size: 14px;
        margin-top: 10px;
      }
    }
    p {
      width: 210px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #409eff;
      color: #fff;
      margin-left: 105px;
      border-radius: 5px;
      margin-top: 20px;
    }
  }
}
</style>
