<template>
  <div class="detail">
    <detail-nav-bar class="nav-bar" @navBarClick="navBarClick" ref="navBar"/>
    <scroll class="content" ref="scroll" @scroll="scroll" :probe-type="3">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info ref="params" :paramInfo="paramInfo"/>
      <detail-comment-info ref="commonet" :commentInfo="commentInfo"/>
      <goods-list ref="recommend" :goods="recommendList"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show='isShowBackTop'/>
    <toast :message="message" :isShow="isShow"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
import DetailParamInfo from "./childComps/DetailParamInfo.vue"
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"
import DetailBottomBar from "./childComps/DetaiBottomBar.vue"
import GoodsList from "components/content/goods/GoodsList.vue"

import Scroll from "components/common/scroll/Scroll.vue";

import { getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail.js";
import {itemListenerMixin, backTopMixin} from '../../common/mixin'

import Toast from "components/common/toast/Toast" 

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Toast
  },
  mixins : [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [], //顶部轮播图资源
      goods: {},
      shop: {},
      detailInfo : {},
      paramInfo : {},
      commentInfo : {},
      recommendList : [],
      itemListener : null,
      channelPositions : [],
      message : '',
      isShow : false,
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求对应的数据
    getDetail(this.iid).then((res) => {
      const obj = res.result;
      // console.log(obj);
      this.topImages = obj.itemInfo.topImages;
      this.goods = new Goods(obj.itemInfo, obj.columns, obj.shopInfo.services);
      this.shop = new Shop(obj.shopInfo);
      this.detailInfo = obj.detailInfo;
      this.paramInfo = new GoodsParam(obj.itemParams.info, obj.itemParams.rule);
      if(obj.rate.cRate !== 0){
        this.commentInfo = obj.rate.list[0]
      }
    });

    getRecommend().then((res)=>{
      this.recommendList = res.data.list;
    })
  },
  methods : {
    imgLoad(){
      this.$refs.scroll.refresh();
      
      this.channelPositions = [],
      this.channelPositions.push(0);
      this.channelPositions.push(this.$refs.params.$el.offsetTop);
      this.channelPositions.push(this.$refs.commonet.$el.offsetTop);
      this.channelPositions.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.channelPositions)
    },
    navBarClick(index){
      this.$refs.scroll.scrollTo(0,-this.channelPositions[index],500);
    },
    scroll(position){
      // console.log(position)
      const nav = this.$refs.navBar;
      for(let i = 0; i < this.channelPositions.length; i++){
        if(position.y <= -this.channelPositions[i]){
          nav.currentIndex = i;
          // console.log( nav.currentIndex)
        }
      }
      this.isShowBackTop = position.y < -1000;
    },
    addToCart(){
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.nowPrice
      product.iid = this.iid;
      product.count = 1;

      // 2.将商品添加到购物车（vuex里面）
      // this.$store.cartList.push(product); 但是不要这么做 得通过mutations
      this.$store.dispatch('addCart',product).then(res => {
      //   this.message = res;
      //   this.isShow = true;

      //   setTimeout(() => {
      //     this.isShow = false;
      //   }, 1500);
        this.$toast.show(res, 1500);  
      })
    }
  },
  mounted(){
  },
  updated(){

  },
  destroyed(){
    this.$bus.$off('itemImageLoad',this.itemListener);//取消监听
  }
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 11;
  background-color: #fff;
  height: 100vh;
}

.content{
  position: absolute;
  z-index: 10;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 58px;
}

.nav-bar{
  position: relative;
  z-index: 11;
  background-color: #fff;
}


</style>