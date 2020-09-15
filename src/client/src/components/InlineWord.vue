<template>
  <span 
    @click="CHANGE_SELECTED_WORD(occurrence.word)" 
    :class="classObject"
  >
    {{ word }}
    <!-- Dev purposes -->
    <span v-if="development">
      <sup style="color: blue;">{{ this.occurrence.userOccurrenceId }}</sup>
      <sub style="color: green;">{{ this.occurrence.selectedWordId }}</sub>
    </span>
  </span>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { CHANGE_SELECTED_WORD } from '../store/action-types';

import {
  GET_DICTIONARY_BY_WORD,
  GET_MEANINGS_BY_WORD,
} from "./../store/getter-types";

export default {
  data() {
    return {};
  },
  props: {
    occurrence: Object,
  },
  computed: {
    ...mapState(["development", "meanings"]),
    ...mapState("textContent", ["selected"]),
    ...mapState("learn", ["addingWord"]),
    ...mapGetters([GET_MEANINGS_BY_WORD]),
    ...mapGetters([GET_DICTIONARY_BY_WORD]),
    dictionary() {
      return this[GET_DICTIONARY_BY_WORD](this.occurrence.word);
    },
    meanings() {
      return this[GET_MEANINGS_BY_WORD](this.word);
    },
    word() {
      return this.occurrence.word;
    },
    position() {
      return this.occurrence.position;
    },
    classObject() {
      return {
        "inline-word": true,
        essential:
          this.occurrence.essential !== undefined
            ? this.occurrence.essential
            : false,
        "available-meanings": this.meanings.length > 0,
        "not-available-meanings": this.meanings.length === 0,
        invisible:
          this.occurrence.visible !== undefined
            ? !this.occurrence.visible
            : false,
        "currently-selected": this.occurrence.word === this.selected,
        learned:
          this.dictionary !== undefined
            ? this.dictionary.isLearned
              ? true
              : false
            : false,
        "not-learned":
          this.dictionary !== undefined
            ? !this.dictionary.isLearned
              ? true
              : false
            : false,
        "unselected-meaning": !this.occurrence.selectedWordId,
        process:
          (!this.occurrence.occurrenceId &&
            !this.occurrence.userOccurrenceId) ||
          this.occurrence.occurrenceId,
        "is-adding-word": this.addingWord
      };
    },
  },
  methods: {
    ...mapActions("textContent", [CHANGE_SELECTED_WORD])
  },
};
</script>

<style lang="scss" scoped>
.inline-word {
  display: inline-block;
}

.inline-word:hover {
  cursor: pointer;
}

.inline-word.invisible {
  background-color: initial;
  border: none;
  color: inherit;
  font-weight: initial;

  &:hover {
    text-decoration: none;
    cursor: initial;
  }
}

.inline-word.process.available-meanings {
  background-color: #21ba45;
  color: white;
  border-bottom: 3px solid #21ba45;
  border-radius: 5px;
}

.inline-word.process.not-available-meanings {
  background-color: #f2711c;
  color: white;
  border-bottom: 3px solid #f2711c;
  border-radius: 5px;
}

.inline-word.currently-selected {
  font-weight: bolder;
  color: white;
  background-color: purple !important;
  border-bottom: none;
  border-radius: 5px;
}

.inline-word.is-adding-word {
  background-color: #ebebeb;
  color: gray;
}

.inline-word.learned.currently-selected {
  color: white;
  background-color: hsl(197, 71%, 46%) !important;
}

.inline-word.not-learned.currently-selected {
  color: white;
  background-color: #ff3737 !important;
}

.inline-word.learned {
  color: hsl(197, 71%, 46%);
  border-bottom: 3px solid hsl(197, 71%, 46%);
  background: transparent;
}

.inline-word.not-learned {
  color: #ff3737;
  background: transparent;
}



</style>
