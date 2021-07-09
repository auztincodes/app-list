
import axios from 'axios';
const state = {
    plans: null
};

const getters = {
    getPlans: (state) => state.plans
};

const actions = {
    RequestPlans: async({commit}) => {
        commit('resetReq', null, { root: true });
        try {
			const response = await axios.get("/api/v1/plans/");
            commit("savePlans", response.data);
			return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
      },
};
const mutations = {
    savePlans: (state, data) => {
		state.plans = data;
	},
}
export default {
	state,
	getters,
	mutations,
	actions,
	namespaced: true
};