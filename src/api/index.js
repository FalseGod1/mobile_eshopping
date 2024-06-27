import request from '@/utils/axios';

export function getImgs() {
  return request({
    url: '/imglist',
    method: 'get'
  });
}

export function getGoodsList(params) {
  return request({
    url: '/goodslist',
    method: 'get',
    params
  });
}

export function category() {
  return request({
    url: '/category',
    method: 'get'
  });
}

export function detail(params) {
  return request({
    url: '/goodsinfo',
    method: 'get',
    params
  });
}

export function getGoodsInfo(data) {
  return request({
  url: '/goodsinfo',
  method: 'get',
  params: data
    })
  }

// Exporting all functions as an object
export default {
  getImgs,
  getGoodsList,
  category,
  getGoodsInfo,
  detail
};