<template>
  <div class="login" id="login">
    <h2 class="form-title">Inicia sesión</h2>
    <form class="ui form">
      <div class="field">
        <label class="white">Usuario</label>
        <input
          type="text"
          name="user"
          v-model="user.username"
          placeholder="Usuario"
          required
          minlength="6"
        />
      </div>
      <div class="field">
        <label class="white">Contraseña</label>
        <input
          type="password"
          name="password"
          v-model="user.password"
          placeholder="Contraseña"
          required
          minlength="8"
        />
      </div>
      <div style="color: red" v-if="error">{{ error }}</div>
      <button class="fluid ui button blue" @click.prevent="login">
        Ingresar
      </button>
      <br />
      <button
        class="fluid ui button"
        @click.prevent="$router.push({ name: 'Register' })"
      >
        Crea una cuenta
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { LOGIN } from "../store/action-types";

export default {
  data() {
    return {
      user: {},
      error: null,
    };
  },
  methods: {
    login() {
      this[LOGIN](this.user).catch((res) => {
        this.error = res.data.error;
      });
    },
    ...mapActions("auth", [LOGIN]),
  },
};
</script>

<style lang="scss">
.login {
  width: 35vw;
  border-radius: 15px;
  padding: 10px;
  background-color: #fff;
}
.form-title {
  text-align: center;
}
</style>
