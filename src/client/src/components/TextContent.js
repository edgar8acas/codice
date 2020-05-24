import Vue from 'vue';
import { 
  markEssentialWords,
  splitTemplate
} from '@/utils/template';

import InlineWord from '@/components/InlineWord';
export default Vue.component('text-content', {
  render: function(h) {
    let reg = /<span.*>(.*)<\/span>/i;
    const children = this.template.content.map(chunk => {
      let regexResult = reg.exec(chunk)
      if (regexResult) {
        return h(InlineWord, {
          props: {
            word: regexResult[1]
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
    const { words, text } = this.currentTemplate;
    this.template.content = splitTemplate(markEssentialWords(text.rawContent, words));
  },
  computed: {
    currentTemplate() {
      return this.$store.state.currentTemplate;
    }
  }
})