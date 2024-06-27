<template>
    <van-swipe
    :autoplay="3000" 
    indicator-color="white"
    >
    <van-swipe-item 
    v-for="(img, index) in props.imgList" :key="index"
    >
    <img :src="img.img" class="swipe-img" />
    </van-swipe-item>
    </van-swipe>
</template>
<script setup>
//使⽤defineProps来获取props属性，defineProps不需要额外的引⼊，直接使⽤
//defineProps有两种使⽤⽅式，⼀种是数组，把⽗组件传递的值放到⼀个数组中，另外⼀
//种⽅式是对象，把⽗组件传递的值以对象⽅式书写，指明对象的类型。
// const props = defineProps(['imgList'])
const props = defineProps({
    imgList: {
        type: Array,
        required: true
    }
})
</script>
<style lang="scss" scoped>
.swipe-img {
    width: 100%;
    height: auto;
}
</style>
    