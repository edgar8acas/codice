import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import { 
  getTokenizedContent, 
  findOccurrencesInText,
  generateOccurrencesFromTemplate
} from '@/utils/template';
import UserOccurrence from '@/utils/user_occurrence';
import getExclusiveWords from '@/utils/filter_processed';

Vue.config.productionTip = false

const axios = Axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      admin: true
    },
    texts: [],
    tokenizedContent: [],
    occurrences: [],
    dictionaryWords: [],
    exclusivo: false,
    errors: [],
    success: [],
    currentTemplateText: {}
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
    setCurrentTemplateText (state, text) {
      state.currentTemplateText = text;
    },
    setDictionaryWords (state, dictionaryWords) {
      state.dictionaryWords = dictionaryWords
    },
    updateSelectedWord (state, updated) {
      let oc = state.occurrences.find(o => o.start === updated.start);
      oc = new UserOccurrence({...oc, ...updated});
      console.log(oc);
    },
    updateMarkedStatus (state, { occurrenceStart, markedStatus }) {
      let ocurrence = state.occurrences.find(o => o.start === occurrenceStart);
      ocurrence.markedStatus = markedStatus;
    },
    addRelatedWord (state, word) {
      let occurrence = state.occurrences.find(o => o.word === word.word);
      occurrence.matchingWords.push(word);
    },
    deleteRelatedWord (state, word) {
      const occurrence = state.occurrences.find(o => o.word === word.word);
      const index = occurrence.matchingWords.findIndex(w => w.wordId === word.wordId);
      occurrence.matchingWords.splice(index, 1);
    },
    addRelatedWords (state, data) {
      const { data: words } = data;
      const occurrences = state.occurrences.filter(o => o.word === words[0].word);
      const matchingWords = words.length > 0 ? words : [];
      occurrences.forEach(o => o.matchingWords = matchingWords);
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
    },
    setOnlyExclusive(state, value) {
      state.exclusivo = value
    },
    addError(state, error) {
      state.errors = [error];
    },
    addSuccess(state, data) {
      state.success = [data];
    },
    toggleUserType(state) {
      state.user.admin = !state.user.admin
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
    setTexts ({ commit }, texts) {
      commit('setTexts', texts);
    },
    async processText ({ state, commit }, textId) {
      const res = await axios.post(`/api/texts/${ textId }/process`);
      let processed = state.exclusivo ? getExclusiveWords(res.data) : res.data;
      const occurrences = findOccurrencesInText(processed);
      commit('setOccurrences', occurrences);
      const tokenizedContent = getTokenizedContent(occurrences, res.data.text);
      commit('setTokenizedContent', tokenizedContent);
    },
    async updateSelectedWord ({ commit }, occurrence) {
      try {
        const { data: { updated, dictionaryWord, matchingWords} } = await axios.put(
          `/api/user-occurrences/${occurrence.userOccurrenceId}/update-selected`,
          occurrence
        );
        commit('updateSelectedWord', updated);
        commit('addRelatedWords', matchingWords);
        commit('updateDictionary', dictionaryWord);
        //commit('addSuccess', data)
      } catch (error) {
        if(error.response) {
          commit('addError', error.response.data.error);
        }
      }
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
    },
    async getTemplateByTextId({ commit }, textId) {
      const { data: 
        { dictionaryWords, text, userOccurrences } 
      } = await axios.get(`/api/templates/?text=${ textId }&user=${ 1 }`);

      const occurrences = generateOccurrencesFromTemplate(userOccurrences, dictionaryWords);
      
      commit('setOccurrences', occurrences);
      commit('setDictionaryWords', dictionaryWords);
      commit('setCurrentTemplateText', text);
      const tokenizedContent = getTokenizedContent(occurrences, text);
      commit('setTokenizedContent', tokenizedContent);
    },
    async changeLearntStatus({ commit }, dictionaryWord) {
      dictionaryWord.isLearned = !dictionaryWord.isLearned;
      const { data: newDictionaryWord } = await axios.put(`/api/dictionary-words/`, dictionaryWord);
      console.log(dictionaryWord, newDictionaryWord)
      commit('changeLearntStatus', newDictionaryWord);
    },
    setProcessingOptions ({ commit }, value) {
      commit('setOnlyExclusive', value);
    },
    addText ({ commit }, text) {
      return axios.post(`/api/texts/`, text)
      .then(data => {
        console.log(data)
        commit('addSuccess', data);
      })
      .catch(error => {
        if(error.response) {
          commit('addError', error.response.data.error);
        }
      })
    },
    async deleteRelatedWord ({ commit }, word) {
      try {
        const { data } = await axios.delete(`/api/words/${word.wordId}`);
        commit('deleteRelatedWord', word);
        commit('addSuccess', data)
      } catch (error) {
        if(error.response) {
          commit('addError', error.response.data.error);
        }
      }
      
    },
    async getRelatedWords ({ commit }, occurrence) {
      try {
        const { data } = await axios.get(`/api/words/?word=${occurrence.word}`);
        commit('addRelatedWords', data);
      } catch (error) {
        if(error.response) {
          console.log
          commit('addError', error.response.data.error);
        }
      }
    },
    async addNewOccurrence ({ commit, dispatch }, occurrenceInfo) {
      try {
        const { data } = await axios.post(`/api/user-occurrences/`, occurrenceInfo);
        await dispatch('getTemplateByTextId', data.textId);
      } catch (error) {
        if(error.response) {
          console.log
          commit('addError', error.response.data.error);
        }
      }
      
    },
    /** Temporal action to change the user type, just for development purposes */
    toggleUserType ({ commit }) {
      commit('toggleUserType');
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

