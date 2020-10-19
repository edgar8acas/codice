import {
  GET_DATA_FOR_LEARNING,
  ADD_USER_OCCURRENCE,
  TOGGLE_ADDING_WORD,
  SET_TO_ADD_OCCURRENCES,
} from "../action-types";
import {
  SET_OCCURRENCES,
  SET_MEANINGS,
  SET_DICTIONARY,
  SET_CURRENT_TEXT,
} from "../mutation-types";
import axios from "./../axios";

const actions = {
  async [GET_DATA_FOR_LEARNING]({ commit, rootState }, textId) {
    const {
      data: { dictionaryWords, text, userOccurrences, availableWords },
    } = await axios.get(
      `/api/templates/?text=${textId}&user=${rootState.auth.user.userId}`
    );

    commit(SET_OCCURRENCES, userOccurrences, { root: true });
    commit(SET_MEANINGS, availableWords, { root: true });
    commit(SET_DICTIONARY, dictionaryWords, { root: true });
    commit(SET_CURRENT_TEXT, text);
  },
  async [ADD_USER_OCCURRENCE]({ commit, dispatch, state, rootState }) {
    try {
      const occurrences = state.toAddOccurrences.filter(
        (o) => o.word.toLowerCase() === rootState.textContent.selected
      );
      const { data } = await axios.post(`/api/user-occurrences/`, {
        occurrences,
      });
      await dispatch("getTemplateByTextId", data.textId);
    } catch (error) {
      if (error.response) {
        commit("addError", error.response.data.error);
      }
    }
  },
  [TOGGLE_ADDING_WORD]({ commit }) {
    commit(TOGGLE_ADDING_WORD);
  },
  [SET_TO_ADD_OCCURRENCES]({ commit }, occurrences) {
    commit(SET_TO_ADD_OCCURRENCES, occurrences);
  },
};

const mutations = {
  [SET_CURRENT_TEXT](state, text) {
    state.text = text;
  },
  [TOGGLE_ADDING_WORD](state) {
    state.addingWord = !state.addingWord;
  },
  [SET_TO_ADD_OCCURRENCES](state, occurrences) {
    state.toAddOccurrences = occurrences;
  },
};

const state = () => ({
  addingWord: true,
  selectedToAdd: "",
  toAddOccurrences: [],
});

export default {
  namespaced: true,
  actions,
  mutations,
  state,
};
