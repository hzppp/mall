<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name : 'BackTop',
}
</script>

<style scoped>
/* 反正都要设置position 那么就在这里设置 */
.back-top{
  position: fixed;
  bottom: 50px;
  right: 10px;
  z-index: 99;
}
.back-top img{
  width: 43px;
  height: 43px;
}
</style>