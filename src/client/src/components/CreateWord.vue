<template>
  <div class="ui form" id="create-word-form">
    <h3>Añadir definición</h3>
    <div class="field">
      <label>Palabra</label>
      <input type="text" name="title" v-model="selected" disabled />
    </div>
    <div class="field">
      <label>Definición</label>
      <input type="text" name="title" v-model="definition" />
    </div>
    <div class="field">
      <label>Tipo</label>
      <sui-dropdown
        placeholder="Selecciona un tipo"
        selection
        :options="typeOptions"
        v-model="type"
      ></sui-dropdown>
    </div>
    <div class="field">
      <label>URL de imagen</label>
      <input type="url" name="imageUrl" v-model="imageUrl"/>
    </div>
    <div class="field">
      <label>URL de video</label>
      <input type="url" name="videoUrl" v-model="videoUrl"/>
    </div>
    <button class="ui button" type="submit" @click.prevent="saveMeaning">
      Guardar
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { SAVE_MEANING } from "../store/action-types";

export default {
  data() {
    return {
      definition: "",
      type: "",
      imageUrl: "",
      videoUrl: "",
      typeOptions: [
        { text: "Artículo", value: "artículo" },
        { text: "Sustantivo", value: "sustantivo" },
        { text: "Pronombre", value: "pronombre" },
        { text: "Adjetivo", value: "adjetivo" },
        { text: "Verbo", value: "verbo" },
        { text: "Adverbio", value: "adverbio" },
        { text: "Preposición", value: "preposición" },
        { text: "Conjunción", value: "conjunción" },
        { text: "Intersección", value: "intersección" },
      ],
    };
  },
  computed: {
    ...mapState("textContent", ["selected"])
  },
  methods: {
    ...mapActions([SAVE_MEANING]),
    saveMeaning() {
      this[SAVE_MEANING]({
        word: this.selected,
        definition: this.definition,
        type: this.type,
        imageUrl: this.imageUrl,
        videoUrl: this.videoUrl
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#create-word-form {
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 1em;
  h3 {
    text-align: center;
  }
}

.control {
  margin-bottom: 20px;
}

.label {
  display: inline-block;
  width: 200px;
}
</style>
