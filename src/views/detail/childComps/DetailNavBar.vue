<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img class="title-img" src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div class="title-item"
         v-for="(item,index) in titles"
         :key="item.id"
         :class="{active:index===currentIndex}"
         @click="titleItemClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navBar/NavBar'

export default {
  name : 'DetailNavBar',
  components : {
    NavBar,
  },
  data(){
    return{
      titles : ['商品','参数','评论','推荐'],
      currentIndex : 0
    }
  },
  methods : {
    titleItemClick(index){
      this.currentIndex = index;
      this.$emit('navBarClick',index);
    },
    backClick(){
      // this.$router.go(-1);
      this.$router.back();
    }
  }
}
</script>

<style scoped>
.title{
  display: flex;
  font-size: 13px;
}
.title-item{
  flex: 1;
}
.active{
  color: var(--color-high-text);
}
.back img{
  margin-top: 12px;
}
</style>