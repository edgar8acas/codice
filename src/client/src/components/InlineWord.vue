<template>
  <span @click="selectMeaning" :class="classObject">{{ word }}</span>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    occurrence: Object,
  },
  computed: {
    availableMeanings() {
      return this.$store.getters.availableMeaningsByWord(this.word);
    },
    word() {
      return this.occurrence.word;
    },
    start() {
      return this.occurrence.start;
    },
    classObject() {
      return {
        "inline-word": true,
        essential:
          this.occurrence.essential !== undefined
            ? this.occurrence.essential
            : false,
        "available-meanings": this.availableMeanings.length > 0,
        invisible:
          this.occurrence.visible !== undefined
            ? !this.occurrence.visible
            : false,
      };
    },
  },
  methods: {
    selectMeaning() {
      this.hover = true;
      this.$emit("changeOccurrence", this.start);
    },
  },
};
</script>

<style lang="scss" scoped>
.inline-word {
  display: inline-block;
  border-radius: 5px;

  //no essential
  border-bottom: 4px solid black;

  &.essential {
    border-bottom: 4px solid blue;
  }

  //no available meanings
  background-color: #f2711c;
  color: white;

  &.available-meanings {
    background-color: #21ba45;
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
  color: #246eb9;
  text-shadow: #2bd9fe 1px 0 10px;
  font-weight: bold;
}

.inline-word.not-learnt {
  color: #f06543;
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
