<template>
  <div class="dashboard-container">
    <header class="dash-header">
      <div class="logo">CÓDICE</div>
      <div class="dash-header-right">
        <div class="user-data">
          <span class="user-name" style="color: white">{{
            user.username
          }}</span>
          <span class="user-role" style="color: white">{{
            formatUserType
          }}</span>
        </div>
        <button class="ui button" @click="logout">Salir</button>
      </div>
    </header>
    <nav class="nav">
      <router-link :to="{ name: 'Texts' }" exact-active-class="nav-active"
        >Textos</router-link
      >
      <router-link
        :to="{ name: 'Words' }"
        exact-active-class="nav-active"
        v-if="user.admin"
        >Palabras</router-link
      >
      <router-link
        :to="{ name: 'Users' }"
        exact-active-class="nav-active"
        v-if="user.admin"
        >Usuarios</router-link
      >
    </nav>
    <router-view class="main"></router-view>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { LOGOUT } from "../store/action-types";
import VueRouter from "vue-router";
const { isNavigationFailure } = VueRouter;

export default {
  computed: {
    ...mapState("auth", ["user"]),
    formatUserType() {
      return this.user.admin ? "Administrador" : "Estudiante";
    },
  },
  methods: {
    ...mapActions("auth", [LOGOUT]),
    logout() {
      this[LOGOUT]()
        .then(() => {
          return this.$router.push({ name: "Landing" });
        })
        .catch((failure) => {
          if (isNavigationFailure(failure)) {
            console.log("Inicia sesión para continuar");
          }
        });
    },
  },
};
</script>

<style lang="scss">
.dashboard-container {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: 90px 50px 82vh 6vh;

  .dash-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2185d0;
    grid-column: 1 / span 10;

    > * {
      align-self: center;
    }

    .logo {
      font-family: "Krona One";
      font-size: 2em;
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

    .dash-header-right {
      font-size: 1em;
      margin-right: 1em;
      display: flex;
      align-items: center;

      .user-data {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-right: 1em;
        .user-name {
          font-size: 1.3em;
          font-weight: bold;
        }
        .user-role {
          font-size: 1.2em;
          text-transform: uppercase;
        }
      }
    }
  }

  .nav {
    display: flex;
    grid-column: 1 / span 10;
    background-color: hsl(0, 0%, 90%);
    padding-left: 30px;
    > * {
      padding: 0.8em;
      //align-self: flex-end;
      font-size: 1.2em;
    }

    > *:hover {
      background-color: hsl(0, 0%, 80%);
    }

    .nav-active {
      font-weight: bold;
      border-bottom: 2px solid #2185d0;
    }
  }

  .main {
    grid-column: 2 / span 8;
    margin-top: 20px;
  }
}
</style>
