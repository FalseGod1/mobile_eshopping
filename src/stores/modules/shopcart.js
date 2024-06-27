// src/stores/modules/shopcart.js
import { defineStore } from 'pinia';

export const useShopcartStore = defineStore('shopcart', {
  state: () => ({
    cart: []
  }),
  getters: {
    cartItemCount: (state) => state.cart.length,
    // 根据需要添加更多的 getters
  },
  actions: {
    addToCart(item) {
      this.cart.push(item);
    },
    removeCar(id) {
      this.cart = this.cart.filter(item => item.id !== id);
    },
    updateGoodsInfo(item) {
      // 实现更新逻辑
    },
    // 根据需要添加更多的 actions
  }
});