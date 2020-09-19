<script>
import InlineWord from "@/components/InlineWord";
import ToAddWord from "@/components/ToAddWord";
import VueSimpleContextMenu from "vue-simple-context-menu";
import { mapState, mapActions, mapGetters } from "vuex";
import { SET_FOUND_OCCURRENCES, SET_TO_ADD_OCCURRENCES, DESELECT_INLINE_WORD, CHANGE_SELECTED_WORD, ADD_USER_OCCURRENCE, DELETE_USER_OCCURRENCES_BY_WORD, UPDATE_DICTIONARY } from "../store/action-types";
import { ESSENTIAL_WORDS, GET_OCCURRENCE_BY_POSITION } from "../store/getter-types";

export default {
  /* eslint-disable no-unused-vars */
  render: function (h) {
    return (
      <div>
        <p onClick={(e) => this.handleDeselect(e)}>{
        this.tokens.map(t => {
          if(typeof t === 'object') {
            if(t.type === 'line-break') {
              return this.generateLineBreaks(t);
            } else {
              return this.generateWord(t);
            }
          }
          return t;
        })
        }</p>
        <VueSimpleContextMenu
          elementId={"wordOptionsMenu"}
          options={this.menuOptions}
          ref={"inlineWordContextMenu"}
          vOn:option-clicked={this.onOptionClicked}
        ></VueSimpleContextMenu>
      </div>
    );
  },
  data() {
    return {
      foundOccurrences: [],
      toAddOccurrences: [],
      contextOptions: [
        { name: 'Eliminar', slug: 'eliminar'},
        { name: 'Agregar', slug: 'agregar' }
      ]
    };
  },
  props: {
    isProcessing: {
      type: Boolean,
      default: false,
    },
    hasOccurrences: {
      type: Boolean,
      default: false
    },
    isLearning: {
      type: Boolean,
      default: false
    },
    text: {
      type: Object
    },
  },
  computed: {
    ...mapState(["template"]),
    ...mapGetters([ESSENTIAL_WORDS, GET_OCCURRENCE_BY_POSITION]),
    ...mapState("learn", ["addingWord"]),
    ...mapState("textContent", ["selected"]),
    tokens: { 
      get: function () {
        return this.mergeContentAndTokens(this.text);
      },
      set: function (tokens){
      }
    },
    menuOptions() {
      if(this.isEssentialWord(this.selected)) {
        return [
          { name: 'Eliminar', slug: 'delete' },
          { name: 'Visible / No visible', slug: 'mark-as-not-visible' },
          { name: 'Aprendida / No aprendida', slug: 'toggle-learned'}
        ]
      } else {
        return [
          { name: 'Agregar palabra', slug: 'add'}
        ]
      }
    }
  },
  methods: {
    mergeContentAndTokens(text) {
      const content = text.rawContent;
      if(content === undefined) return [];

      let tokens = this.tokenize(content);
      const splitted = tokens.flatMap((t, i) => {
        let start;
        let end = t.start;
  
        if (i === 0) {
          start = 0;
        } else {
          let previous = i - 1;
          start = tokens[previous].ending;
        }
  
        //Last token
        if (i === tokens.length - 1) {
          return [
            content.substring(start, end),
            t,
            content.substring(t.ending, content.length + 1),
          ];
        }

        //Any other token
        return [content.substring(start, end), t];
      });
      return splitted;
    },
    tokenize(content) {
      let tokens = [];
      const regex = /(?:(?![×Þß÷þø])[-'0-9a-zÀ-ÿ]+)|(\n+)/gi;
      let position = 0;
      for (const match of content.matchAll(regex)) {
        const newLine = match[1],
              word = match[0];
        const tokenData = {
          start: match.index,
          ending: match.index + word.length,
        };

        if (newLine) {
          tokens.push({
            ...tokenData,
            token: newLine,
            type: 'line-break'
          })
        } else {
          position++;
          const occurrence = {
            ...tokenData,
            word,
            type: 'word',
            position,
            isEssential: this.isEssentialWord(word),
            textId: this.text.textId
          };
          tokens.push(occurrence);
          if (occurrence.isEssential && this.isProcessing) {
            this.foundOccurrences.push(occurrence);
          } else if(!occurrence.isEssential) {
            this.toAddOccurrences.push(occurrence);
          }
        }
      }
      return tokens;
    },
    generateLineBreaks({ token }) {
      const textNode = [];
      for (let i = 0; i < token.length; i++) {
        textNode.push(<br />);
      }
      return textNode;
    },
    generateWord(token) {
      const { word, position, isEssential } = token;
      let occurrence = { position, word };
      
      if(isEssential) {
        
        if (this.isLearning) {
          occurrence = this[GET_OCCURRENCE_BY_POSITION](position);
        }
        
        return (
          <InlineWord
            occurrence={occurrence}
            vOn:contextmenu_prevent_stop_native={(event) => this.handleInlineWordClick(event, occurrence)}
          ></InlineWord>
        );
      }

      return (
        <ToAddWord
          occurrence={occurrence}
          vOn:contextmenu_prevent_stop_native={(event) => this.handleToAddWordClick(event, occurrence)}
        ></ToAddWord>
      );
    },
    isEssentialWord(word) {
      if(this.isProcessing) {
        return this.template.essentialWords.includes(word);
      } else if (this.text.status === "processed"){
        return this[ESSENTIAL_WORDS].includes(word);
      }
    },
    handleDeselect({ target, currentTarget}) {
      if(target === currentTarget) {
        this[DESELECT_INLINE_WORD]();
      }
    },
    handleInlineWordClick(event, item) {
      this[CHANGE_SELECTED_WORD](item.word);
      this.$refs.inlineWordContextMenu.showMenu(event, item);
    },
    handleToAddWordClick(event, item) {
      this[CHANGE_SELECTED_WORD](item.word);
      this.$refs.inlineWordContextMenu.showMenu(event, item);
    },
    onOptionClicked({item, option}) {
      const { word } = item
      console.log('option clicked');
      if(option.slug === 'add') {
        this.addSelectedOccurrence();
      } else if (option.slug === 'delete') {
        if (item.essential) return
        this.deleteOccurrencesByWord(word);
      } else if (option.slug === 'toggle-learned') {
        this.toggleIsLearned(word);
      }
    },
    async addSelectedOccurrence() {
      await this[ADD_USER_OCCURRENCE]();
      // TODO: Avoid reloading the page
      window.location.reload();
    },
    async deleteOccurrencesByWord(word) {
      await this[DELETE_USER_OCCURRENCES_BY_WORD](word);
      // TODO: Avoid reloading the page
      window.location.reload();
    },
    async toggleIsLearned(word) {
      await this[UPDATE_DICTIONARY](word);
    },
    ...mapActions("process", [SET_FOUND_OCCURRENCES]),
    ...mapActions("learn", [SET_TO_ADD_OCCURRENCES, ADD_USER_OCCURRENCE]),
    ...mapActions("textContent", [DESELECT_INLINE_WORD, CHANGE_SELECTED_WORD]),
    ...mapActions([DELETE_USER_OCCURRENCES_BY_WORD, UPDATE_DICTIONARY])
  },
  mounted() {
    if(this.isProcessing) {
      this[SET_FOUND_OCCURRENCES](this.foundOccurrences);
    }
    this[SET_TO_ADD_OCCURRENCES](this.toAddOccurrences);
  },
}
</script>

<style lang="scss">
$light-grey: #ecf0f1;
$grey: darken($light-grey, 15%);
$blue: #007aff;
$white: #fff;
$black: #333;
.vue-simple-context-menu {
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  display: none;
  list-style: none;
  position: absolute;
  z-index: 1000000;
  background-color: $light-grey;
  border-bottom-width: 0px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  box-shadow: 0 3px 6px 0 rgba($black, 0.2);
  border-radius: 4px;
  &--active {
    display: block;
  }
  &__item {
    display: flex;
    color: $black;
    cursor: pointer;
    padding: 3px 9px;
    align-items: center;
    font-size: 1.5rem;
    &:hover {
      background-color: $blue;
      color: $white;
    }
  }
  &__divider {
    height: 10px;
    background-color: $grey;
    padding: 4px 0;
    background-clip: content-box;
    pointer-events: none;
  }
  // Have to use the element so we can make use of `first-of-type` and
  // `last-of-type`
  li {
    &:first-of-type {
      margin-top: 4px;
    }
    &:last-of-type {
      margin-bottom: 4px;
    }
  }
}
</style>