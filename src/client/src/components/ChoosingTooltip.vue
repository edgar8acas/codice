<template>
  <div>
    <select v-model="selected">
      <option v-for="option in options" :value="option.textId" :key="option.textId">
        {{ option.word }} {{ option.textId }}
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
  watch: {
    selected: function() {
      this.$emit('selectedChanged', this.selectedOption)
    }
  },
  computed: {
    selectedOption() {
      return this.options.map(option => {
        if(option.textId === this.selected)
          return {...option, selected: true}
        return {...option}
      })
    } 
  }
}
</script>

<style>

</style>