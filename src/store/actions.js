import { ADD_CART_LIST, ADD_COUNTER } from './mutations-type'
export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      const cl = context.state.cartList;
      for (var i = 0; i < cl.length; i++) {
        if (payload.iid === cl[i].iid) break;
      }
      if (i === cl.length) {//购物车列表里面没有该商品
        // cl.push(payload);//加入
        context.commit(ADD_CART_LIST, payload)
        resolve('添加了新的商品')
      } else {
        // cl[i].count++;//已经存在的该商品加一
        context.commit(ADD_COUNTER, cl[i]);
        resolve('当前商品数量+1')
      }
    })
  }
}