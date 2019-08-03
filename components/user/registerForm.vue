<template>
  <div class="registerform">
    <el-form :model="registerform" :rules="rules" ref="registerform" class="formsrow">
      <el-form-item prop="username">
        <el-input v-model="registerform.username" placeholder="用户名手机"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-row type="flex" class="row-bg">
          <el-input v-model="registerform.captcha" style="width:310px" placeholder="验证码"></el-input>
          <span @click="giveCaptcha">发送验证码</span>
        </el-row>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input v-model="registerform.nickname" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="registerform.password" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="checkPassword">
        <el-input v-model="registerform.checkPassword" placeholder="确认密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%" @click="submitClick">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerform.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      registerform: {
        username: "",
        password: "",
        captcha: "",
        nickname: "",
        checkPassword: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPassword: [{ required: true, message: "请输入确认密码", trigger: "blur" },
       { validator: validatePass2, trigger: 'blur' } ],
      }
    };
  },
  methods:{
    //发送验证码
    giveCaptcha(){
      console.log(123);
      if(!this.registerform.username){
        this.$message.warning("用户名不能为空")
        return
      }
      this.$axios({
        url:'/captchas',
        method:'POST',
        data:{tel:this.registerform.username}
      }).then(res=>{
        console.log(res);
        this.$message.success("验证码发送成功")
      })
    },
    submitClick(){
      const{checkPassword,...prop}=this.registerform
      this.$refs.registerform.validate(valid=>{
        if(valid){
          this.$axios({
            url:'/accounts/register',
            method:'POST',
            data:prop
          }).then(res=>{
            console.log(res);
            this.$message.success("注册成功")
            this.$store.commit("user/setUserInfo",res.data)
            this.$router.push("/")
          })
        }
      })
    }


  }
};
</script>
<style lang="less" scoped>
/deep/.registerform {
  height: 350px;
  background-color: #fff;
}
/deep/.formsrow {
  text-align: center;
  padding: 20px;
  span{
      width: 70px;
      display: block;
      padding:0 20px;
      background-color: #f5f7fa;
      margin-left: -2px;
      
  }
}
</style>

