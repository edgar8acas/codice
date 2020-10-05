<template>
  <form class="ui form">
    <div class="field">
      <label>Id</label>
      <input type="text" name="wordId" v-model="word.wordId" disabled/>
    </div>
    <div class="field">
      <label>Palabra</label>
      <input type="text" name="word" v-model="word.word"/>
    </div>
    <div class="field">
      <label>Definición</label>
      <input type="text" name="definition" v-model="word.definition"/>
    </div>
    <div class="field">
      <label>Tipo</label>
      <sui-dropdown
        placeholder="Selecciona un tipo"
        selection
        :options="typeOptions"
        v-model="word.type"
      ></sui-dropdown>
    </div>
    <div class="field">
      <label>URL de imagen</label>
      <input type="url" name="imageUrl" v-model="word.imageUrl"/>
    </div>
    <div class="field">
      <label>URL de video</label>
      <input type="url" name="videoUrl" v-model="word.videoUrl"/>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
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
    }
  },
  props: {
    word: {
      type: Object
    }
  },
  methods: {
    
  }
}
</script>

<style>

</style>