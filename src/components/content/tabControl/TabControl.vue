<template>
<!-- 只是文字不一样 没必要使用插槽 -->
  <div class="tab-control">
    <div class="tab-control-item" 
    v-for="(item,index) in titles" 
    :key="item.id"
    :class="{active : index === currentIndex}"
    @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name : "TabControl",
  data(){
    return {
      currentIndex : 0,
    }
  },
  props : {
    titles : {
      type : Array,
      default(){
        return []
      }
    }
  },
  methods : {
    itemClick(index){
      this.currentIndex = index;
      // 点击后把当前的index传出去
      this.$emit('tabClick',index);
    }
  }
}
</script>

<style scoped>
.tab-control{
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.tab-control-item{
  flex: 1;
}
.tab-control-item span{
  padding: 5px;
}
.active{
  color: var(--color-high-text);
}
.active span{
  border-bottom: 3px solid var(--color-high-text);
}
</style>