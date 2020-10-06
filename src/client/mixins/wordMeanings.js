import { GET_MEANINGS_BY_WORD } from "./../store/getter-types";
import { mapGetters, mapState} from "vuex";

export const wordMeanings = {
  data() {
    return {
    }
  },
  props: {},
  computed: {
    ...mapGetters([GET_MEANINGS_BY_WORD]),
    ...mapState("textContent", ["selected"]),
    meanings() {
      return this[GET_MEANINGS_BY_WORD](this.selected);
    },
  }
}