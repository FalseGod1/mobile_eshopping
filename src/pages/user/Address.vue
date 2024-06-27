<template>
  <div>
    <!-- 地址列表 -->
    <div v-for="address in addressList" :key="address.id">
      {{ address.name }} - {{ address.phone }} - {{ address.detail }}
      <button @click="removeAddress(address.id)">删除</button>
    </div>
    <button @click="addNewAddress">添加新地址</button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAddressStore } from '@/stores';

const addressStore = useAddressStore();
const addressList = computed(() => addressStore.addresses);

const addNewAddress = () => {
  const newAddress = {
    id: Date.now(),
    name: '新地址',
    phone: '1234567890',
    detail: '详细地址'
  };
  addressStore.addAddress(newAddress);
};

const removeAddress = (id) => {
  addressStore.removeAddress(id);
};
</script>
  
  <style scoped lang="scss">
  .address-container {
    background: #eee;
    overflow: hidden;
    .mod_btn {
      font-size: 16px;
      line-height: 46px;
      height: 46px;
      text-align: center;
      background: #3884ff;
      flex: 1;
      display: block;
      color: #fff;
    }
    .mod_btns .fixed {
      display: flex;
      overflow: hidden;
    }
  }
  </style>