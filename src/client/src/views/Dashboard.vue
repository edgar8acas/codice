<template>
  <div class="dashboard-container">
    <header class="dash-header">
      <div class="logo">CÓDICE</div>
      <div class="top-buttons">
        <router-link to="/">Salir</router-link>
        <button @click="changeUserType">{{ formatUserType }}</button>
      </div>
    </header>
    <nav class="nav">
      <router-link :to="{ name: 'Texts' }" exact-active-class="nav-active"
        >Textos</router-link
      >
      <router-link :to="{ name: 'Words' }" exact-active-class="nav-active"
        >Palabras</router-link
      >
    </nav>
    <router-view class="main"></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["user"]),
    formatUserType() {
      return this.user.admin ? "Administrador" : "Estudiante";
    },
  },
  methods: {
    changeUserType() {
      this.$store.dispatch("toggleUserType");
    },
  },
};
</script>

<style lang="scss">
.dashboard-container {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: 5vh 5vh 85vh 5vh;

  .dash-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #2185d0;
    grid-column: 1 / span 10;
    height: auto;
    font-size: 2em;

    > * {
      align-self: center;
    }

    .logo {
      font-family: "Krona One";
      padding: 10px;
      color: white;
    }

    .current {
      font-size: 0.7em;
      color: white;
    }

    .user-info {
      color: white;
      padding: 10px;
    }
  }

  .nav {
    display: flex;
    grid-column: 1 / span 10;
    background-color: #eee;
    padding-left: 30px;
    > * {
      padding: 0.8em;
      //align-self: flex-end;
      font-size: 1.2em;
    }

    > *:hover {
      border-bottom: 2px solid #2185d0;
    }

    .nav-active {
      font-weight: bold;
    }
  }

  .main {
    grid-column: 2 / span 8;
    margin-top: 20px;
  }
}
</style>
