<template>
  <div>
    <select v-model="selected">
      <option v-for="option in options" :value="option.wordId" :key="option.wordId">
        {{ option.word }} ID: {{ option.wordId }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    options: Array
  },
  data() {
    return {
      selected: null
    }
  },
  mounted() {
    const selected = this.options.find(option => option.selected)
    if (typeof selected !== 'undefined')
      this.selected = selected.wordId
  },
  watch: {
    selected: function() {
      this.$emit('selectedChanged', this.selectedOption);
    }
  },
  computed: {
    selectedOption() {
      return this.options.map(option => {
        if(option.wordId !== this.selected) {
          
          delete option.selected;
          return {...option}
        } else {
          return {...option, selected: true }
        }
      })
    } 
  }
}
</script>

<style>

</style>