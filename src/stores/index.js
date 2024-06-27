// src/stores/index.js
import { createPinia } from 'pinia';
import { useUserStore } from './modules/user';
import { useShopcartStore } from './modules/shopcart';
import { useAddressStore } from './modules/address';

const pinia = createPinia();

export { useUserStore, useShopcartStore, useAddressStore };

export default pinia;