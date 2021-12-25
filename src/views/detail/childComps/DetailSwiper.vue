<template>
  <div class="detail-swiper">
    <swiper>
      <swiper-item class="swiper-item" v-for="item in topImages" :key="item.id">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name : 'DetailSwiper',
  components : {
    Swiper,
    SwiperItem
  },
  data(){
    return{
      
    }
  },
  props : {
    topImages : {
      type : Array,
      default : []
    }
  }
}
</script>

<style scoped>
.swiper-item{
  height: 300px;

}
.swiper-item img{
  width: 100%;
  /* height: 100%; */
}
</style>