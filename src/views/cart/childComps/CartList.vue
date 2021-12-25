<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
     <cart-list-item v-for="item in cartList"
     :key="item.id"
     :itemInfo="item"/>
     <!-- <div>110</div>
     <div>210</div>
     <div>310</div>
     <div>410</div>
     <div>510</div>
     <div>610</div>
     <div>710</div>
     <div>810</div>
     <div>910</div>
     <div>1010</div> -->
    </scroll>
  </div>
</template>

<script>
import CartListItem from './CartListItem.vue'
import Scroll from "components/common/scroll/Scroll";

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated(){
    this.$refs.scroll.refresh();
    // console.log('----')
  }
  // watch : {
  //   cartList : function(){
  //     this.$refs.scroll.refresh();
  //     console.log('----')
  //   }
  // }
};
</script>

<style scoped>
.cart-list{
  height: calc(100% - 44px);
}

.content {
  height: calc(100% - 40px);
  overflow: hidden;
}
</style>