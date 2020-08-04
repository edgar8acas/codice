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
    dictionaryWords: [],
    exclusivo: false,
    errors: [],
    success: [],
    currentTemplateText: {},
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
    resetAvailableWords(state) {
      state.availableWords = [];
    },
    setTokenizedContent(state, tokens) {
      state.tokenizedContent = tokens;
    },
    resetTokenizedContent(state) {
      state.tokenizedContent = [];
    },
    setCurrentTemplateText(state, text) {
      state.currentTemplateText = text;
    },
    setDictionaryWords(state, dictionaryWords) {
      state.dictionaryWords = dictionaryWords;
    },
    updateSelectedWord(state, updated) {
      let index = state.occurrences.findIndex((o) => o.start === updated.start);
      if (index !== -1) {
        state.occurrences[index] = new UserOccurrence(updated);
      }
      console.log(state.occurrences[index]);
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
      console.log(words);

      if (words[0]) {
        console.log("addRelatedWords");
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
    changeLearntStatus(state, dictionaryWord) {
      let dw = state.dictionaryWords.find(
        (dw) => dw.dictionaryId === dictionaryWord.dictionaryId
      );
      console.log(dw);
      dw = Object.assign({}, dictionaryWord);
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
      commit("resetAvailableWords");
      const res = await axios.post(`/api/texts/${textId}/process`);
      let processed = state.exclusivo ? getExclusiveWords(res.data) : res.data;
      const occurrences = findOccurrencesInText(processed);
      commit("setOccurrences", occurrences);
      commit("setAvailableWords", res.data.availableWords);
      const tokenizedContent = getTokenizedContent(occurrences, res.data.text);
      commit("setTokenizedContent", tokenizedContent);
    },
    async updateSelectedWord({ commit }, occurrence) {
      try {
        const {
          data: { updated, matchingWords },
        } = await axios.put(
          `/api/user-occurrences/${occurrence.userOccurrenceId}/update-selected`,
          occurrence
        );

        commit("updateSelectedWord", updated);
        //commit("addRelatedWords", matchingWords);
        // commit("updateDictionary", dictionaryWord);
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
      commit("resetAvailableWords");
      const {
        data: { dictionaryWords, text, userOccurrences, availableWords },
      } = await axios.get(`/api/templates/?text=${textId}&user=${1}`);

      const occurrences = generateOccurrences({
        occurrences: userOccurrences,
        dictionaryWords,
      });

      commit("setOccurrences", occurrences);
      commit("setAvailableWords", availableWords);
      commit("setDictionaryWords", dictionaryWords);
      commit("setCurrentTemplateText", text);
      const tokenizedContent = getTokenizedContent(occurrences, text);
      commit("setTokenizedContent", tokenizedContent);
    },
    async getDataForTextDetails({ commit }, text) {
      commit("resetTokenizedContent");
      const tokenizedContent = [];

      if (text.status === "processed") {
        const {
          data: { templateOccurrences, availableWords },
        } = await axios.get(`/api/templates/?text=${text.textId}`);

        const occurrences = generateOccurrences({
          occurrences: templateOccurrences,
          template: true,
        });
        commit("setOccurrences", occurrences);
        commit("setAvailableWords", availableWords);
        tokenizedContent.push(...getTokenizedContent(occurrences, text));
      } else {
        tokenizedContent.push(...getTokenizedContent([], text, true));
      }

      commit("setTokenizedContent", tokenizedContent);
    },
    async changeLearntStatus({ commit }, dictionaryWord) {
      dictionaryWord.isLearned = !dictionaryWord.isLearned;
      const { data: newDictionaryWord } = await axios.put(
        `/api/dictionary-words/`,
        dictionaryWord
      );
      console.log(dictionaryWord, newDictionaryWord);
      commit("changeLearntStatus", newDictionaryWord);
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
          console.log;
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
          console.log;
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
      return state.dictionaryWords.filter((dw) => dw.isLearned);
    },
    unlearntWords(state) {
      return state.dictionaryWords.filter((dw) => !dw.isLearned);
    },
    availableMeaningsByWord: (state) => (word) => {
      return state.availableWords[word] || [];
    },
  },
  modules: {},
});
