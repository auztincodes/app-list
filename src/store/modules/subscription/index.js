
import axios from 'axios';
const state = {
    subscription: null
};

const getters = {
    fetchSubscription: (state) => state.subscription
};

const actions = {
    initiateSubscription: async({commit}, data) => {
        commit('resetReq', null, { root: true });
        try {
			const response = await axios.post("/api/v1/subscriptions/", data);
            return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
      },
      getSubscription: async({commit}, id) => {
        commit('resetReq', null, { root: true });
        try {
			const response = await axios.get(`/api/v1/subscriptions/${id}/`);
            commit('saveSubscription', response.data)
            return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
      },
      upgradeSubscription: async({commit},  { id , data }) => {
        commit('resetReq', null, { root: true });
        try {
			const response = await axios.put(`/api/v1/subscriptions/${id}/`, data);
            return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
      },
};
const mutations = {
    saveSubscription: (state, data) => {
		state.subscription = data;
	},
}
export default {
	state,
	getters,
	mutations,
	actions,
	namespaced: true
};