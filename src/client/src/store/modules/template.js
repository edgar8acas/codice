import {
  GET_TEMPLATE_DATA,
  UPDATE_OCCURRENCE,
  UPDATE_DICTIONARY,
  DELETE_USER_OCCURRENCE,
} from "../action-types";
import {
  SET_TOKENIZED_TEXT,
  SET_OCCURRENCES,
  SET_MEANINGS,
  SET_DICTIONARY,
  DELETE_TEMPLATE_STATE,
  REPLACE_OCCURRENCE_WITH_UPDATED,
  REPLACE_DICTIONARY_WITH_UPDATED,
} from "../mutation-types";
import { GET_DICTIONARY_BY_WORD_ID } from "../getter-types";

import axios from "./../axios";
import { getTokenizedContent, generateOccurrences } from "@/utils/template";
import UserOccurrence from "@/utils/user_occurrence";
import DictionaryWord from "@/utils/dictionary_word";

const actions = {
  async [GET_TEMPLATE_DATA]({ commit }, text) {
    commit(DELETE_TEMPLATE_STATE);

    const {
      data: { templateOccurrences, availableWords },
    } = await axios.get(`/api/templates/?text=${text.textId}`);

    const occurrences = generateOccurrences({
      occurrences: templateOccurrences,
      template: true,
    });

    commit(SET_OCCURRENCES, occurrences);
    commit(SET_MEANINGS, availableWords, { root: true });
    commit(SET_TOKENIZED_TEXT, { occurrences, text });
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
  [SET_TOKENIZED_TEXT](state, { occurrences, text, update = false }) {
    state.tokenizedText = getTokenizedContent({
      ocurrences: update ? state.occurrences : occurrences,
      text: update ? state.currentTemplateText : text,
    });
  },
  [SET_OCCURRENCES](state, occurrences) {
    state.occurrences = occurrences;
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
  dictionary: [],
});

const getters = {
  [GET_DICTIONARY_BY_WORD_ID]: (state) => (wordId) => {
    return state.dictionary.find((w) => w.wordId === wordId);
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
