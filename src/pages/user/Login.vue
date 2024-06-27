<template>
  <div>
      <van-cell-group inset>
          <van-field
          v-model="username"
          name="用户名"
          lable="用户名"
          placeholder="用户名"
          :rules="[{required:true,message:'请填写用户名'}]"
          />
          <van-field
          v-model="password"
          type="password"
          name="密码"
          lable="密码"
          placeholder="密码"
          :rules="[{required:true,message:'请填写密码'}]"
          />
      </van-cell-group>
      <div style="margin: 16px">
          <van-button block type="success" @click="checkLogin">登录
          </van-button>
          <div class="link-area">
              <a @click="register">还没有账号?前往注册</a>
          </div>
      </div>
  </div>
</template>

<script setup>
//导入login接口
import {login} from '../../api/login.js'
import {ref} from 'vue'
//导入cookie
import Cookies from 'js-cookie'
import {showNotify} from 'vant'
import {useRouter} from 'vue-router'
let username=ref()
let password=ref()
const router = useRouter()
const checkLogin=async()=>{
  //组装登录数据
  const data={
      username: username.value,
      password: password.value
  }
  //向服务器发送登录请求
  const res=await login(data)
  console.log(res.data)
  if(res.code>0){
      //登录成功 保存到cookie中
      Cookies.set('Token',res.data.session_id,{SameSite:'dev'})
      Cookies.set('username',res.data.username)
      Cookies.set('userid',res.data.id)
      showNotify({
          message:'登录成功',
          type:'success'
      })
      //跳转到用户组件
      router.push('/user')
  }
}
const register = () => {
  router.push('/register')
}
</script>

<style lang="scss" scoped>
.link-area {
  margin-top: 15px;
  margin-right: 15px;
  text-align: right;
  font-size: smaller;
  color: #228dff;
  cursor:pointer;
}
</style>