import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.config.productionTip = false

const axios = Axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    texts: [],
    wordsToChoose: {}
  },
  mutations: {
    setTexts (state, texts) {
      state.texts = texts
    },
    setWordsToChoose (state, words) {
      state.wordsToChoose = words
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
    }
  },
  actions: {
    getAllTexts ({ commit }) {
      axios.get('/api/texts')
        .then(res => {
          commit('setTexts', res.data)
        })
        .catch(errors => {
          console.log(errors)
        })
    },
    processText ({ commit }, textId) {
      axios.post(`/api/texts/${ textId }/process`)
        .then(res => {
          commit('setWordsToChoose', res.data);
        })
        .catch(errors => {
          console.log(errors)
        })
    },
    markAsReady ({ commit }, marked) {
      commit('moveOrUpdateReady', marked)
    },
    resetWordsToChoose ({ commit }) {
      commit('cleanWordsToChoose');
    },
    saveChoosenWords ({ commit, state }, textId) {
      axios.post(`/api/texts/${ textId }/process/save`, {
        ...state.wordsToChoose
      })
      .then(res => {
        console.log(res)
        commit('', res.data)
      })
      .catch(errors => {
        console.log(errors)
      })
    }
  },
  modules: {
  }
})

// let old = {
//   state: {
//     texts: [],
//     wordsToChoose: {}
//   },
//   setTexts(texts) {
//     console.log('setTexts action triggered with', texts);
//     this.state.texts = texts;
//   },
//   setWordsToChoose(wordsToChoose) {
//     console.log('setWordsToChoose action triggered with', wordsToChoose);
//     this.state.wordsToChoose = wordsToChoose;
//   },
//   updateWordsToChoose(updated) {
//     delete this.state.wordsToChoose.conflicts[updated[0].word]
//     this.state.wordsToChoose[updated[0].word] = updated
//     console.log('updateWordsToChoose action triggered, new wordsToChoose', this.state.wordsToChoose);
//   }
// }
