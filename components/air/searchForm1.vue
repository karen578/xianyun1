<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item,index) in tabs"
        :key="index"
        @click="handleSearchTab(index)"
        :class="{active:currentTab===index}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
        v-model="airForm.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
        v-model="airForm.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker v-model="airForm.departDate" type="date" placeholder="请选择日期" style="width: 100%;" @change="handleDate"></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
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
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0
    };
  },
  methods: {
    // tab切换时触发,如果形参是一个，实参也就传入一个
    handleSearchTab(index) {
      this.currentTab = index;
      if( this.currentTab===1){
          this.$alert('暂时不支持往返','提示',{type:'warning'})
      }
    },

    //出发城市每次输入值时候就触发
    // value：输入框的值
    //cb:回调函数，必须要调用，接收参数的格式是固定的，必须是一个数组，数组中每一项必须是一个对象
    //对象中必须包含value属性
    queryDepartSearch(value, cb) {
        if(!value){
            // cb是里面展示数据的，是一个数组包着对象，如果是空数组就不展示数据，退出
            cb([])
            return
        }
      this.$axios({
          url:'/airs/city',
          params:{name:this.airForm.departCity}
      }).then(res=>{
        //   console.log(res.data);
          const{data}=res.data
          const newData=data.map(item=>{
              item.value=item.name.replace('市','')
              return item
          })
          this.airForm.departCity=data[0].name
          this.airForm.departCode=data[0].sort
        // var newData=[]
        // data.forEach(function (item, index) {
        //     item.value=item.name.replace("市","")
        //     newData.push(item)
        // });
          cb(newData)
          //获取出发城市的编号

      })
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      if(!value){
          cb([])
          return
      }
      this.$axios({
          url:'/airs/city',
          params:{name:value}
      }).then(res=>{
         const {data}=res.data
         const newData=data.map(item=>{
             item.value=item.name.replace("市","")
             return item
         })
          //如果用户没有选择下拉列表的值得时候，就给用户默认的值
          this.airForm.destCity=data[0].name
          this.airForm.destCode=data[0].sort
          cb(newData)
      })
     
     
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
        // console.log(item);
        this.$axios({
            url:'/airs/city_sort',
            params:{name:item.name}
        }).then(res=>{
            // console.log(res);
            this.airForm.departCode=res.data.data
        //     console.log(this.airForm.departCode);
        })
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
        this.$axios({
            url:'/airs/city_sort',
            params:{name:item.name}

        }).then(res=>{
            this.airForm.destCode=res.data.data
            console.log(this.airForm.destCode);
        })
        
    },

    // 确认选择日期时触发
    handleDate(value) {
      this.airForm.departDate=moment(value).format('YYYY-MM-DD')
    //   console.log(this.airForm.departDate);
    },

    // 出发和目标城市切换时触发
    handleReverse() {
// 先把几个目标数据从airForm中解构出来，然后再进行赋值
       const{departCity,departCode,destCity,destCode}=this.airForm
       this.airForm.departCity=destCity 
       this.airForm.departCode=destCode 
       this.airForm.destCity=departCity
       this.airForm.destCode=departCode
    },

    // 提交表单是触发
    handleSubmit() {
        console.log(this.airForm);
        this.$axios({
            url:'/airs',
            params:this.airForm
        }).then(res=>{
            this.$router.push({
              path:'/air/flights',
              query: this.airForm
            })
        })

    }
  }
  
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
