import { GET_DATA_FOR_LEARNING, ADD_USER_OCCURRENCE } from "../action-types";
import {
  SET_OCCURRENCES,
  SET_MEANINGS,
  SET_DICTIONARY,
  SET_CURRENT_TEXT,
  SET_TOKENIZED_TEXT,
} from "../mutation-types";
import { generateOccurrences } from "@/utils/template";
import axios from "./../axios";

const actions = {
  async [GET_DATA_FOR_LEARNING]({ commit }, textId) {
    const {
      data: { dictionaryWords, text, userOccurrences, availableWords },
    } = await axios.get(`/api/templates/?text=${textId}&user=${1}`);

    const occurrences = generateOccurrences({
      occurrences: userOccurrences,
      dictionaryWords,
    });

    commit(SET_OCCURRENCES, occurrences, { root: true });
    commit(SET_MEANINGS, availableWords, { root: true });
    commit(SET_DICTIONARY, dictionaryWords, { root: true });
    commit(SET_CURRENT_TEXT, text);
    commit(SET_TOKENIZED_TEXT, { occurrences, text }, { root: true });
  },
  async [ADD_USER_OCCURRENCE]({ commit, dispatch }, occurrenceInfo) {
    try {
      const { data } = await axios.post(
        `/api/user-occurrences/`,
        occurrenceInfo
      );
      await dispatch("getTemplateByTextId", data.textId);
    } catch (error) {
      if (error.response) {
        commit("addError", error.response.data.error);
      }
    }
  },
};

const mutations = {
  [SET_CURRENT_TEXT](state, text) {
    state.text = text;
  },
};

const state = () => ({});

export default {
  namespaced: true,
  actions,
  mutations,
  state,
};
