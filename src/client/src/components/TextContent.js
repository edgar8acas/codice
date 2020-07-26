import Vue from "vue";
import { mapState } from "vuex";
import Occurrence from "@/utils/occurrence";
import UserOccurrence from "@/utils/user_occurrence";
import InlineWord from "@/components/InlineWord";

export default Vue.component("text-content", {
  render: function (h) {
    const children = this.tokenizedContent.map((chunk) => {
      if (typeof chunk === "string") return chunk;
      if (
        (chunk instanceof Occurrence || chunk instanceof UserOccurrence) &&
        chunk.textId !== undefined
      ) {
        return h(InlineWord, {
          props: {
            occurrence: chunk,
          },
          on: {
            changeOccurrence: this.changeOccurrence,
          },
        });
      }
      /*const breakLinesCount = chunk.ending - chunk.start;
      let breakLines = [];
      for (let i = 0; i < breakLinesCount; i++) {
        breakLines.push(h('br'))
      }
      return breakLines;*/
      return h("br");
    });

    return h("p", children);
  },
  data() {
    return {};
  },
  props: {
    isChoosing: {
      type: Boolean,
      default: false,
    },
    filterOptions: {
      availableMeanings: true,
      noAvailableMeanings: true,
    },
    current: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapState(["tokenizedContent"]),
  },
  methods: {
    changeOccurrence(start) {
      this.$emit("changeOccurrence", start);
    },
  },
  watch: {
    current(oldVal, newVal) {
      if(oldVal) oldVal.toggleCurrent();
      newVal.toggleCurrent();
    } 
  }
});
