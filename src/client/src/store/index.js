import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import { 
  getTokenizedContent, 
  findOccurrencesInText,
  generateOccurrencesFromTemplate
} from '@/utils/template';

Vue.config.productionTip = false

const axios = Axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    texts: [],
    tokenizedContent: [],
    occurrences: [],
    dictionaryWords: []
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
    setDictionaryWords (state, dictionaryWords) {
      state.dictionaryWords = dictionaryWords
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
    },
    changeLearntStatus(state, dictionaryWord) {
      let dw = state.dictionaryWords.find(
        dw => dw.dictionaryId === dictionaryWord.dictionaryId
      );
      console.log(dw)
      dw = Object.assign({}, dictionaryWord);
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
      console.log(word)
      const { data } = await axios.post(`/api/words`, word)
      commit('addRelatedWord', data);
    },
    setDefault ({ commit }) {
      commit('setDefaultOccurrences');
    },
    setSelectedForEveryOccurrence({ commit }, occurrence) {
      commit('setSelectedForEveryOccurrence', occurrence);
    },
    async getTemplateByTextId({ commit }, textId) {
      const { data: 
        { dictionaryWords, text, userOccurrences } 
      } = await axios.get(`/api/templates/?text=${ textId }&user=${ 1 }`);

      const occurrences = generateOccurrencesFromTemplate(userOccurrences, dictionaryWords);
      
      commit('setOccurrences', occurrences);
      commit('setDictionaryWords', dictionaryWords);
      const tokenizedContent = getTokenizedContent(occurrences, text);
      commit('setTokenizedContent', tokenizedContent);
    },
    async changeLearntStatus({ commit }, dictionaryWord) {
      dictionaryWord.isLearned = !dictionaryWord.isLearned;
      const { data: newDictionaryWord } = await axios.put(`/api/dictionary-words/`, dictionaryWord);
      console.log(dictionaryWord, newDictionaryWord)
      commit('changeLearntStatus', newDictionaryWord);
    }
  },
  getters: {
    learntWords (state) {
      return state.dictionaryWords.filter(dw => dw.isLearned);
    },
    unlearntWords (state) {
      return state.dictionaryWords.filter(dw => !dw.isLearned);
    }
  },
  modules: {
  }
})

