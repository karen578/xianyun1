<template>
  <div class="header">
    <el-row type="flex" justify="space-around" class="main">
      <div class="logo">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
      </div>
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <div class="login" style="display:none">
        <nuxt-link to="#">登录 / 注册</nuxt-link>
      </div>
    <el-row type="flex" class="goods">
        <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
        <el-dropdown>
          <span class="el-dropdown-link">
            银行抽水机
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
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
  border: 1px solid #eee;
  //   设置阴影
  box-shadow: 0 3px 0 #eee;
  .main {
    width: 1000px;
    //需要页面居中显示
    margin: 0 auto;
  }
  .logo {
    img {
      display: block;
      width: 156px;
      height: 42px;
      margin-top: 9px;
      margin-right: 20px;
    }
  }
  .navs {
    flex: 1;
    padding-right: 20px;
    a {
      //因为要给a标签设置内边距，而且让a标签靠右
      display: block;
      padding: 0 25px;
      //因为给盒子叫了边框所以就要设置内减模式
      box-sizing: border-box;
      &:hover {
        color: #409eff;
        border-bottom: 5px solid #409eff;
      }
    }
    //scoped可以自动管理局部样式，但element-ul里面的nuxt-link-exact-active是点击a标签自动加上的样式 不属于scoped，所以需要加上/deep/
    /deep/.nuxt-link-exact-active {
      //因为上面设置了hover的时候字体变成蓝色，需要需要进行重新覆盖
      &:hover {
        color: #fff;
      }
      color: #fff;
      background-color: #409eff;
    }
  }
  .login {
    a {
      &:hover {
        color: #409eff;
      }
    }
  }
  .goods{
    img{
      width: 36px;
      height: 36px;
      border-radius: 50%;
      vertical-align: middle;
      margin-top: 10px;
      margin-right: 10px;
      box-sizing: border-box;
      &:hover{
        border: 2px solid #409eff;
      }
    }
  }
}
</style>


