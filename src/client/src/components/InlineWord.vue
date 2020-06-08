<template>
  <span 
    @click="select"
    :class="'inline-word ' + occurrence.markedStatus"
  >{{ word }}
  </span>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    occurrence: Object
  },
  computed: {
    word() {
      return this.occurrence.word;
    },
    start() {
      return this.occurrence.start;
    }
  },
  methods: {
    select() {
      this.hover = true;
      this.$emit('changeOccurrence', this.start);
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

.inline-word.conflicts {
  color: white;
  background-color: red;
}

.inline-word.ready {
  color: white;
  background-color: green;
}
</style>