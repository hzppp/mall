import { request } from "./request";

export function getHomeMutidata(){
  return request({
    url : '/home/multidata'
  })
}

// 主页需要请求goods货物数据，
// 需要再封装一个带type和page参数的请求
// 用于访问http://152.136.185.210:7878/api/hy66/home/data?type=new&page=1
export function getHomeGoods(type,page){
  return request({
    url : '/home/data',
    params : {
      type,
      page
    }
  })
}