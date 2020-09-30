import { DELETE_ERROR, DELETE_SUCCESS, SET_ERROR, SET_SUCCESS } from "../action-types";

const actions = {
  [SET_ERROR] ({ commit }, error) {
    commit(SET_ERROR, error);
  },
  [SET_SUCCESS] ({ commit }, success) {
    commit(SET_SUCCESS, success);
  },
  [DELETE_ERROR] ({ commit }) {
    commit(DELETE_ERROR);
  },
  [DELETE_SUCCESS] ({ commit }) {
    commit(DELETE_SUCCESS);
  },
};

const mutations = {
  [SET_ERROR] (state, error) {
    state.error = error;
  },
  [SET_SUCCESS] (state, success) {
    state.success = success;
  },
  [DELETE_ERROR] (state) {
    state.error = null;
  },
  [DELETE_SUCCESS] (state) {
    state.success = null;
  },
};

const state = () => ({
  error: null,
  success: null
});

export default {
  actions,
  mutations,
  state
};
