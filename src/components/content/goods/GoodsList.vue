<template>
  <div class="goods">
    <goods-list-item class="goods-item" v-for="item in goods" :goodsItem="item" :key="item.id"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'

export default {
  name : "GoodsList",
  components : {
    GoodsListItem,
  },
  props : {
    goods : {
      type : Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.goods-item{
  width: 48%;
}
</style>