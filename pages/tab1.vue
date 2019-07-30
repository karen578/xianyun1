<template>
    <div class="tab">
        <input type="button"
         :value="item" v-for="(item,index) in ['新闻','笑话','电影']" 
         :key="index" style="margin-right:20px"
          @click="handleNow(index)"
          :class="{active:current===index}">
          <!-- 绑定属性是一个对象，对象里面的键是属性名，值是布尔值 -->
         <div class="new" v-show="current===0">
             <p>香港机场事件</p>
             <p>香港机场事件</p>
             <p>香港机场事件</p>
         </div>
         <div class="funny" v-show="current===1">
             <p>圆圆熊猫</p>
             <p>圆圆熊猫</p>
             <p>圆圆熊猫</p>
         </div>
         <div class="movie" v-show="current===2">
             <p>哪吒</p>
             <p>哪吒</p>
             <p>哪吒</p>
         </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            current:0
        }
    },
    methods:{
        handleNow(index){
            this.current=index
        }
    }

}
</script>

<style>
.new,.funny,.movie{
    width: 200px;
    height: 200px;
    line-height: 50px;
    text-align: center;
    border: 2px solid red;
    margin: 10px;
}
.active{
    color: red;
    border-color: brown;
}
</style>
