<template>
  <div>
    <van-nav-bar 
      v-if="route.meta && route.meta.title"
      :title="route.meta.title" 
      :left-text="!isHomePage ? '返回' : ''" 
      :left-arrow="!isHomePage" 
      :style="navBarStyle"
      @click-left="onClickLeft"
    ></van-nav-bar>
    
    <!-- 直接在 transition 中使用 router-view -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
    
    <tabbar></tabbar>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import tabbar from '@/components/tabbar.vue';
import 'vant/lib/index.css'; // 导入 Vant 样式
import { NavBar } from 'vant'; // 导入 Vant 组件

const route = useRoute();
const router = useRouter();
const isHomePage = computed(() => route.path === '/home');

const onClickLeft = () => history.back();

const navBarStyle = {
  '--van-nav-bar-background': '#228DFF',
  '--van-nav-bar-icon-color': 'white',
  '--van-nav-bar-title-text-color': 'white',
  '--van-nav-bar-text-color': 'white'
};

// Vue Router 的 beforeEach 钩子，用于动态设置路由 meta 信息
router.beforeEach(async (to, from, next) => {
  try {
    console.log('Simulating async login...');
    // 模拟异步登录过程
    // await api.login(username, password);
    
    // 设置路由的 meta 信息
    to.meta.title = '购物商城';
    next(); // 继续路由导航
  } catch (error) {
    console.error('Failed to load route meta:', error);
    next(); // 可以选择继续路由导航或者重定向到错误页面
  }
});
</script>

<style>
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.fade-leave-to {
  position: absolute;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
