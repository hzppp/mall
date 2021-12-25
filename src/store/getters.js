export default {
  cartListLength(state){
    return state.cartList.length;
  },
  cartList(state){
    return state.cartList;
  }
}
// getters 方便映射到多个组件中可以直接使用