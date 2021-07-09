import Vuex from 'vuex';
import Vue from 'vue';
import VuexPersistence from 'vuex-persist';
import auth from './modules/auth';
import apps from './modules/apps'
import plans from './modules/plans'
import subscription from './modules/subscription'
// Load Vuex
Vue.use(Vuex);

const vuexPersistence = new VuexPersistence({
	storage: window.localStorage
});
// Create store
export default new Vuex.Store({
  state: {
		status: '',
    errorLog: {},
	},
  getters: {
    getStatus: (state) => state.status,
		getErrorLog: (state) => state.errorLog,

  },
  mutations: {
    resetReq: (state) => {
			state.status = '';
			state.errorLog = {};
		},
  reqError: (state) => {
    state.status = 'error';
  }
  },
  modules: {
    auth,
    apps,
    plans,
    subscription
  },
  plugins: [vuexPersistence.plugin]
});