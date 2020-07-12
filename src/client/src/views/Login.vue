<template>
  <div class="login" id="login">
    <form class="ui form">
      <div class="field">
        <label class="white">Usuario</label>
        <input
          type="text"
          name="user"
          v-model="user.user"
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
      <button class="fluid ui button blue">Ingresar</button>
      <br />
      <button class="fluid ui button">Registro</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },
};
</script>

<style lang="scss">
.login {
  width: 400px;
  height: 50%;
  border-radius: 15px;
  background-color: hsla(360, 100%, 100%, 0.3);
  padding: 10px;
}
#login form.ui.form .field .white {
  color: white;
}
</style>
