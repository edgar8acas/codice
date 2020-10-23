<template>
  <form class="ui form">
    <div class="field">
      <label>Id</label>
      <input type="text" name="userId" v-model="user.userId" disabled />
    </div>
    <div class="field">
      <label>Nombre de usuario (6 - 20 caracteres)</label>
      <input type="text" name="username" v-model="user.username" />
    </div>
    <div class="field">
      <sui-checkbox label="Administrador" name="admin" v-model="user.admin" />
    </div>
    <div class="field">
      <label>Nueva contraseña (mínimo 8 caracteres)</label>
      <input type="text" name="password" v-model="user.password" />
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    user: {
      type: Object,
    },
  },
};
</script>

<style></style>
