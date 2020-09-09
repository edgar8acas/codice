import {
  CHANGE_SELECTED_INLINE_WORD
} from "../action-types";

const actions = {
  [CHANGE_SELECTED_INLINE_WORD] ({ commit }, selected) {
    commit(CHANGE_SELECTED_INLINE_WORD, selected);
  }
};

const mutations = {
  [CHANGE_SELECTED_INLINE_WORD] (state, selected) {
    state.selected = selected;
  }
};

const state = () => ({
  selected: ''
});

const getters = {};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};
