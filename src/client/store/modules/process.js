import { 
  PROCESS_TEXT,
  SAVE_PROCESSED_TEXT,
  SET_FOUND_OCCURRENCES
} from "../action-types";
import {
  SET_ESSENTIAL_WORDS,
  SET_MEANINGS
} from "../mutation-types";

import { filterExclusiveWords } from "@/utils/filter_processed";
import axios from "../axios";

const actions = {
  async [PROCESS_TEXT]({ state, commit }, textId) {
    const {
      data: { essentialWords, availableMeanings },
    } = await axios.post(`/api/texts/${textId}/process`);

    const processed = state.options.lexicoExclusivo
      ? filterExclusiveWords(essentialWords)
      : essentialWords;
    commit(SET_ESSENTIAL_WORDS, processed, { root: true });
    commit(SET_MEANINGS, availableMeanings, { root: true });
  },
  async [SAVE_PROCESSED_TEXT]({ state }, textId) {
    try {
      await axios.post(`/api/texts/${textId}/process/save`, {
        occurrences: state.foundOccurrences
      });
    } catch (error) {
      console.log(error);
    }
  },
  [SET_FOUND_OCCURRENCES] ({ commit }, occurrences) {
    commit(SET_FOUND_OCCURRENCES, occurrences);
  }
};

const mutations = {
  [SET_FOUND_OCCURRENCES] (state, occurrences) {
    state.foundOccurrences = occurrences;
  }
};

const state = () => ({
  options: {
    lexicoExclusivo: false,
  },
  foundOccurrences: []
});

const getters = {};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
