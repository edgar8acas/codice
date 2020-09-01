import { PROCESS_TEXT, SAVE_PROCESSED_TEXT } from "../action-types";
import {
  SET_OCCURRENCES,
  SET_MEANINGS,
  SET_TOKENIZED_TEXT,
} from "../mutation-types";

import { findOccurrencesInText } from "@/utils/template";
import { filterExclusiveWords } from "@/utils/filter_processed";
import axios from "../axios";

const actions = {
  async [PROCESS_TEXT]({ state, commit }, textId) {
    const {
      data: { essentialWords, availableWords, text },
    } = await axios.post(`/api/texts/${textId}/process`);

    const processed = state.options.lexicoExclusivo
      ? filterExclusiveWords(essentialWords)
      : essentialWords;
    const occurrences = findOccurrencesInText({ processed, text });
    commit(SET_OCCURRENCES, occurrences, { root: true });
    commit(SET_MEANINGS, availableWords, { root: true });
    commit(SET_TOKENIZED_TEXT, { occurrences, text }, { root: true });
  },
  async [SAVE_PROCESSED_TEXT]({ rootState }, textId) {
    try {
      await axios.post(`/api/texts/${textId}/process/save`, {
        occurrences: rootState.template.occurrences,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {};

const state = () => ({
  options: {
    lexicoExclusivo: false,
  },
});

const getters = {};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
