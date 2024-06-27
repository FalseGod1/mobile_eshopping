<template>
  <div class="goods-info">
    <!-- 商品图片轮播 -->
    <van-swipe v-if="goodsinfo.album && goodsinfo.album.length">
      <van-swipe-item v-for="(item, index) in goodsinfo.album" :key="index">
        <img :src="item.img" style="width: 100vw; height: auto" />
      </van-swipe-item>
    </van-swipe>

    <!-- 商品信息列表 -->
    <van-list>
      <!-- 商品名称 -->
      <van-cell>
        <template #title>
          <b>{{ goodsinfo.name }}</b>
        </template>
      </van-cell>
      <!-- 商品价格 -->
      <van-cell>
        <template #title>
          <div class="price">
            <b>定价：</b><span>¥{{ goodsinfo.price }}</span>
          </div>
        </template>
      </van-cell>
      <!-- 商品卖点 -->
      <van-cell>
        <template #title>
          <b>商品卖点：</b>{{ goodsinfo.sell_point }}
        </template>
      </van-cell>
      <!-- 商品库存 -->
      <van-cell>
        <template #title>
          <b>库存情况：</b>{{ goodsinfo.num }}件
        </template>
      </van-cell>
      <!-- 购买数量选择 -->
      <van-cell>
        <template #title>
          <b style="margin-right: 20px">购买数量:</b>
          <van-stepper v-model="goodsNum" :min="1" :max="goodsinfo.num"></van-stepper>
        </template>
      </van-cell>
      <!-- 加入购物车和立即购买按钮 -->
      <van-cell>
        <template #title>
          <div v-if="goodsinfo.num">
            <van-button type="primary" size="small" @click="buyNow">立即购买</van-button>
            <van-button type="danger" size="small" @click="addCart">加入购物车</van-button>
          </div>
          <div v-else>该商品暂时无货</div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { showNotify } from 'vant'; // 引入 showNotify
import { getGoodsInfo } from '@/api/index.js';
import { useShopcartStore } from '@/stores';
import Cookies from 'js-cookie';

const route = useRoute();
const router = useRouter();
const shopcartStore = useShopcartStore();
const goodsinfo = ref({});
const goodsNum = ref(1);

const fetchGoodsDetail = async () => {
  try {
    const id = route.params.id;
    const res = await getGoodsInfo({ id });
    if (res && res.data) {
      goodsinfo.value = res.data;
    } else {
      showNotify({ type: 'danger', message: '商品信息获取失败，请稍后重试' });
    }
  } catch (error) {
    console.error('Error fetching goods detail:', error);
    showNotify({ type: 'danger', message: '商品信息获取失败，请稍后重试' });
  }
};

const addCart = () => {
  if (!isLoggedIn()) {
    return;
  }
  if (goodsNum.value <= 0) {
    showNotify({ type: 'danger', message: '数量不能为零' });
    return;
  }
  const newItem = { ...goodsinfo.value, count: goodsNum.value, selected: true };
  shopcartStore.addToCart(newItem);
  showNotify({ type: 'success', message: `${goodsinfo.value.name} 已添加到购物车` });
};

const buyNow = () => {
  // 实现立即购买功能
};

const isLoggedIn = () => {
  if (!Cookies.get('Token')) {
    showNotify({ message: '你还没有登录，请先登录', type: 'danger' });
    router.push('/login');
    return false;
  }
  return true;
};

onMounted(fetchGoodsDetail);

</script>

<style lang="scss" scoped>
.price {
  span {
    color: red;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>