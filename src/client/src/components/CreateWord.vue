<template>
  <div class="ui form" id="create-word-form">
    <h3>Añadir definición</h3>
    <div class="field">
      <label>Palabra</label>
      <input 
        type="text" 
        name="title"
        v-model="forWord"
        disabled
      >
    </div>
    <div class="field">
      <label>Definición</label>
      <input 
        type="text" 
        name="title"
        v-model="definition"
      >
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
    <button class="ui button" type="submit" @click.prevent="saveWord">Guardar</button>
  </div>
</template>

<script>
export default {
  props: {
    forWord: String
  },
  data() {
    return {
      definition: '',
      type: '',
      typeOptions: [
        { text: 'Artículo', value: 'artículo'},
        { text: 'Sustantivo', value: 'sustantivo'},
        { text: 'Pronombre', value: 'pronombre'},
        { text: 'Adjetivo', value: 'adjetivo'},
        { text: 'Verbo', value: 'verbo'},
        { text: 'Adverbio', value: 'adverbio'},
        { text: 'Preposición', value: 'preposición'},
        { text: 'Conjunción', value: 'conjunción'},
        { text: 'Intersección', value: 'intersección'},
      ],
    }
  },
  methods: {
    saveWord() {
      this.$store.dispatch('saveWord', {
        word: this.forWord,
        definition: this.definition,
        type: this.type
      });
    }
  }
}
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