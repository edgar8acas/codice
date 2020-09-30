import { SET_FETCHED_TEXTS, ADD_TEXT, GET_TEXT_BY_ID, SET_SUCCESS, SET_ERROR } from "../action-types";
import { SET_TEXTS, ADD_OR_REPLACE_TEXT } from "../mutation-types";
import axios from "./../axios";

const actions = {
  [SET_FETCHED_TEXTS]({ commit }, payload) {
    //CatalogTable makes the api call
    commit(SET_TEXTS, payload);
  },
  async [ADD_TEXT]({ commit }, text) {
    try {
      const res = await axios.post("/api/texts/", text);
      commit(SET_SUCCESS, res);
    } catch (error) {
      commit(SET_ERROR)
      return new Promise.reject(new Error('Algo salió mal...'));
    }
  },
  async [GET_TEXT_BY_ID]({ commit }, id) {
    try {
      const { data } = await axios.get(`/api/texts/${id}`);
      commit(ADD_OR_REPLACE_TEXT, data);
    } catch (error) {
      console.log(error.response.data.error);
    }
  },
};

const mutations = {
  [SET_TEXTS](state, texts) {
    state.texts = texts;
  },
  [ADD_OR_REPLACE_TEXT](state, text) {
    const index = state.texts.findIndex((t) => t.textId === text.textId);
    if (index !== -1) {
      state.texts[index] = text;
    } else {
      state.texts.push(text);
    }
  },
};

const state = () => ({
  texts: [],
});

export default {
  namespaced: true,
  actions,
  mutations,
  state,
};
