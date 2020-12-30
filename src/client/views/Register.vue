<template>
  <div>
    <div class="login" id="login">
      <h2 class="form-title">Crea una cuenta</h2>
      <form class="ui form">
        <div class="field">
          <label class="white">Usuario</label>
          <input
            type="text"
            name="user"
            v-model="user.username"
            placeholder="Usuario"
          />
        </div>
        <div class="field">
          <label class="white">Contraseña</label>
          <input
            type="password"
            name="password"
            v-model="user.password"
            placeholder="Contraseña"
          />
        </div>
        <div style="color: red" v-if="error" class="form-error">
          {{ error }}.
          <div class="validation-tips">
            <ul>
              <li>El nombre de usuario debe tener entre 6 y 20 caracteres.</li>
              <li>La contraseña debe tener al menos 8 caracteres.</li>
            </ul>
          </div>
        </div>
        <button
          class="fluid ui button blue"
          type="submit"
          @click.prevent="register"
        >
          Crear
        </button>
        <br />
        <a class="login-link" @click="$router.push({ name: 'Landing' })"
          >¿Ya tienes una cuenta? Ingresa</a
        >
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { REGISTER } from "../store/action-types";
export default {
  data() {
    return {
      user: {},
      error: null,
    };
  },
  methods: {
    ...mapActions("auth", [REGISTER]),
    register() {
      this[REGISTER](this.user)
        .then(() => {
          this.$router.push({ name: "Landing" });
        })
        .catch((res) => {
          this.error = res.data.error;
        });
    },
  },
};
</script>

<style lang="scss">
.login-link {
  text-align: center;
  cursor: pointer;
}

.form-error {
  margin-bottom: 1em;
}
</style>
