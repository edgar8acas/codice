<template>
  <div class="form">
    <h3>Nueva palabra</h3>
    <div class="control">
      <label for="word" class="label">Palabra</label>
      <input type="text" v-model="word.word" id="word">
    </div>
    <div class="control">
      <label for="definition" class="label">Definición</label>
      <input type="text" v-model="word.definition" id="definition">
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
      word: {
        definition: '',
        word: this.forWord
      }
    }
  },
  methods: {
    saveWord() {
      this.$store.dispatch('saveWord', this.word);
    }
  }
}
</script>

<style lang="scss" scoped>
.form {

}

.control {
 
}

.label {
  display: inline-block;
  width: 200px;
} 
</style>