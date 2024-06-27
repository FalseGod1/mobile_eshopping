<template>
  <div class="shopcar-container">
    <van-checkbox v-model:checked="selectAll" @change="handleSelectAll">全选</van-checkbox>
    <van-list v-if="goodslist.length > 0">
      <van-cell v-for="(item, index) in goodslist" :key="item.id">
        <template #icon>
          <van-checkbox v-model="item.selected"></van-checkbox>
        </template>
        <img :src="`http://1.94.14.36/static/uploads/${item.image}`" class="item-image" />        <div class="item-info">
          <h3 class="item-name">{{ item.name }}</h3>
          <div class="item-price">¥{{ item.price }}</div>
          <div class="item-actions">
            <van-stepper v-model="item.count" :min="1" :max="item.num" @change="countChange(item)" />
            <a href="#" class="delete-link" @click.prevent="deleteItem(item.id)">删除</a>
          </div>
        </div>
      </van-cell>
    </van-list>
    <div v-else class="no-items">购物车为空</div>

    <!-- 结算按钮 -->
    <van-button type="primary" @click="checkout" class="checkout-btn">结算</van-button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useShopcartStore } from '@/stores'; // 确保路径正确
import { showNotify } from 'vant'; // 引入 showNotify

const shopcartStore = useShopcartStore();
const goodslist = computed(() => shopcartStore.cart);

const selectAll = computed({
  get: () => goodslist.value.length > 0 && goodslist.value.every(item => item.selected),
  set: (value) => {
    goodslist.value.forEach(item => item.selected = value);
  }
});

const handleSelectAll = (checked) => {
  goodslist.value.forEach(item => item.selected = checked);
};

const countChange = (item) => {
  shopcartStore.updateGoodsInfo(item);
};

const deleteItem = async (id) => {
  try {
    await shopcartStore.removeCar(id);
    showNotify({ type: 'success', message: '删除成功' });
  } catch (error) {
    showNotify({ type: 'danger', message: '删除失败，请稍后重试' });
  }
};

const checkout = () => {
  const selectedItems = goodslist.value.filter(item => item.selected);
  if (selectedItems.length === 0) {
    showNotify({ type: 'warning', message: '请选择要结算的商品' });
    return;
  }
  showNotify({ type: 'success', message: '跳转到订单确认页面' });
};
</script>

<style scoped>
.shopcar-container {
  background: #eee;
  padding: 10px;
}

.item-image {
  width: 80px;
  height: 80px;
  margin-right: 10px;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
}

.item-price {
  font-size: 16px;
  color: red;
}

.item-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.delete-link {
  color: #999;
  cursor: pointer;
}

.no-items {
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #999;
}

.checkout-btn {
  margin-top: 10px;
  width: 100%;
}
</style>