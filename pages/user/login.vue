<template>
  <div class="login">
    <el-row type="flex" justify="center" align="middle" class="main">
      <div class="form-wrwpper">
      <el-row type="flex" justify="center" class="tabs">
        <span v-for="(item,index) in ['登录','注册']"
         :key="index" @click="handleClick(index)" :class="{active:current===index}">{{item}}</span>
      </el-row>
      <!-- 登录组件 -->
      <LoginForm v-show="current===0"/>
      <!-- 注册组件 -->
      <RegisterForm v-show="current===1"/>
      </div>
    </el-row>
     
  </div>
</template>
<script>
import LoginForm from '@/components/user/loginForm.vue'
import RegisterForm from '@/components/user/registerForm.vue'
export default {
    components:{
       LoginForm,
       RegisterForm 
    },
  data() {
    return {
        current:0 
    }
  },
  methods:{
    handleClick(index){
     this.current=index
    }  
  }
};
</script>
<style lang="less" scoped>
.login{
    background: url('http://157.122.54.189:9095/assets/images/th03.jfif') no-repeat;
    height: 700px; 
    .main{
      height: 100%;
        position: relative;
        margin: 0 auto;
        .form-wrwpper{
          background-color: #fff;
 span{
            width: 230px;
            display: block;
            height: 60px;
            line-height: 60px;
            text-align: center;
            background-color: #eeeeee;
             text-align: center;
        }
        .active{
                color:#ffa500;
                font-weight:600;
                background-color: #fff;
                border-top: 2px solid #ffa500;
            }
        }
       
    }
}
</style>


