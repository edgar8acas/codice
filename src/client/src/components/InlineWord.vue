<template>
  <span 
    @click="selectMeaning"
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
    selectMeaning() {
      this.hover = true;
      this.$emit('changeOccurrence', this.start);
    }
  }
}
</script>

<style lang="scss" scoped>
.inline-word {
  display: inline-block;
  border-radius: 5px;
}

.inline-word.learnt {
  color: #246EB9;
  text-shadow: #2BD9FE 1px 0 10px;
  font-weight: bold;
}

.inline-word.unlearnt {
  color: #F06543;
  text-shadow: #c05136 1px 0 10px;
  font-weight: bold;
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