<template>
    <div>
    <van-grid column-num="3" gutter="5">
        <van-grid-item
        v-for="(menu, index) in props.menus"
        :key="index"
        style="width: 25%; height: auto"
    >
        <div
        class="icon"
        ref=""
        :style="{ backgroundPosition: menu.pos[0] / 3 + 'px ' + 
        menu.pos[1] / 3 + 'px' }"
        >
        </div>
        <span>{{ menu.name }}</span>
        </van-grid-item>
    </van-grid>
    </div>
</template>
<script setup>
    const props = defineProps(['menus'])
</script>
<style lang="scss" scoped>
    .icon {
    background-image: url('../components/images/icon.png'); /* 雪碧图的路径 */
    background-repeat: no-repeat;
    display: inline-block;
    width: 70px; /* 缩放后的图标宽度 */
    height: 70px; /* 缩放后的图标⾼度 */
    background-size: 333px 1000px; /* 雪碧图的新尺⼨ */
    }
</style>