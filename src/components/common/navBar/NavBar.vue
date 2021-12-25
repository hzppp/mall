<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.nav-bar{
  height: 44px;
  display: flex;
  line-height: 44px;
  text-align: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
}

.left,.right{
  width: 60px;
}


.center{
  /* background-color: blue; */
  flex: 1;
}
</style>