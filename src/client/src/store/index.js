import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import { getTokenizedContent, findOccurrencesInText } from '@/utils/template';

Vue.config.productionTip = false

const axios = Axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    texts: [],
    tokenizedContent: [],
    occurrences: []
  },
  mutations: {
    setTexts (state, texts) {
      state.texts = texts
    },
    setOccurrences (state, occurrences) {
      state.occurrences = occurrences;
    },
    setTokenizedContent (state, tokens) {
      state.tokenizedContent = tokens;
    },
    updateSelectedWord (state, { occurrenceStart, wordId }) {
      let ocurrence = state.occurrences.find(o => o.start === occurrenceStart);
      
      if (wordId === "undefined") wordId = undefined;
      
      // Number("undefined") === 0 -> (truthy)
      // Number(undefined) === NaN -> (falsy)
      let newSelected = ocurrence.relatedWords.find(
        w => w.wordId === (Number(wordId) || undefined)
      );
      
      ocurrence.selectedWordId = newSelected.wordId;
    },
    updateMarkedStatus (state, { occurrenceStart, markedStatus }) {
      let ocurrence = state.occurrences.find(o => o.start === occurrenceStart);
      ocurrence.markedStatus = markedStatus;
    },
    addRelatedWord (state, word) {
      let occurrence = state.occurrences.find(o => o.word === word.word);
      occurrence.relatedWords.push(word);
    },
    setDefaultOccurrences (state) {
      state.occurrences.forEach(o => {
        o.selectDefault();
      })
    },
    setSelectedForEveryOccurrence(state, occurrence) {
      state.occurrences.forEach(o => {
        if( o.word === occurrence.word) {
          o.selectedWordId = occurrence.selectedWordId;
        }
      })
    }
  },
  actions: {
    saveOccurrences({ state }, textId) {
      return axios.post(`/api/texts/${ textId }/process/save`, {
        occurrences: state.occurrences
      })
      .then(res => {
        console.log(res)
      })
      .catch(errors => {
        console.log(errors)
      })
    },
    getAllTexts ({ commit }) {
      return axios.get('/api/texts')
        .then(res => {
          commit('setTexts', res.data)
        })
        .catch(errors => {
          console.log(errors)
        })
    },
    async processText ({ commit }, textId) {
      const res = await axios.post(`/api/texts/${ textId }/process`)
      const occurrences = findOccurrencesInText(res.data);
      commit('setOccurrences', occurrences);
      const tokenizedContent = getTokenizedContent(occurrences, res.data.text);
      commit('setTokenizedContent', tokenizedContent);
    },
    updateSelectedWord ({ commit }, updatedData) {
      commit('updateSelectedWord', updatedData);
    },
    updateMarkedStatus ({ commit }, updatedData) {
      commit('updateMarkedStatus', updatedData);
    },
    async saveWord ({ commit }, word) {
      const { data } = await axios.post(`/api/words`, word)
      commit('addRelatedWord', data);
    },
    setDefault ({ commit }) {
      commit('setDefaultOccurrences');
    },
    setSelectedForEveryOccurrence({ commit }, occurrence) {
      commit('setSelectedForEveryOccurrence', occurrence);
    }
  },
  getters: {
  },
  modules: {
  }
})

