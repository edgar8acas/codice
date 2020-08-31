import { GET_MEANINGS_BY_WORD } from "./../store/getter-types";
import { mapGetters} from "vuex";

export const wordMeanings = {
  data() {
    return {
    }
  },
  props: {
    occurrence: {
      type: Object,
      required: true,
      default: function () {
        return {};
      },
    },
  },
  computed: {
    ...mapGetters([GET_MEANINGS_BY_WORD]),
    meanings() {
      return this[GET_MEANINGS_BY_WORD](this.occurrence.word);
    },
  }
}