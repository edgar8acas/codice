import Vue from 'vue';
import { mapState } from 'vuex';
import Occurrence from '@/utils/occurrence';
import UserOccurrence from '@/utils/user_occurrence';
import InlineWord from '@/components/InlineWord';

export default Vue.component('text-content', {
  render: function(h) {

    const children = this.tokenizedContent.map(chunk => {

      if (typeof chunk === 'string') return chunk;
      if ((chunk instanceof Occurrence || chunk instanceof UserOccurrence) && chunk.textId !== undefined) {
        return h(InlineWord, {
          props: {
            occurrence: chunk
          },
          on: {
            changeOccurrence: this.changeOccurrence
          }
        });
      }
      return h('br')
    });

    return h('p', children);
  },
  data() {
    return {
      content: []
    }
  },
  props: {
    isChoosing: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState([
      'tokenizedContent'
    ])
  },
  methods: {
    changeOccurrence(start) {
      this.$emit('changeOccurrence', start);
    }
  }
})