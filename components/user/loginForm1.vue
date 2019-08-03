<template>
  <div class="login">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" class="form">
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="用户名/手机"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="密码"></el-input>
      </el-form-item>
      <p class="form-text">
        <nuxt-link to="#">忘记密码</nuxt-link>
      </p>
      <el-form-item>
        <el-button type="primary" @click="loginSubmit" style="width:100%">登录</el-button>
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
  methods: {
    loginSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$axios({
            url: "/accounts/login",
            method: "POST",
            data: this.loginForm
          }).then(res => {
              //把获取到的数据设置保存到仓库里面 
              console.log(res.data);
            this.$store.commit('user/setUserInfo',res.data)
            this.$router.push("/")
        })
      };
    })
  }
}
}
</script>
<style lang="less" scoped>
.login {
  .form {
    margin-top: 30px;
    padding: 15px 20px;
    .form-text {
      font-size: 12px;
      color: #409eff;
      text-align: right;
      line-height: 1;
      margin-bottom: 10px;
    }
  }
}
</style>