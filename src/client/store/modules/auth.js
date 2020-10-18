import { CHECK_AUTHENTICATION, LOGIN, LOGOUT } from "../action-types";
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
      console.log(e);
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
      console.log(e);
    } finally {
      commit(SET_LOADING, false);
    }
  },
  [LOGOUT]({ commit }) {
    commit(LOGOUT);
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
    return Promise.resolve();
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
