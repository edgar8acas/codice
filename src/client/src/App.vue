<template>
  <div id="app">
    <!--<div id="nav">
      <router-link to="/">Mostrar todos</router-link>
    </div>-->
    <router-view/>
  </div>
</template>

<script>
import store from '@/store'

export default {
  store
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.section-title {
  text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
