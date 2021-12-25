<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>

    <!-- 巧妙解决tab-control组件的显示问题 -->
    <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        class="tab-control"
        v-show="isTabFix"
        />

    <scroll class="content" 
    ref="scroll" 
    :probe-type="3"
    :pull-up-load="true" 
    @scroll='contentScroll'
    @loadMore='loadMore'
    >
      <!--1.给个ref 方便下面的方法直接获取这个Scroll组件里面的属性 2.传参 3 代表监听滚动位置 3.监听子组件的scroll时间 接收返回的position-->
      <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad' />
      <recommend-view :recommends="recommend" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
        />
      <goods-list :goods="showGoods" />
    </scroll>
    
    <back-top @click.native="backClick" v-show='isShowBackTop'/> <!--组件是不能直接监听点击的 需要使用click.native-->

  </div>
</template>

<script>
import NavBar from "../../components/common/navBar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import {itemListenerMixin, backTopMixin} from '../../common/mixin';
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import { getHomeMutidata, getHomeGoods } from "network/home";

export default {
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    Scroll,
  },
  mixins : [itemListenerMixin,backTopMixin],
  data() {
    return {
      banners: [],
      recommend: [],
      goods: {
        // 请求首页数据
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      offsetTop : 0,
      isTabFix : false,
      saveY : 0,
      itemListener : null,
    };
  },
  destroyed(){
    console.log('home destroyed')
  },
  created() {
    // created只写逻辑方法，具体方法抽离到methods

    // 组件创建完，马上使用getHomeMutidata请求数据
    // 1.请求banners轮播数据 和 recommend推荐数据
    this.getHomeMutidata();
    // 2.请求商品货物数据，传入type 和 page 参数
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    // 1.点击切换频道 流行 新款 精选
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 让两个tab-control组件的currentIndex保持一致
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 3.监听子组件返回的滚动事件，调用此函数，判断是否显示返回顶部按钮组件
    contentScroll(position){
      // console.log(position);
      this.isShowBackTop = position.y < -1000;

      this.isTabFix = position.y < -this.offsetTop ? true : false;
    },
    // 4.上拉加载更多的时候请求数据
    loadMore(){
      console.log('load more');
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.finishPullUp();//完成上拉加载更多
      this.$refs.scroll.refresh();//加载完成后刷新一下
    },
    // 5.轮播图加载完毕
    swiperImageLoad(){
      this.offsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    
    /**
     * 网络请求相关的方法
     */
    // 抽离出来的请求代码
    getHomeMutidata() {//请求轮播图数据和下面的推荐的数据
      getHomeMutidata().then((res) => {
        // console.log(res)
        // 把result保存起来
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const obj = this.goods[type];
      getHomeGoods(type, obj.page + 1).then((res) => {//这里使用的getHomeGoods是引用进来的方法
        // 把res里面的需要的数据存起来 ...语法相当于去掉[]
        obj.list.push(...res.data.list);
        obj.page += 1; //页码加一
      });
    },

  },
  mounted(){
    // 里买的内容使用mixin混入替代
  },
  // update(){
  //   const refresh = debounce(this.$refs.scroll.refresh,100);//(注意 有)
  //   this.$bus.$on('itemImageLoad',()=>{//刷新
  //     // 使用防抖动 不用每次都刷新
  //     refresh()
  //   })
  // },
  activated(){//重新进入时
    this.$refs.scroll.scrollTo(0,this.saveY,0);//载入离开前的位置
    this.$refs.scroll.refresh();//回来之后刷新一下
  },
  deactivated(){//离开时
    this.saveY = this.$refs.scroll.scroll.y;//保存离开前滚动到的位置
    this.$bus.$off('itemImageLoad',this.itemListener);//取消监听
  }
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
#home {
  position: relative;
  height: 100vh;/*充满视图 */
}

.content{
  /* height: 300px; */
  /* background-color: red; */

  /* 绝对定位 设置上面和下面的距离 让可滚动区域刚好 */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}

.tab-control{
  position: relative;
  z-index: 9;
}

</style>