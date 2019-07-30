<template>
  <div class="tab">
      <!-- 循环生成三个按钮，然后根据索引值设置出隐藏和显示 -->
    <input
      type="button"
      :value="item"
      v-for="(item,index) in ['新闻','娱乐','体育']"
      :key="index"
      @click="handle(index)"
      :class="{active:curren===index}"
    />
    <!-- 绑定属性，赋值里面的是一个对象，键是属性名，值是布尔值 -->
    <div class="happyNew" v-show="curren===0">
      <P>北京电音节</P>
      <P>北京电音节</P>
      <P>北京电音节</P>
    </div>
    <div class="foot" v-show="curren===1">
      <p>国足进球</p>
      <p>国足进球</p>
      <p>国足进球</p>
    </div>
    <div class="new" v-show="curren===2">
      <p>特大暴雨</p>
      <p>特大暴雨</p>
      <p>特大暴雨</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curren: 0
    };
  },
  methods:{
      handle(index){
          this.curren=index
      }
  }
};
</script>

<style>
.happyNew,
.foot,
.new {
  width: 200px;
  height: 200px;
  line-height: 50px;
  text-align: center;
  border: 2px solid red;
}
.active{
    color: red;
    border-color: red
}
</style>
