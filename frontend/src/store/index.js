import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './modules/Auth';

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
  modules: {
    Auth
  },
  state: {
    drawer: null,
  },
  mutations: {
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    },
  },
  actions: {},
  getters: {}
});
