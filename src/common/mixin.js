import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop";
// mixin用于解决组建之间的代码重复问题 只能提取生命周期里面的
export const itemListenerMixin = {
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,100);//(注意 有)
    this.itemListener = ()=>{//刷新
      // 使用防抖动 不用每次都刷新
      refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemListener)
    // console.log("mixin!!!");
  }
}

// Home组件和Detail组件都作对backTop组件的混入
export const backTopMixin = {  
  components : {
    BackTop,
  },
  data(){
    return{
      isShowBackTop : false
    }
  },
  methods : {
     // 2.点击返回顶部按钮
     backClick(){
      // this.$refs.scroll就获取到了Scroll这个组件的对象
      // 就可以直接使用到里面的属性啦(包括data等)
      this.$refs.scroll.scrollTo(0,0);
      // scrollTo  滚到哪 用时
    },
  }
}