<template>
  <span 
    :class="classObject"
    @click="CHANGE_SELECTED_WORD(occurrence.word)">{{ occurrence.word }}</span>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { CHANGE_SELECTED_WORD } from '../store/action-types'
export default {
  props: {
    occurrence: Object
  },
  computed: {
    classObject() {
      return {
        "to-add-word": true,
        "similar-selected": this.occurrence.word === this.selected
      }
    },
    ...mapState("textContent", ["selected"])
  },
  methods: {
    ...mapActions("textContent", [CHANGE_SELECTED_WORD])
  }
}
</script>

<style scoped>
.to-add-word:hover {
  background: lightgreen;
  cursor: pointer;
}

.to-add-word.similar-selected {
  background: lightgrey;
  color: #3c3c3c;
  font-weight: bold;
}
</style>