<template>
  <div class="header">
    <el-row type="flex" justify="space-between" class="main">
      <div class="logo">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
      </div>
      <div class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </div>
      <div class="login">
        <nuxt-link to="'/user/login'">登录注册</nuxt-link>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.header {
  height: 60px;
  line-height: 60px;
  .main {
    width: 1500px;
  }
}
</style>


