<template>
  <div class="bottom-bar">
    <div class="area">
      <div class="left-area">
        <check-button class="check-button"
        :value="allChosen"
        @click.native="cbClick"/>
        <span class="all-in" @click="chooseAll">全选</span>
      </div>
      <div class="center">合计 :{{ totalPrice }}</div>
      <div class="calculate">去计算:{{ checkLength }}</div>
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => item.checked)
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    allChosen(){
      return this.$store.state.cartList.filter(item => !item.checked).length === 0
    }
  },
  methods : {
    chooseAll(){
      // console.log('click')
      this.$store.commit('chooseAll');
    },
    cbClick(){
      this.$store.commit('allIconClick');
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  bottom: 41px;
  text-align: center;
}
.area {
  display: flex;
  height: 40px;
  line-height: 40px;
}

.left-area{
  display: flex;
  width: 90px;
}

.check-button {
  margin: 3px 8px 0 5px;
}

.all-in {
  margin-right: 25px;
}

.calculate {
  width: 100px;
  background-color: pink;
}

.center{
  flex: 1;
}
</style>