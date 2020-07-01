<template>
  <div class="form">
    <h3>Nueva definición</h3>
    <div class="control">
      <label for="word" class="label">Palabra</label>
      <input type="text" v-model="forWord" id="word" disabled>
    </div>
    <div class="control">
      <label for="definition" class="label">Definición</label>
      <input type="text" v-model="definition" id="definition">
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
    <button type="submit" @click.prevent="saveWord">Guardar</button>
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
.form {
  text-align: center;
}

.control {
  margin-bottom: 20px;
}

.label {
  display: inline-block;
  width: 200px;
} 
</style>