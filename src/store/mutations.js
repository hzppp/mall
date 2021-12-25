import{ADD_CART_LIST,ADD_COUNTER, CHOOSE_ALL} from './mutations-type'
export default {
  // addCart(state, payload){
    //   const cl = state.cartList;
    //   for(var i = 0; i < cl.length; i++){
    //     if(payload.iid === cl[i].iid) break;
    //   }
    //   if(i===cl.length){//购物车列表里面没有该商品
    //     cl.push(payload);//加入
    //   }else{
    //     cl[i].count++;//已经存在的该商品加一
    //   }
    // }
    [ADD_CART_LIST](state,payload){
      payload.checked = true;
      state.cartList.push(payload);
    },
    [ADD_COUNTER](state,payload){
      payload.count++;
    },
    [CHOOSE_ALL](state){
      let array = state.cartList;
      for(let i = 0; i < array.length; i++){
        array[i].checked = true;
      }
    },
    itemChecked(state,payload){
      let obj = state.cartList.find(item => item.iid == payload);
      obj.checked = !obj.checked;
    },
    allIconClick(state){
      let array = state.cartList;
      for(let i = 0; i < array.length; i++){
        array[i].checked = !array[i].checked;
      }
    }
}