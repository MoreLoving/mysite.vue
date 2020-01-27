import axios from 'axios'
import con from './config'
export function request(config){
    // 创建axios实例
    const instance = new axios.create({
        baseURL:con.baseUrl,
        timeout:5000,
    })
    // 发起请求 axios实例是一个promise 可直接返回
    return instance(config)
    
}