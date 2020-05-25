import Vue from 'vue';
import { mapState } from 'vuex';
import { 
  markEssentialWords,
  splitTemplate
} from '@/utils/template';

import InlineWord from '@/components/InlineWord';
export default Vue.component('text-content', {
  render: function(h) {
    let wordRegex = /<span.*>(.*)<\/span>/i;
    let attribRegex = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/gi;

    const children = this.template.content.map(chunk => {
      let word = wordRegex.exec(chunk);
      let attributes = [...chunk.matchAll(attribRegex)];

      if (word) {
        return h(InlineWord, {
          props: {
            word: word[1],
            wordId: attributes[1][2].substring(1)
          },
          attrs: {
            [attributes[0][1]]: attributes[0][2],
            [attributes[1][1]]: attributes[1][2],
          },
          on: {
            mouseover: this.showWordInfo
          }
        });
      }
      return chunk;
    });
    return h('p', children);
  },
  data() {
    return {
      template: {
        content: ''
      }
    }
  },
  props: {
    any: String
  },
  created() {
    this.template.content = 
    splitTemplate(
      markEssentialWords(
        this.currentTemplateText.rawContent, [...this.currentTemplateWords]
        ));
  },
  computed: {
    ...mapState(['currentTemplateWords', 'currentTemplateText'])
  },
  methods: {
    showWordInfo(wordId) {
      this.$emit('showWordInfo', wordId)
    }
  }
})