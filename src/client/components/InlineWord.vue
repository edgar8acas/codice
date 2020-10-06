<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { CHANGE_SELECTED_WORD } from '../store/action-types';

import {
  GET_DICTIONARY_BY_WORD,
  GET_MEANINGS_BY_WORD,
} from "./../store/getter-types";

export default {
  /* eslint-disable no-unused-vars */
  render(h) {
    return (
      <span 
        vOn:click={() => this[CHANGE_SELECTED_WORD](this.occurrence.word)}
        class={this.classObject}
      >
        {this.word}
      </span>
    )
  },
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
        process:
          (!this.occurrence.occurrenceId &&
            !this.occurrence.userOccurrenceId) ||
          this.occurrence.occurrenceId,
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
  font-weight: bolder;
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

.inline-word.currently-selected {
  border-bottom: none;
  border-radius: 5px;
}

.inline-word.process.available-meanings {
  color: #21ba45;
  border-radius: 5px;
}

.inline-word.process.not-available-meanings {
  color: #f2711c;
  border-radius: 5px;
}

.inline-word.process.available-meanings.currently-selected {
  color: white;
  border-radius: 5px;
  background-color: #21ba45;
}

.inline-word.process.not-available-meanings.currently-selected {
  color: white;
  border-radius: 5px;
  background-color: #f2711c;
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
  background: transparent;
}

.inline-word.not-learned {
  color: #ff3737;
  background: transparent;
}



</style>
