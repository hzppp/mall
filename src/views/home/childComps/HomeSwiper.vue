<template>
  <Swiper>
      <swiper-item v-for="item in banners" :key="item.id">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="swiperImageLoad">
        </a>
      </swiper-item>
    </Swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name : "HomeSwiper",
  components : {
    Swiper,
    SwiperItem
  },
  props : {
    banners : {
      type : Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      isLoad : false,
    }
  },
  methods : {
    swiperImageLoad(){
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>

</style>