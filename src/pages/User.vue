<template>
  <div>
    <div v-if="!isLogin" class="member">
      <div class="header-con">
        <div class="user-info">
          <!-- 用户信息 -->
          <div class="avatar-con">
            <div class="avatar">
              <img src="/images/my.png" class="image-info" />
            </div>
          </div>
          <div class="person-con">
            <span>
              <router-link to="/login" class="mui-navigate-right" style="color: white">登录</router-link>
              /
              <router-link to="/register" class="mui-navigate-right" style="color: white">注册</router-link>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isLogin" class="member">
      <div class="header-con">
        <div class="user-info">
          <!-- 用户信息 -->
          <div class="avatar-con">
            <div class="avatar">
              <img src="/images/my.png" class="image-info"/>
            </div>
          </div>
          <div class="person-con">
            <span>{{ username }}</span>
          </div>
        </div>
      </div>
      <div>
        <van-cell
          is-link
          style="--van-cell-line-height: 48px"
          v-for="(menu, index) in userMenu"
          :key="index"
          :to="menu.path"
          @click="handle(menu)"
        >
          <template #title>
            <span class="custom-title">{{ menu.name }}</span>
          </template>
          <template #icon>
            <van-image width="48px" height="48px" :src="menu.img"></van-image>
          </template>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Cookies from 'js-cookie';
import { logout } from '../api/login.js';
import { Notify } from 'vant'; // 确保正确导入 Notify

let isLogin = ref(false);
let username = ref('');
let userMenu = ref([
  { name: '我的订单', img: '/images/my.png', path: '/home' },
  { name: '收获地址', img: '/images/my.png', path: '/user/address' }, // 更新收获地址的 path
  { name: '退出登录', img: '/images/my.png', path: '' }
]);

username.value = Cookies.get('username');
if (username.value) {
  isLogin.value = true;
}

const handle = async (menu) => {
  if (menu.path === '') {
    await logout();
    Cookies.remove('username');
    Cookies.remove('userid');
    Cookies.remove('token');
    isLogin.value = false;
    Notify({
      message: '退出登录成功',
      type: 'success'
    });
  }
};
</script>

<style lang="scss" scoped>
.member {
  margin-bottom: 15px;
  .header-con {
    padding: 10px;
    background-color: #fff;
    .user-info {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 120px;
      background: linear-gradient(90deg,#28a2ff,#ffd787);
      box-shadow: 0 0.1rem 0.25rem #f8e3c6;
      .avatar-con {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        .avatar {
          width: 60px;
          height: 60px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,15);
          border: 1px solid hsla(0,0%,100%,.4);
          border-radius: 50%;
          .image-info {
            width: 100%;
            height: 100%;
          }
        }
      }
      .person-con {
        transform: translateY(-50%);
        color: #fff;
        position: absolute;
        left: 90px;
        top: 50%;
      }
    }
  }
}
</style>
