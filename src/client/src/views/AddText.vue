<template>
  <div class="home">
    <div class="info"></div>
    <div>
      <h1>Nuevo texto</h1>
      <p>Completa los datos para agregar un nuevo texto a la plataforma</p>
      <form class="ui form" @submit="validateAndSend">
        <div class="field">
          <label>Título</label>
          <input
            type="text"
            name="title"
            v-model="text.title"
            placeholder='"El planeta tierra"'
          />
        </div>
        <div class="field">
          <label>Categoría</label>
          <input
            type="text"
            name="category"
            v-model="text.category"
            placeholder='"Español"'
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
          <label>Contenido (500 - 3500 caracteres)</label>
          <textarea
            name="rawContent"
            cols="30"
            rows="10"
            maxlength="3500"
            v-model="text.rawContent"
            placeholder="Copia y pega aquí el contenido del texto"
          ></textarea>
          <span>{{ charactersLeft }}</span>
        </div>
        <div class="alert-wrapper">
          <alert :active="alertSuccess" :color="`success`">
            La definición se guardó correctamente.
          </alert>
          <alert :active="alertError" :color="`error`">
            Algo salió mal, intenta de nuevo.
            <ul>
              <li v-for="e in errors" :key="e">{{ e }}</li>
            </ul>
          </alert>
        </div>
        <input class="ui button primary" type="submit" value="Guardar"/>
      </form>
    </div>
    <div class="more-info"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Alert from "@/components/Alert.vue";
import { ADD_TEXT } from '../store/action-types';

export default {
  components: {
    Alert
  },
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
        title: '',
        category: '',
        addedBy: 1,
        grade: 1,
        rawContent: ''
      },
      alertSuccess: false,
      alertError: false,
      errors: []
    };
  },
  computed: {
    charactersLeft() {
    var char = this.text.rawContent.length,
      limit = 3500;
      return (limit - char) + " / " + limit + " caracteres restantes";
  }
  },
  watch: {
  },
  methods: {
    ...mapActions("texts", [ADD_TEXT]),
    validateAndSend(e) {
      e.preventDefault();
      
      this.errors = [];
      this.alertError = false;
      
      if (this.text.title.length === 0) {
        this.errors.push('El título no puede estar vacío.')
      }

      if (this.text.category.length === 0) {
        this.errors.push('La categoría no puede estar vacía.')
      }

      if (this.text.rawContent.length < 500 || this.text.rawContent.length > 3500) {
        this.errors.push('El contenido debe tener entre 500 y 3500 caracteres.')
      }

      if(this.errors.length === 0) {
        console.log(this.errors);
        this[ADD_TEXT](this.text);
        this.$router.replace({ name: "Texts" });
        return;
      }
      this.alertError = true;
    }
  },
};
</script>

<style>
.alert-wrapper {
  margin-bottom: 1rem;
}
</style>
