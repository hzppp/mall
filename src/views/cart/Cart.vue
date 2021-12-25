<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">
        购物车({{cartListLength}})
      </div>
    </nav-bar>
    <!-- 选中商品展示 -->
    <cart-list/>
    <!-- 底部 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
import CartList from "./childComps/CartList.vue"
import CartBottomBar from './childComps/CartBottomBar.vue'

import { mapGetters } from 'vuex'

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed : {
    ...mapGetters([
      'cartListLength',
    ])
  }
};
</script>

<style scoped>
.cart{
  height: calc(100vh - 48px);
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>