import store from './store';
import axios from 'axios';

axios.defaults.baseURL = `${process.env.VUE_APP_CROWDBOTICS_API_URL}`;
axios.interceptors.response.use(undefined, function(error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch('auth/LogOut');
    }
  }
});
