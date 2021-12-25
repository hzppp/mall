<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0, //0 和 1 都是不监听位置
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    //1.创建BScroll对象
    // 使用ref 不使用 querySelector('.wrapper') 防止类重名
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // click设置为true 被Scroll组件包裹住的div才能监听到点击事件
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad, //上拉加载更多
    });

    //2.监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        // 监听到滚动 就把position传出去给父组件
        this.$emit("scroll", position);
      });
    }

    //3.监听滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // pullingUp这是事件就是检测是否已经上拉到底部的
        // console.log('监听到底部')
        this.$emit("loadMore");
      });
    }
  },
  methods: {
    // 自封装一个滚回顶部的函数 方便父组件使用
    scrollTo(x, y, time = 300) {
      //es6语法
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 自封装上拉完成函数，告知scroll对象上拉完成 才可以进行下一次上拉加载更多
    finishPullUp(){
      this.scroll.finishPullUp();//finish后才可以进行下一次的监听pullingUp
    },
    // 刷新
    refresh() {
      this.scroll && this.scroll.refresh(); //刷新
      // console.log("refresh");
    },
  },
};
</script>

<style scoped>
</style>