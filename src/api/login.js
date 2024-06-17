import request from '@/utils/axios'

export function login(data){
    return request({
        url:'/login',
        method:'post',
        data:data
    })
}

export default{
    login
}