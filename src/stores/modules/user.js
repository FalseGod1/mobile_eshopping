// src/stores/modules/user.js
import { defineStore } from 'pinia';

// Initial state
const state = {
  userData: null,
  isLoggedIn: false
};

// Define your store
export const useUserStore = defineStore({
  id: 'user',
  state: () => state,
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    userData: (state) => state.userData
    // Add more getters as needed
  },
  actions: {
    login(user) {
      state.userData = user;
      state.isLoggedIn = true;
    },
    logout() {
      state.userData = null;
      state.isLoggedIn = false;
    }
    // Add more actions as needed
  }
});
