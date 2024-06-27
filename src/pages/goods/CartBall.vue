<template>
  <div class="cart-ball"></div>
</template>

<script setup>
import gsap from 'gsap'; // 导入 GSAP 动画库

const playAnimation = () => {
  const tl = gsap.timeline();
  tl.to('.cart-ball', {
    duration: 0.5,
    ease: 'power2.out',
    scale: 1.5,
    opacity: 0,
    onComplete: () => {
      // 动画完成后的操作，例如触发加入购物车的逻辑
      console.log('Cart ball animation complete');
    }
  });
};
</script>

<style scoped>
.cart-ball {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  background-color: red; /* 小球的颜色和样式可以根据需求自定义 */
  border-radius: 50%;
  z-index: 9999;
}
</style>