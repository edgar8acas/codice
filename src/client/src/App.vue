<template>
  <div id="app">
    <!--<div id="nav">
      <router-link to="/">Mostrar todos</router-link>
    </div>-->
    <router-view />
  </div>
</template>

<script>
import store from "@/store";

export default {
  store,
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Krona+One&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@500;800&display=swap');
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}
</style>
