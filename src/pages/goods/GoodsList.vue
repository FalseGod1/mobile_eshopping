<template>
  <van-pull-refresh v-model:refreshing="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finish-text="没有更多了"
      @load="onLoad"
      class="goods-list"
    >
      <van-card
        v-for="item in goodsList"
        :key="item.id"
        :num="item.num"
        :tag="categoryName"
        :price="item.price"
        :desc="item.sell_point"
        :title="item.name"
        class="goods-item"
        @click="onGoodsInfo(item.id)"
      >
        <template #thumb>
          <img :src="item.image" class="goods-item-img" />
        </template>

        <!-- 添加到购物车按钮 -->
        <van-button type="primary" @click="addToCart(item)">加入购物车</van-button>
      </van-card>
    </van-list>
  </van-pull-refresh>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getGoodsList } from '@/api/index';
import { Notify } from 'vant'; // 正确导入 Notify 组件
import { computed } from 'vue';
import CartBall from '@/pages/goods/CartBall.vue'; // 导入购物车小球动画组件

const route = useRoute();
const categoryName = computed(() => route.params.category_name);
const router = useRouter();
const finished = ref(false);
const loading = ref(false);
const refreshing = ref(false);
const lastId = ref(0);
const goodsList = ref([]);

// 定义点击商品信息的方法
const onGoodsInfo = (id) => {
  router.push({ name: 'goodsinfo', params: { id } });
};

const onLoad = async () => {
  loading.value = true;
  try {
    const data = {
      category_id: route.params.category_id,
      last_id: lastId.value,
    };
    const res = await getGoodsList(data);
    loading.value = false;
    refreshing.value = false;

    if (res.data.length > 0) {
      goodsList.value = goodsList.value.concat(res.data);
      lastId.value = goodsList.value[goodsList.value.length - 1].id;
    } else {
      if (goodsList.value.length === 0) {
        Notify({ type: 'danger', message: '此分类无商品！' }); // 使用正确的 Notify 方法调用
        router.go(-1); // 返回上一个页面
      }
      finished.value = true;
    }
  } catch (error) {
    loading.value = false;
    refreshing.value = false;
    console.error('Error loading goods list:', error);
    Notify({ type: 'danger', message: '加载商品列表失败' }); // 使用正确的 Notify 方法调用
  }
};

const onRefresh = () => {
  finished.value = false;
  lastId.value = 0;
  goodsList.value = [];
  onLoad();
};

onMounted(() => {
  onLoad();
});

// 添加到购物车方法
const addToCart = (item) => {
  // 假设这里调用加入购物车的逻辑
  // 添加购物车成功后调用购物车小球动画
  CartBall.playAnimation();
};
</script>

<style scoped>
.goods-list {
  margin-bottom: 56px; /* 调整下边距 */
}
.goods-item {
  --van-card-thumb-size: 175px; /* 调整商品卡片缩略图大小 */
  --van-card-price-color: red; /* 商品价格颜色 */
}
.goods-item-img {
  height: 175px; /* 商品图片高度 */
  width: auto; /* 自适应宽度 */
}
</style>