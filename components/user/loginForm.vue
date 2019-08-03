<template>
  <div class="loginform">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" class="tableList">
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="用户名手机"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%" @click="loginSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods:{
      loginSubmit(){
          this.$axios({
              url:'/accounts/login',
              method:'POST',
              data:this.loginForm
          }).then(res=>{
              this.$message.success("登录成功")
            //   登录成功把获取到的值储存到store里面
            this.$store.commit("user/setUserInfo",res.data)
              this.$router.push('/')
          })
      }
  }
};
</script>
<style lang="less" scoped>
/deep/.loginform{
    height: 350px;
    background-color: #fff;
}
/deep/.tableList {
  text-align: center;
  padding: 20px;
}
</style>


