import { CHECK_AUTHENTICATION, LOGIN, LOGOUT, REGISTER } from "../action-types";
import { IS_AUTHENTICATED } from "../getter-types";
import { SET_AUTH, SET_LOADING } from "../mutation-types";
import axios from "../axios";

const actions = {
  async [LOGIN]({ commit }, userData) {
    try {
      commit(SET_LOADING, true);
      const { data } = await axios.post("/api/auth", userData);
      commit(SET_AUTH, data);
    } catch (e) {
      return Promise.reject(e.response);
    } finally {
      commit(SET_LOADING, false);
    }
  },
  async [CHECK_AUTHENTICATION]({ commit }) {
    try {
      commit(SET_LOADING, true);
      const { data } = await axios.get("/api/auth/me");
      commit(SET_AUTH, data);
    } catch (e) {
      /* eslint-disable no-console */
      console.log(e);
    } finally {
      commit(SET_LOADING, false);
    }
  },
  async [REGISTER]({ commit }, userData) {
    try {
      commit(SET_LOADING, true);
      const { data } = await axios.post("/api/users", userData);
      return Promise.resolve(data);
    } catch (e) {
      return Promise.reject(e.response);
    } finally {
      commit(SET_LOADING, false);
    }
  },
  [LOGOUT]({ commit }) {
    return axios.get("/api/auth/logout").then((res) => {
      commit(LOGOUT);
      return res;
    });
  },
};

const mutations = {
  [SET_AUTH](state, data) {
    state.user = data.user;
    state.isAuthenticated = true;
  },
  [LOGOUT](state) {
    state.isAuthenticated = false;
    state.user = null;
  },
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
};

const state = () => ({
  isAuthenticated: false,
  loading: true,
  user: {},
});

const getters = {
  [IS_AUTHENTICATED]: (state) => {
    return state.isAuthenticated;
  },
};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
