import Vue from 'vue';
import Vuex from 'vuex';
import beerNote from './modules/beerNote';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    beerNote,
  },
});
