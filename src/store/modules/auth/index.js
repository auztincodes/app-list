import axios from 'axios';
const state = {
    token: null,
    loggedUser: null
};
const getters = {
    isAuthenticated: (state) => !!state.token,
    getToken: (state) => state.token,
    getLoggedUser: (state) => state.loggedUser,
};
const actions = {
    Register: async ({ dispatch }, data) => {
        await axios.post('/rest-auth/registration/', data)
        let UserForm = new FormData()
        UserForm.append('email', data.email)
        UserForm.append('password', data.password)
        await dispatch('LogIn', UserForm)
      },
     LogIn: async({commit}, user) => {
        commit('resetReq', null, { root: true });
        try {
			const response = await axios.post("rest-auth/login/", user);
            commit("setToken", response.data.key);
			return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
      },
      LogOut: async({commit}) => {
        commit('resetReq', null, { root: true });
        try {
			const response = await axios.post("rest-auth/logout/");
            commit("clearToken");
			return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
      },
      ForgotPassword: async({commit}, user) => {
        commit('resetReq', null, { root: true });
        try {
			const response = await axios.post("rest-auth/password/reset/", user);
			return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
      },
      GetProfile: async({commit}) => {
        commit('resetReq', null, { root: true });
        try {
			const response = await axios.get("rest-auth/user/");
            commit("loginSuccess", response.data);
			return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
      },
};
const mutations = {
    loginSuccess: (state, data) => {
		state.loggedUser = data;
	},
    clearToken: (state) => {
        state.token = null,
        state.loggedUser = null
        delete axios.defaults.headers.common.Authorization;
	},
    setToken(state, token) {
        state.token = token;
      },
};
export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
};