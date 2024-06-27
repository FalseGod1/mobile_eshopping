import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Category from '@/pages/Category.vue'
import Shopcart from '@/pages/Shopcart.vue'
import User from '@/pages/User.vue'
import Login from '@/pages/user/Login.vue'
import Register from '@/pages/user/Register.vue'
import GoodsList from '@/pages/goods/GoodsList.vue'
import GoodsInfo from '@/pages/goods/GoodsInfo.vue'
import Address from '@/pages/user/Address.vue' // 导入收货地址页面组件
import AddressEdit from '@/pages/user/AddressEdit.vue' // 导入编辑收货地址页面组件

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    name: 'home',
    meta: {
      title: '首页'
    }
  },
  {
    path: '/category',
    component: Category,
    name: 'category',
    meta: {
      title: '分类'
    }
  },
  {
    path: '/shopcart',
    component: Shopcart,
    name: 'shopcart',
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/user',
    component: User,
    name: 'user',
    meta: {
      title: '我的'
    },
    children: [
      {
        path: 'address', // 子路由路径
        component: Address,
        name: 'address',
        meta: {
          title: '收货地址'
        }
      },
      {
        path: 'address/add', // 新增收货地址的路径
        component: AddressEdit,
        name: 'address_add',
        meta: {
          title: '新增收货地址'
        }
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: "登录"
    },
    component: Login
  },
  {
    name: 'register',
    path: '/register',
    meta: {
      title: "注册"
    },
    component: Register
  },
  {
    name: 'goodslist',
    path: '/goodslist/:category_id',
    meta: {
      title: "商品列表"
    },
    component: GoodsList
  },
  {
    name: 'goodsinfo',
    path: '/goodsinfo/:id',
    meta: {
      title: "商品详情"
    },
    component: GoodsInfo
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  // 放行
  next();
});

export default router;
