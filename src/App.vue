<template>
  <div>
    <span>{{msg}}</span>
    <!-- <p :class="{ [$style.red]: isRed }">Am I red?</p>
    <p :class="[$style.red, $style.bold]">Red and bold</p>-->
    <img :src="Icon" alt>
    <div class="box"></div>
  </div>
</template>

<script>
import Icon from "@/assets/img/share.png";
import { cube } from "./math.js";
import Print from "./print";
export default {
  created() {},
  data() {
    return {
      msg: "Hello world!",
      isRed: true,
      Icon
    };
  }
};
</script>

<style lang="postcss" scoped>
@font-face {
  font-family: "MyFont";
  src: url("./assets/font/Founder.ttf");
  font-weight: 600;
  font-style: normal;
}
span {
  color: red;
  font-family: "MyFont";
}
.box {
  display: grid;
  width: 100px;
  height: 100px;
  background: url("./assets/img/share.png");
}
</style>