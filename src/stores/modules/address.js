// src/stores/modules/address.js
import { defineStore } from 'pinia';

export const useAddressStore = defineStore('address', {
  state: () => ({
    addresses: []
  }),
  getters: {
    addressCount: (state) => state.addresses.length,
  },
  actions: {
    addAddress(address) {
      this.addresses.push(address);
    },
    removeAddress(id) {
      this.addresses = this.addresses.filter(address => address.id !== id);
    },
  }
});
