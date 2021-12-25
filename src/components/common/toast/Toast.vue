<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
export default {
  name : 'Toast',
  // props : {
  //   message : {
  //     type : String,
  //     default(){
  //       return ' '
  //     }
  //   },
  //   isShow : {
  //     type : Boolean,
  //     default(){
  //       return false;
  //     }
  //   }
  // },
  methods : {
    show(message,duration=1500){
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = ' ';
      }, duration);
    }
  },
  data(){
    return {
      message : '',
      isShow : false
    }
  }
}
</script>

<style>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: rgba(112, 104, 104, 0.6);
  z-index: 99;
  color: #fff;
  padding: 6px 8px;
}
</style>