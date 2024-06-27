import { createApp } from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import App from './App.vue';
import router from './router';
import pinia from './stores';

const app = createApp(App);

// 使用 Pinia for state management
app.use(pinia);

// 使用 Vue Router for routing
app.use(router);

// 使用 Vant for UI components
app.use(Vant);

// 挂载应用
app.mount('#app');