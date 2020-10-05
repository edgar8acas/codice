/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";

import texts from "./modules/texts";
import learn from "./modules/learn";
import template from "./modules/template";
import meanings from "./modules/meanings";
import process from "./modules/process";
import textContent from "./modules/text-content";
import errors from "./modules/errors";

Vue.config.productionTip = false;
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    texts,
    learn,
    template,
    meanings,
    process,
    textContent,
    errors
  },
  state: {
    user: {
      admin: true,
    },
    development: false,
  },
  mutations: {
    setDefaultOccurrences(state) {
      state.occurrences.forEach((o) => {
        o.selectDefault();
      });
    },
    setSelectedForEveryOccurrence(state, occurrence) {
      state.occurrences.forEach((o) => {
        if (o.word === occurrence.word) {
          o.selectedWordId = occurrence.selectedWordId;
        }
      });
    },
    toggleUserType(state) {
      state.user.admin = !state.user.admin;
    },
  },
  actions: {
    setDefault({ commit }) {
      commit("setDefaultOccurrences");
    },
    setSelectedForEveryOccurrence({ commit }, occurrence) {
      commit("setSelectedForEveryOccurrence", occurrence);
    },
    /** Temporal action to change the user type, just for development purposes */
    toggleUserType({ commit }) {
      commit("toggleUserType");
    },
  },
});
