<template>
  <div>
    <el-form ref="loginForm"
             :rules="rules"
             :model="login"
             class="loginContainer">
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item label=""
                    prop="username">
        <el-input v-model="login.username"
                  auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label=""
                    prop="password">
        <el-input v-model="login.password"
                  auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="loginRemember">
        <el-checkbox v-model="checked"></el-checkbox>
      </el-form-item>
      <el-button type="primary"
                 style="width:100%"
                 @click="submitLogin">登录</el-button>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      login: {
        username: 'admin',
        password: '123',
      },
      checked: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
   
  methods: {
   
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // alert('submit!');
          this.keyValueRequest('/doLogin',this.login).then(resp=>{
            if(resp){
              // alert(JSON.stringify(resp.data.obj))
              window.sessionStorage.setItem('user',JSON.stringify(resp.data.obj));
             this.$router.replace('/home');
            }
          })
  
        } else {
          this.$message.error('请输入正确信息')
          return false
        }
      })
    },
  },
}
</script>

<style>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.loginTitle {
  margin: 15px auto 20px auto;
  text-align: center;
  color: #505458;
}
.loginRemember {
  text-align: left;
  margin: 0px 0px 5px 0px;
}
</style>