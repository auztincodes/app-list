import axios from 'axios';
export default {
  getApps: async () => {
    try {
      const response = await axios.get('/api/v1/apps/');
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  createApp: async ({ commit }, data) => {
	commit('resetReq', null, { root: true });
    try {
      const response = await axios.post('/api/v1/apps/', data);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  editApp: async ({ commit }, { id , data }) => {
	commit('resetReq', null, { root: true });
    try {
      const response = await axios.put(`/api/v1/apps/${id}/`, data);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  deleteApp: async ({ commit }, id) => {
	commit('resetReq', null, { root: true });
    try {
      const response = await axios.delete(`/api/v1/apps/${id}/`);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
