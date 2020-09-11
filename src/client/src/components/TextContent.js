import Vue from "vue";
import InlineWord from "@/components/InlineWord";
import ToAddWord from "@/components/ToAddWord";

import { mapState, mapActions, mapGetters } from "vuex";
import { SET_FOUND_OCCURRENCES, SET_TO_ADD_OCCURRENCES, DESELECT_INLINE_WORD, DESELECT_TO_ADD_WORD } from "../store/action-types";
import { ESSENTIAL_WORDS, GET_OCCURRENCE_BY_POSITION } from "../store/getter-types";

export default Vue.component("text-content", {
  /* eslint-disable no-unused-vars */
  render: function (h) {
    return (
      <p onClick={(e) => this.handleDeselect(e)}>{
        this.tokens.map(t => {
          if(typeof t === 'object') {
            if(t.type === 'line-break') {
              return this.generateLineBreaks(t.token);
            } else {
              return this.generateWord(t);
            }
          }
          return t;
        })
      }</p>
    );
  },
  data() {
    return {
      tokens: [],
      foundOccurrences: [],
      toAddOccurrences: []
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
  },
  methods: {
    mergeContentAndTokens(text) {
      const content = text.rawContent;
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
            token: word,
            type: 'word',
            position,
            isEssential: this.isEssentialWord(word),
            textId: this.text.textId
          };
          tokens.push(occurrence);
          if (occurrence.isEssential && this.isProcessing) {
            this.foundOccurrences.push(occurrence);
          }
          if (this.addingWord) {
            this.toAddOccurrences.push(occurrence)
          }
        }
      }
      return tokens;
    },
    generateLineBreaks(token) {
      const textNode = [];
      for (let i = 0; i < token.length; i++) {
        textNode.push(<br />);
      }
      return textNode;
    },
    generateWord(token) {
      const word = token.token
      let element = <span>{word}</span>;

      if(this.addingWord) {
        element = <ToAddWord position={token.position} word={word}></ToAddWord>
      }

      if(token.isEssential) {
        let occurrence = {
          position: token.position,
          word: word
        }
        if (this.isLearning) {
          occurrence = this[GET_OCCURRENCE_BY_POSITION](token.position);
        }
        element = <InlineWord
                    occurrence={occurrence}
                  ></InlineWord>
      }
      return element;
    },
    isEssentialWord(word) {
      if(this.isProcessing) {
        return this.template.essentialWords.includes(word);
      } else if (this.text.status === "processed"){
        return this[ESSENTIAL_WORDS].includes(word);
      }
    },
    handleDeselect(e) {
      if(e.target === e.currentTarget) {
        this[DESELECT_INLINE_WORD]();
        this[DESELECT_TO_ADD_WORD]();
      }
    },
    ...mapActions("process", [SET_FOUND_OCCURRENCES]),
    ...mapActions("learn", [SET_TO_ADD_OCCURRENCES, DESELECT_TO_ADD_WORD]),
    ...mapActions("textContent", [DESELECT_INLINE_WORD]),
  },
  mounted() {
    this.tokens = this.mergeContentAndTokens(this.text);
    if(this.isProcessing) {
      this[SET_FOUND_OCCURRENCES](this.foundOccurrences);
    }
    if(this.addingWord) {
      this[SET_TO_ADD_OCCURRENCES](this.toAddOccurrences);
    }
  }
});
