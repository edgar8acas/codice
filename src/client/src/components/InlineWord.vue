<template>
  <span 
    @mouseover="onMouseOver" 
    @mouseleave="hover = false"
  >{{ word }}
  </span>
</template>

<script>
export default {
  data() {
    return {
      hover: false
    }
  },
  props: {
    word: String,
    wordId: String
  },
  methods: {
    onMouseOver() {
      this.hover = true;
      this.$emit('mouseover', this.wordId);
    }
  }
}
</script>

<style lang="scss" scoped>
.inline-word {
  color: red;
  display: inline-block;
}

.inline-word:hover {
  text-decoration: underline;
  cursor: help;
}
</style>