import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import Notifications from 'vue-notification';

import './bootstrap';

Vue.use(Notifications);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isAuthenticated'];
    },
  },
  watch: {
    isLoggedIn(value) {
      if (value) {
        const token = this.$store.getters['auth/getToken'];
        axios.defaults.headers.common.Authorization = `Token ${token}`;
      }
    },
   
  },
  created() {
    if (this.isLoggedIn) {
      const token = this.$store.getters['auth/getToken'];
      axios.defaults.headers.common.Authorization = `Token ${token}`;
    }
  },
  render: (h) => h(App),
}).$mount('#app');
