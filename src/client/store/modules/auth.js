import { LOGIN, LOGOUT } from "../action-types";
import { IS_AUTHENTICATED } from "../getter-types";
import { SET_AUTH } from "../mutation-types";

const actions = {
  [LOGIN]({ commit }) {
    commit(SET_AUTH);
  },
  [LOGOUT]({ commit }) {
    commit(LOGOUT);
  },
};

const mutations = {
  [SET_AUTH](state) {
    state.user.isAuthenticated = true;
  },
  [LOGOUT](state) {
    state.user.isAuthenticated = false;
    return Promise.resolve();
  },
};

const state = () => ({
  user: {
    isAuthenticated: false,
  },
});

const getters = {
  [IS_AUTHENTICATED]: (state) => {
    return state.user.isAuthenticated;
  },
};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
