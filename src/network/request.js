import axios from 'axios'

// 正确用法 只传入一个config config里面包含
export function request(config) {

  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/hy66",
    timeout: 5000
  })

  // axios拦截器
  instance.interceptors.request.use(config => {
    // console.log(config)
    return config
  },err => {
    console.log(err)
  })

  // 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res)
    return res.data
  },err => {
    console.log(err)
  })

  return instance(config)

}




// 封装  传入config(配置)  success(请求成功的时候回调)  failure(请求失败的时候回调)
// export function request(config, success, failure) {
//   // 1.创建axios实例 使用axios.create

//   const instance = axios.create({
//     // 基本配置
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })

//   // 发送真正的网络请求
//   instance(config)
//     .then(res => {
//       success(res)
//     })
//     .catch(err => {
//       failure(err)
//     })
// }