import request from '@/utils/axios'

//1.用户登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}

//2.用户注册
export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data: data
  })
}

//3.获取用户信息
export function getUserInfo() {
  return request({
    url: '/user',
    method: 'get'
  })
}

export function logout() {
  return request({  
      url: '/logout',  
      method: 'get',  
  })  
}  

export function getImgs() {
  return request({
    url: '/imglist',
    method: 'get'
  });
}

export default {
  login,
  register,
  getUserInfo,
  logout,
  getImgs,
}
