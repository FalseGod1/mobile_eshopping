<template>
  <div>
      <mySwiper :imgList="imgList"></mySwiper>
  </div>
  <div>
      <submenu :menus="menuList"></submenu>
  </div>
  <div>
      <hot-goods :goodsList="goodsList"></hot-goods>
  </div>
</template>
<script setup>
  import { getImgs,getGoodsList } from '@/api/index.js'
  import { onMounted, ref } from 'vue'
  //导⼊swipe组件为mySwipe，不需要注册，直接在template中使⽤，在使⽤中需要传⼊imgList
  import mySwiper from '../components/swipe.vue'
  import submenu from '@/components/submenu.vue'
  import hotGoods from '@/components/hotgoods.vue'
  const imgList = ref()
  onMounted(async () => {
      const res = await getImgs()
      imgList.value = res.data
  })
  const menuList = [
      { name: '新闻资讯', pos: [0, 1] },
      { name: '图片分享', pos: [101, -22] },
      { name: '商品购买', pos: [-96, -327] },
      { name: '留⾔反馈', pos: [-96, -527] },
      { name: '视频专区', pos: [-312, -732] },
      { name: '联系我们', pos: [-312, -527] }
 ]
 const goodsList=ref()
 onMounted(async()=>{
  const res2 =await getGoodsList()
  goodsList.value=res2.data
 })
</script>
<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>