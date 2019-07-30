<template>
  <header>
    <el-row type="flex" class="main" justify="space-between">
      <div class="logo">
        <h1>闲云旅游</h1>
      </div>
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <div class="login" v-if="false">
        <nuxt-link>登录 / 注册</nuxt-link>
      </div>
      <div class="self">
        <el-row type="flex" justify="space-between">
          <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
          <el-dropdown>
            <span class="el-dropdown-link">
              银河拖拉机
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </div>
    </el-row>
  </header>
</template>
.<script>
export default {};
</script>
<style lang="less" scoped>
header {
  .main {
    width: 1000px;
    margin: 0 auto;
    height: 60px;
    line-height: 60px;
    //设置阴影
    box-shadow:0 3px 0#f5f5f5;
    .logo {
      width: 180px;
      height: 42px;
      margin-top: 9px;
      background: url("http://157.122.54.189:9093/images/logo.jpg") no-repeat
        center center;
      background-size: 156px 42px;
      margin-right: 10px;
      h1 {
        font-size: 0;
      }
    }
    .navs {
        flex: 1;
      a {
        padding: 0 25px;
        padding-bottom: 25px;
        display: block;
        box-sizing: border-box;
        &:hover {
          color: #409eff;
          border-bottom: 5px solid #409eff;
        }
      }
      .nuxt-link-exact-active{
         &:hover {
          color: #fff;
        } 
          color: #fff;
          background-color:#409eff; 
      }
    }
    .self{
        img{
            width: 36px;
            height: 36px;
            border-radius: 50%;
            vertical-align: middle;
            margin-top: 10px;
            margin-right: 10px;
            &:hover{
                border: 2px solid  #409eff;
            }
        }
    }
  }
}
</style>


