<template>
  <span 
    :class="classObject"
    @click="CHANGE_SELECTED_TO_ADD_WORD(word)">{{ word }}</span>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { CHANGE_SELECTED_TO_ADD_WORD } from '../store/action-types'
export default {
  props: {
    position: Number,
    word: String
  },
  computed: {
    classObject() {
      return {
        "to-add-word": true,
        "similar-selected": this.word === this.selectedToAdd
      }
    },
    ...mapState("learn", ["selectedToAdd"])
  },
  methods: {
    ...mapActions("learn", [CHANGE_SELECTED_TO_ADD_WORD])
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