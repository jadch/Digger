import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  styles: null,
};

export default new Vuex.Store({
  state,
});
