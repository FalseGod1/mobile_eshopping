<template>
  <div>
    <div>eshop</div> 
    <van-button type="success">aaa</van-button>
  </div>
</template>

<script setup>
import { login } from "@/api/login";
import { onMounted } from 'vue';
onMounted(async()=>{
  const data = {username : '2206040107',password: '123456'}
  const res = await login(data)
  console.log(res);
})
</script>

<style lang="scss" scoped>

</style>