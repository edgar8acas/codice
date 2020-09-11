import {
  GET_TEMPLATE_DATA,
  UPDATE_OCCURRENCE,
  UPDATE_DICTIONARY,
  DELETE_USER_OCCURRENCE,
} from "../action-types";
import {
  SET_TOKENIZED_TEXT,
  SET_OCCURRENCES,
  SET_ESSENTIAL_WORDS,
  SET_MEANINGS,
  SET_DICTIONARY,
  DELETE_TEMPLATE_STATE,
  REPLACE_OCCURRENCE_WITH_UPDATED,
  REPLACE_DICTIONARY_WITH_UPDATED,
} from "../mutation-types";
import { 
  GET_DICTIONARY_BY_WORD_ID,
  ESSENTIAL_WORDS,
  GET_OCCURRENCE_BY_POSITION
} from "../getter-types";

import axios from "./../axios";
import UserOccurrence from "@/utils/user_occurrence";
import DictionaryWord from "@/utils/dictionary_word";

const actions = {
  async [GET_TEMPLATE_DATA]({ commit }, text) {
    commit(DELETE_TEMPLATE_STATE);

    const {
      data: { availableWords, templateOccurrences },
    } = await axios.get(`/api/templates/?text=${text.textId}`);

    commit(SET_OCCURRENCES, templateOccurrences);
    commit(SET_MEANINGS, availableWords, { root: true });
  },
  async [UPDATE_OCCURRENCE]({ commit }, occurrence) {
    try {
      const {
        data: { updated, dictionary },
      } = await axios.put(
        `/api/user-occurrences/${occurrence.userOccurrenceId}/update-selected`,
        occurrence
      );

      commit(REPLACE_OCCURRENCE_WITH_UPDATED, updated);
      commit(REPLACE_DICTIONARY_WITH_UPDATED, dictionary);
      commit(SET_TOKENIZED_TEXT, { update: true });
    } catch (error) {
      if (error.response) {
        commit("addError", error.response.data.error);
      }
    }
  },
  async [UPDATE_DICTIONARY]({ commit }, dictionaryWord) {
    const { data: updated } = await axios.put(
      `/api/dictionary-words/`,
      dictionaryWord
    );
    commit(REPLACE_DICTIONARY_WITH_UPDATED, updated);
  },
  async [DELETE_USER_OCCURRENCE](ctx, id) {
    try {
      await axios.delete(`/api/user-occurrences/${id}`);
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  [SET_OCCURRENCES](state, occurrences) {
    state.occurrences = occurrences;
  },
  [SET_ESSENTIAL_WORDS](state, essentialWords) {
    state.essentialWords = essentialWords;
  },
  [SET_DICTIONARY](state, dictionary) {
    state.dictionary = dictionary.map((w) => {
      return new DictionaryWord(w);
    });
  },
  [REPLACE_OCCURRENCE_WITH_UPDATED](state, updated) {
    let index = state.occurrences.findIndex((o) => o.start === updated.start);
    if (index !== -1) {
      state.occurrences[index] = new UserOccurrence(updated);
    }
  },
  [REPLACE_DICTIONARY_WITH_UPDATED](state, updated) {
    let index = state.dictionary.findIndex(
      (w) => w.dictionaryId === updated.dictionaryId
    );
    if (index !== -1) {
      state.dictionary[index] = new DictionaryWord(updated);
    } else {
      state.dictionary.push(new DictionaryWord(updated));
    }
  },
  [DELETE_TEMPLATE_STATE](state) {
    state.tokenizedText = [];
    state.occurrences = [];
  },
};

const state = () => ({
  tokenizedText: [],
  occurrences: [],
  essentialWords: [],
  dictionary: [],
  text: {}
});

const getters = {
  [GET_DICTIONARY_BY_WORD_ID]: (state) => (word) => {
    return state.dictionary.find((d) => {
      return d.word === word
    });
  },
  [ESSENTIAL_WORDS]: (state, getters, rootState) => {
    return Object.keys(rootState.meanings.meanings);
  },
  [GET_OCCURRENCE_BY_POSITION]: (state) => (position) => {
    return state.occurrences.find((o) => {
      return o.positionInText === position
    });
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
