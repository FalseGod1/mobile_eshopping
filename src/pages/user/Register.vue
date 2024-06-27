<template>
    <div>
    <van-cell-group inset>
    <van-field required v-model="username" name="⽤户名" label="账
    号" placeholder="请输⼊账号" />
    <van-field
    required
    v-model="password"
    type="password"
    name="密码"
    label="密码"
    placeholder="密码"
    />
    <van-field
    required
    v-model="repassword"
    type="password"
    name="确认密码"
    label="确认密码"
    placeholder="密码"
    />
    <van-field required v-model="email" name="邮箱" label="邮箱"
    placeholder="请输⼊邮箱" />
    </van-cell-group>
    <div style="margin: 16px">
        <van-button block type="primary" @click="checkRegister"> 注册
        </van-button>
    <div class="link-area"><a @click="login">已有账号？前往登录</a>
    </div>
    </div>
    </div>
</template>
<script setup>
import { register } from '@/api/login'
import { ref } from 'vue'
import { showNotify, showToast } from 'vant'
import { useRouter } from 'vue-router'
let username = ref('')
let password = ref('')
let repassword = ref('')
let email = ref('')
const router = useRouter()
//检查⽤户的输⼊
const checkInput = () => {
console.log(email.value)
if (username.value == '') {
    showToast({
    message: '账号不能为空'
 })
    return false
}
if (password.value == '') {
    showToast({
    message: '密码不能为空'
 })
    return false
 }
if (password.value != repassword.value) {
    showToast({
    message: '两次密码不⼀致'
 })
    return false
 }
if (email.value == '') {
    showToast({
    message: '邮箱不能为空'
 })
    return false
 }
    return true
}
const checkRegister = async () => {
    if (checkInput()) {
        const data = {
            username: username.value,
            password: password.value,
            email: email.value
    }
        console.log(data)
        const res = await register(data)
        console.log(res)
    if (res.code > 0) {
        showToast({
        message: '注册成功',
        type: 'success'
    })
        router.push('/user')
    }
}
}
const login = () => {
    router.push('/login')
}
</script>
<style lang="scss" scoped>
.link-area {
    margin-top: 15px;
    margin-right: 15px;
    text-align: right;
    font-size: smaller;
    color: #228dff;
    cursor: pointer;
}
</style>