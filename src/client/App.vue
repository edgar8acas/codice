<template>
  <div id="app">
    <!--<div id="nav">
      <router-link to="/">Mostrar todos</router-link>
    </div>-->
    <router-view />
  </div>
</template>

<script>
import store from "@store";
import { mapActions, mapGetters } from "vuex";
import { CHECK_AUTHENTICATION } from "./store/action-types";
import { IS_AUTHENTICATED } from "./store/getter-types";

export default {
  store,
  mounted() {
    this.CHECK_AUTHENTICATION();
  },
  methods: {
    ...mapActions("auth", [CHECK_AUTHENTICATION]),
  },
  computed: {
    ...mapGetters("auth", [IS_AUTHENTICATED]),
  },
  watch: {
    [IS_AUTHENTICATED](isAuthenticated) {
      if (isAuthenticated) {
        this.$router.push(this.$route.query.redirect || "/dashboard");
      } else {
        this.$router.push({ name: "Login" });
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Krona+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Mulish:wght@500;800&display=swap");
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  box-sizing: border-box;
}

body {
  font-family: "Mulish";
}

*,
*:before,
*:after {
  box-sizing: inherit;
}
</style>
