<!-- 登录 -->
<template>
<div class='content'>
  <div class="logo">
    登录账户
  </div>
  <Form @submit="onSubmit">
    <Field
      v-model="form.username"
      name="用户名"
      label="用户名"
      placeholder="请填写用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <Field
      v-model="form.password"
      type="password"
      name="密码"
      label="密码"
      placeholder="请填写密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px;">
      <Button round block type="info" native-type="submit">登录</Button>
    </div>
  </Form>
</div>
</template>

<script>
import { loginApi } from "../../src/Api/login"
import { Button, Form, Field } from 'vant';
import { setToken } from '@/utils/auth';
export default {
  components: {
    Button,
    Form,
    Field,
  },
  data() {
    return {
      form : {
        username: "",
        password: ""
      }
    }
  },
  created() {
    
  },
  mounted() {
  },
  methods: {
    onSubmit(){
      // this.$router.push("/");
      console.log("提交！！");
      loginApi(this.form).then( res =>{
        console.log("res", res);
        if(res.code == 200){
          setToken(res.token);
          this.$router.push("/");
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .content{
    width: 100%;
    height: 100%;
    .logo{
      font-size: 26px;
      padding: 20px;
      margin: 40px 0 ;
    }
  }
</style>