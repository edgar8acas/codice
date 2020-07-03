<template>
  <span 
    @click="selectMeaning"
    :class="
      'inline-word ' + 
      occurrence.learntStyle + ' ' + 
      occurrence.essentialStyle + ' ' + 
      occurrence.availableStyle + ' ' +
      occurrence.visibleStyle + ' ' +
      occurrence.status + ' '"
  >{{ word }}</span>
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

  &.no-meanings {
    background-color: #f2711c;
    color: white;
  }

  &.with-meanings {
    background-color: #21ba45;
    color: white;
  }

  &.essential {
    border-bottom: 3px solid black;
  }

  &.unessential {
    border-bottom: 4px solid blue;
  }

  &.invisible {
    background-color: initial;
    border: none;
    color: inherit;

    &:hover {
      text-decoration: none;
      cursor: initial;
    }
  }
}

.inline-word.learnt {
  color: #246EB9;
  text-shadow: #2BD9FE 1px 0 10px;
  font-weight: bold;
}

.inline-word.not-learnt {
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