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
    wordsToChoose: {},
    currentTemplateText: '',
    currentTemplateWords: [],
    tokenizedContent: [],
    occurrences: [],
    currentWordId: null
  },
  mutations: {
    setTexts (state, texts) {
      state.texts = texts
    },
    setWordsToChoose (state, words) {
      state.wordsToChoose = Object.assign({}, state.wordsToChoose, words);
    },
    moveOrUpdateReady (state, selected) {
      // console.log('function')
      if(Object.prototype.hasOwnProperty.call(
          state.wordsToChoose.conflicts, selected[0].word)) {
            // console.log('true')
            delete state.wordsToChoose.conflicts[selected[0].word]
            Vue.set(state.wordsToChoose.ready, selected[0].word, selected)
      } else {
        // console.log('false')
        state.wordsToChoose.ready[selected[0].word] = selected
      }
    },
    cleanWordsToChoose (state) {
      state.wordsToChoose = {}
    },
    cleanCurrentWord (state) {
      state.currentWordId = null
    },
    setCurrentTemplate (state, template) {
      Vue.set(state, 'currentTemplateWords', [...template.words]);
      Vue.set(state, 'currentTemplateText', template.text);
    },
    setCurrentWordId (state, wordId) {
      state.currentWordId = wordId
    },
    setOccurrences (state, occurrences) {
      state.occurrences = occurrences;
    },
    setTokenizedContent (state, tokens) {
      state.tokenizedContent = tokens;
    },
    updateSelectedWord (state, { occurrenceStart, wordId }) {
      let ocurrence = state.occurrences.find(o => o.start === occurrenceStart);
      /*let oldSelected = ocurrence.relatedWords.find(w => w.selected === true) || {};
      delete oldSelected.selected;
      */if (wordId === "undefined") wordId = undefined;
      // Number("undefined") === 0 -> (truthy)
      // Number(undefined) === NaN -> (falsy)
      let newSelected = ocurrence.relatedWords.find(
        w => w.wordId === (Number(wordId) || undefined)
      );
      /*newSelected.selected = true;*/
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
      commit('setWordsToChoose', res.data);
      const occurrences = findOccurrencesInText(res.data);
      commit('setOccurrences', occurrences);
      const tokenizedContent = getTokenizedContent(occurrences, res.data.text);
      commit('setTokenizedContent', tokenizedContent);
    },
    markAsReady ({ commit }, marked) {
      commit('moveOrUpdateReady', marked)
    },
    saveChoosenWords ({ commit, state }, textId) {
      return axios.post(`/api/texts/${ textId }/process/save`, {
        ...state.wordsToChoose
      })
      .then(res => {
        console.log(res)
        commit('', res.data)
      })
      .catch(errors => {
        console.log(errors)
      })
    },
    async getCurrentTemplate ({ commit }, textId) {
      const { data } = await axios.get(`/api/templates/?id=${textId}`);
      commit('setCurrentTemplate', {...data});
    },
    setCurrentWordId ({ commit }, wordId){
      commit('setCurrentWordId', wordId);
    },
    resetCurrentWord ({ commit }) {
      commit('cleanCurrentWord');
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
    currentWord: state => {
      return state.currentTemplateWords.find(
        word => word.wordId === state.currentWordId
      ) || {}
    }
  },
  modules: {
  }
})

