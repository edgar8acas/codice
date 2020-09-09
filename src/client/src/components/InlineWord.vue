<template>
  <span 
    @click="CHANGE_SELECTED_INLINE_WORD(occurrence.word)" 
    :class="classObject" 
    :token-position="occurrence.position" 
    :token-word="occurrence.word"
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
import { CHANGE_SELECTED_INLINE_WORD } from '../store/action-types';

import {
  GET_MEANINGS_BY_WORD,
  GET_DICTIONARY_BY_WORD_ID,
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
    ...mapGetters([GET_MEANINGS_BY_WORD]),
    ...mapGetters([GET_DICTIONARY_BY_WORD_ID]),
    dictionary() {
      return this[GET_DICTIONARY_BY_WORD_ID](this.occurrence.selectedWordId);
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
      };
    },
  },
  methods: {
    ...mapActions("textContent", [CHANGE_SELECTED_INLINE_WORD])
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

.inline-word.learned {
  color: hsl(197, 71%, 46%);
  border-bottom: 3px solid hsl(197, 71%, 46%);
}

.inline-word.not-learned {
  color: #ff3737;
  border-bottom: 3px solid #ff3737;
}

.inline-word.unselected-meaning {
  color: #edc800;
  border-bottom: 3px solid #edc800;
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

.inline-word.conflicts {
  color: white;
  background-color: red;
}

.inline-word.ready {
  color: white;
  background-color: green;
}

.inline-word.currently-selected {
  font-weight: bolder;
  color: white;
  background-color: purple !important;
  border-bottom: none;
  border-radius: 5px;
}
</style>
