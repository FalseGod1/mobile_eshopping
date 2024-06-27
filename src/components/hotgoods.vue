<template>
    <div>
        <div>热销商品：</div>
        <van-card v-for="(goods,index) in props.goodsList"
        :key="index"
        tag="热销"
        :title="goods.name"
        :num="goods.num"
        :thumb="goods.image"
        :desc="goods.sell_point">
        </van-card>
    </div>
</template>

<script setup>
const props = defineProps(['goodsList'])
</script>

<style lang="scss" scoped>

</style>