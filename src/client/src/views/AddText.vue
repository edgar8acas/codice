<template>
  <div class="home">
    <div class="info"></div>
    <div>
      <!-- TODO: Refactor alerts -->
      <sui-message
        class="negative"
        v-if="errorVisible"
        dismissable
        @dismiss="dismissErrors"
      >
        <sui-message-header>Error al guardar</sui-message-header>
        <p>Corrija lo siguiente</p>
        <ul class="list">
          <li v-for="msg in errors" :key="msg">{{ msg }}</li>
        </ul>
      </sui-message>

      <sui-message
        class="positive"
        v-if="successVisible"
        dismissable
        @dismiss="dismissSuccess"
      >
        <sui-message-header>Texto creado</sui-message-header>
        <p>El texto fue creado exitosamente</p>
      </sui-message>

      <h1>Añadir texto</h1>
      <p>Completa los datos para agregar un nuevo texto a la plataforma</p>
      <form class="ui form">
        <div class="field">
          <label>Título</label>
          <input
            type="text"
            name="title"
            v-model="text.title"
            placeholder='"El planeta tierra" ó "La fotosíntesis"'
          />
        </div>
        <div class="field">
          <label>Categoría</label>
          <input
            type="text"
            name="category"
            v-model="text.category"
            placeholder='"Español" ó "Conocimiento del medio"'
          />
        </div>
        <div class="field">
          <label>Grado</label>
          <sui-dropdown
            placeholder="Selecciona un grado"
            selection
            :options="gradeOptions"
            v-model="text.grade"
          ></sui-dropdown>
        </div>
        <div class="field">
          <label>Contenido</label>
          <textarea
            name="rawContent"
            cols="30"
            rows="10"
            v-model="text.rawContent"
            placeholder="Copia y pega aquí el contenido del texto sin formato"
          ></textarea>
        </div>
        <button class="ui button" type="submit" @click.prevent="add">
          Añadir
        </button>
      </form>
    </div>
    <div class="more-info"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      gradeOptions: [
        { text: "Primero", value: 1 },
        { text: "Segundo", value: 2 },
        { text: "Tercero", value: 3 },
        { text: "Cuarto", value: 4 },
        { text: "Quinto", value: 5 },
        { text: "Sexto", value: 6 },
      ],
      text: {
        addedBy: 1,
        grade: 1,
      },
      successVisible: false,
      errorVisible: false,
    };
  },
  computed: {
    ...mapState(["errors", "success"]),
  },
  watch: {
    errors() {
      this.errorVisible = true;
    },
    success() {
      this.errorVisible = false;
      this.successVisible = true;
      this.text = {
        addedBy: 1,
        grade: 1,
      };
    },
  },
  methods: {
    add() {
      this.$store.dispatch("addText", this.text);
    },
    dismissErrors() {
      this.errorVisible = false;
    },
    dismissSuccess() {
      this.successVisible = false;
    },
  },
};
</script>

<style></style>
