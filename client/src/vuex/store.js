import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  styles: [],
};

const mutations = {
  ADD_STYLE_FILTER(state, style) {
    state.styles.push(style);
  },
};

const actions = {
  addStyleFilter(context, style) {
    context.commit('ADD_STYLE_FILTER', style);
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
});
