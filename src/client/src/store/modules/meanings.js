import {
  GET_MEANINGS_FOR_WORD,
  SAVE_MEANING,
  DELETE_MEANING,
} from "../action-types";
import {
  SET_MEANINGS,
  UPDATE_MEANINGS_FOR_WORD,
  ADD_MEANING_FOR_WORD,
  DELETE_MEANING_FOR_WORD,
} from "../mutation-types";
import { GET_MEANINGS_BY_WORD } from "../getter-types";

import axios from "./../axios";

const actions = {
  async [GET_MEANINGS_FOR_WORD]({ commit }, occurrence) {
    try {
      const {
        data: { data: words },
      } = await axios.get(`/api/words/?word=${occurrence.word}`);
      commit(UPDATE_MEANINGS_FOR_WORD, words);
    } catch (error) {
      console.log(error);
    }
  },
  async [SAVE_MEANING]({ commit }, word) {
    const { data } = await axios.post(`/api/words`, word);
    commit(ADD_MEANING_FOR_WORD, data);
  },
  async [DELETE_MEANING]({ commit }, word) {
    try {
      await axios.delete(`/api/words/${word.wordId}`);
      commit(DELETE_MEANING_FOR_WORD, word);
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  [SET_MEANINGS](state, meanings) {
    state.meanings = meanings;
  },
  [UPDATE_MEANINGS_FOR_WORD](state, meanings) {
    if (meanings[0]) {
      state.meanings[meanings[0].word] = meanings;
    }
  },
  [ADD_MEANING_FOR_WORD](state, word) {
    state.meanings[word.word].push(word);
  },
  [DELETE_MEANING_FOR_WORD](state, word) {
    const index = state.meanings[word.word].findIndex(
      (w) => w.wordId === word.wordId
    );
    state.meanings[word.word].splice(index, 1);
  },
};

const state = () => ({
  meanings: [],
});

const getters = {
  [GET_MEANINGS_BY_WORD]: (state) => (word) => {
    return state.meanings[word] || [];
  },
};

export default {
  actions,
  mutations,
  state,
  getters,
};
