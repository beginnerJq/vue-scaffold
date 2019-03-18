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
import printMe from "./print.js";
import { cube } from "./math.js";
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
console.log(cube(5));
if (module.hot) {
  module.hot.accept("./print.js", function() {
    console.log("Accepting the updated printMe module!");
    printMe();
  });
}
const a = 1;
console.log(a);
console.log(Symbol());
new Promise(resolve => {
  resolve(2);
}).then(v => {
  console.log(v);
});
</script>

<style lang="postcss" scoped>
@font-face {
  font-family: "MyFont";
  src: url("./assets/font/Founder.ttf");
  font-weight: 600;
  font-style: normal;
}
span {
  color: green;
  font-family: "MyFont";
}
.box {
  display: grid;
  width: 100px;
  height: 100px;
  background: url("./assets/img/share.png");
}
</style>