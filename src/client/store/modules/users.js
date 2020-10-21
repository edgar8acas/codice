import { SET_SUCCESS, UPDATE_USER } from "../action-types";
import axios from "../axios";

const actions = {
  async [UPDATE_USER]({ commit }, user) {
    try {
      const { data } = await axios.put(`/api/users/${user.userId}`, user);
      commit(SET_SUCCESS, data);
    } catch (error) {
      return Promise.reject(new Error("Algo salió mal..."));
    }
  },
};

const mutations = {};

export default {
  namespaced: true,
  actions,
  mutations,
};
