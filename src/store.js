import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movieList: [],
    comingList: null,
    movieLen: '',
  },
  mutations: {
    switchData(state, Info) {
      this.state.movieList = Info;
    },
    comingData(state, Info) {
      this.state.comingList = Info;
    },
    obtainLength(state, Info) {
      this.state.movieLen = Info;
    },
  },
  actions: {

  },
});
