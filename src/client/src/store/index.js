/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import {
  getTokenizedContent,
  findOccurrencesInText,
  generateOccurrences,
} from "@/utils/template";
import UserOccurrence from "@/utils/user_occurrence";
import DictionaryWord from "@/utils/dictionary_word";
import getExclusiveWords from "@/utils/filter_processed";

Vue.config.productionTip = false;

const axios = Axios.create({
  baseURL: "http://localhost:3000",
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      admin: true,
    },
    texts: [],
    tokenizedContent: [],
    occurrences: [],
    availableWords: {},
    dictionary: [],
    exclusivo: false,
    errors: [],
    success: [],
    currentTemplateText: {},
    development: true,
  },
  mutations: {
    setTexts(state, texts) {
      state.texts = texts;
    },
    setOccurrences(state, occurrences) {
      state.occurrences = occurrences;
    },
    setAvailableWords(state, availableWords) {
      state.availableWords = availableWords;
    },
    removeAvailableWords(state) {
      state.availableWords = [];
    },
    setTokenizedContent(state, { occurrences, text, update = false }) {
      const tokenizedContent = getTokenizedContent({
        ocurrences: update ? state.occurrences : occurrences,
        text: update ? state.currentTemplateText : text,
      });
      state.tokenizedContent = tokenizedContent;
    },
    resetTokenizedContent(state) {
      state.tokenizedContent = [];
    },
    setCurrentTemplateText(state, text) {
      state.currentTemplateText = text;
    },
    setDictionary(state, dictionaryWords) {
      state.dictionary = dictionaryWords.map((w) => {
        return new DictionaryWord(w);
      });
    },
    removeDictionary(state) {
      state.dictionary = [];
    },
    updateSelectedWord(state, updated) {
      let index = state.occurrences.findIndex((o) => o.start === updated.start);
      if (index !== -1) {
        state.occurrences[index] = new UserOccurrence(updated);
      }
    },
    updateMarkedStatus(state, { occurrenceStart, markedStatus }) {
      let ocurrence = state.occurrences.find(
        (o) => o.start === occurrenceStart
      );
      ocurrence.markedStatus = markedStatus;
    },
    addRelatedWord(state, word) {
      state.availableWords[word.word].push(word);
    },
    deleteRelatedWord(state, word) {
      const index = state.availableWords[word.word].findIndex(
        (w) => w.wordId === word.wordId
      );
      state.availableWords[word.word].splice(index, 1);
    },
    addRelatedWords(state, words) {
      if (words[0]) {
        state.availableWords[words[0].word] = words;
      }
    },
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
    updateDictionaryWord(state, updated) {
      let index = state.dictionary.findIndex(
        (w) => w.dictionaryId === updated.dictionaryId
      );
      if (index !== -1) {
        state.dictionary[index] = new DictionaryWord(updated);
      } else {
        state.dictionary.push(new DictionaryWord(updated));
      }
    },
    setOnlyExclusive(state, value) {
      state.exclusivo = value;
    },
    addError(state, error) {
      state.errors = [error];
    },
    addSuccess(state, data) {
      state.success = [data];
    },
    toggleUserType(state) {
      state.user.admin = !state.user.admin;
    },
  },
  actions: {
    saveOccurrences({ state }, textId) {
      return axios
        .post(`/api/texts/${textId}/process/save`, {
          occurrences: state.occurrences,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    setTexts({ commit }, texts) {
      commit("setTexts", texts);
    },
    async processText({ state, commit }, textId) {
      commit("removeAvailableWords");
      const res = await axios.post(`/api/texts/${textId}/process`);
      let processed = state.exclusivo ? getExclusiveWords(res.data) : res.data;
      const occurrences = findOccurrencesInText(processed);
      commit("setOccurrences", occurrences);
      commit("setAvailableWords", res.data.availableWords);
      commit("setTokenizedContent", { occurrences, text: res.data.text });
    },
    async updateSelectedWord({ commit }, occurrence) {
      try {
        const {
          data: { updated, dictionaryWord },
        } = await axios.put(
          `/api/user-occurrences/${occurrence.userOccurrenceId}/update-selected`,
          occurrence
        );

        commit("updateSelectedWord", updated);
        commit("setTokenizedContent", { update: true });
        commit("updateDictionaryWord", dictionaryWord);
        //commit('addSuccess', data)
      } catch (error) {
        if (error.response) {
          commit("addError", error.response.data.error);
        }
      }
    },
    async saveWord({ commit }, word) {
      const { data } = await axios.post(`/api/words`, word);
      commit("addRelatedWord", data);
    },
    setDefault({ commit }) {
      commit("setDefaultOccurrences");
    },
    setSelectedForEveryOccurrence({ commit }, occurrence) {
      commit("setSelectedForEveryOccurrence", occurrence);
    },
    async getDataForLearning({ commit }, textId) {
      commit("removeAvailableWords");
      // TODO: reset dictionary
      commit("removeDictionary");
      const {
        data: { dictionaryWords, text, userOccurrences, availableWords },
      } = await axios.get(`/api/templates/?text=${textId}&user=${1}`);

      const occurrences = generateOccurrences({
        occurrences: userOccurrences,
        dictionaryWords,
      });

      commit("setOccurrences", occurrences);
      commit("setAvailableWords", availableWords);
      commit("setDictionary", dictionaryWords);
      commit("setCurrentTemplateText", text);
      commit("setTokenizedContent", { occurrences, text });
    },
    async getDataForTextDetails({ commit }, text) {
      commit("resetTokenizedContent");

      const {
        data: { templateOccurrences, availableWords },
      } = await axios.get(`/api/templates/?text=${text.textId}`);

      const occurrences = generateOccurrences({
        occurrences: templateOccurrences,
        template: true,
      });
      commit("setOccurrences", occurrences);
      commit("setAvailableWords", availableWords);
      commit("setTokenizedContent", { occurrences, text });
    },
    async updateDictionaryWord({ commit }, dictionaryWord) {
      const { data: updated } = await axios.put(
        `/api/dictionary-words/`,
        dictionaryWord
      );
      commit("updateDictionaryWord", updated);
    },
    setProcessingOptions({ commit }, value) {
      commit("setOnlyExclusive", value);
    },
    addText({ commit }, text) {
      return axios
        .post(`/api/texts/`, text)
        .then((data) => {
          console.log(data);
          commit("addSuccess", data);
        })
        .catch((error) => {
          if (error.response) {
            commit("addError", error.response.data.error);
          }
        });
    },
    async deleteRelatedWord({ commit }, word) {
      try {
        const { data } = await axios.delete(`/api/words/${word.wordId}`);
        commit("deleteRelatedWord", word);
        commit("addSuccess", data);
      } catch (error) {
        if (error.response) {
          commit("addError", error.response.data.error);
        }
      }
    },
    async getRelatedWords({ commit }, occurrence) {
      try {
        const {
          data: { data: words },
        } = await axios.get(`/api/words/?word=${occurrence.word}`);
        commit("addRelatedWords", words);
      } catch (error) {
        if (error.response) {
          commit("addError", error.response.data.error);
        }
      }
    },
    async addNewOccurrence({ commit, dispatch }, occurrenceInfo) {
      try {
        const { data } = await axios.post(
          `/api/user-occurrences/`,
          occurrenceInfo
        );
        await dispatch("getTemplateByTextId", data.textId);
      } catch (error) {
        if (error.response) {
          commit("addError", error.response.data.error);
        }
      }
    },
    async deleteOccurrence({ commit }, id) {
      try {
        const res = await axios.delete(`/api/user-occurrences/${id}`);
        commit("any");
      } catch (error) {
        if (error.response) {
          commit("addError", error.response.data.error);
        }
      }
    },
    /** Temporal action to change the user type, just for development purposes */
    toggleUserType({ commit }) {
      commit("toggleUserType");
    },
  },
  getters: {
    learntWords(state) {
      return state.dictionary.filter((dw) => dw.isLearned);
    },
    unlearntWords(state) {
      return state.dictionary.filter((dw) => !dw.isLearned);
    },
    availableMeaningsByWord: (state) => (word) => {
      return state.availableWords[word] || [];
    },
    getDictionaryWordByWordId: (state) => (wordId) => {
      return state.dictionary.find((w) => w.wordId === wordId);
    },
  },
  modules: {},
});
