const tableHeaders = [
  {
    name: 'Name',
  },
  {
    name: 'Type',
  },
  {
    name: 'Frame Work',
    sortable: false,
  },
  {
    name: 'Description',
  },
  {
    name: ' ',
  },
];

import CButton from '@/components/Button';
import CInput from '@/components/Input';
import CTable from '@/components/Table';
import VHeader from '@/components/Header/Header.vue';
import Loader from '@/components/Loader';
import ToggleDropdown from '@/components/ToggleDropdown';
import { ValidationObserver } from 'vee-validate';
import Modal from '@/components/Modal';
import { mapActions, mapGetters } from 'vuex';
import errowMixin from '@/mixins/errorMethod';
import Card from '@/components/Card/Card.vue';
import PageLoader from '@/components/PageLoader.vue';
export default {
  name: 'Home',
  mixins: [errowMixin],
  components: {
    CButton,
    CInput,
    CTable,
    VHeader,
    Modal,
    Loader,
    ToggleDropdown,
    ValidationObserver,
    Card,
    PageLoader,
  },
  data() {
    return {
      tableHeaders: tableHeaders,
      newApp: {
        name: null,
        description: null,
        type: 'Web',
        framework: 'Django',
        domain_name: '',
      },
      apps: null,
      appInfo: null,
      pageLoading: true,
      toggleClass: true,
      showCreateApp: false,
      showViewApp: false,
      showEditApp: false,
      showDeleteApp: false,
      showSubscriptionModal: false,
      showUpgradeModal: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      plans: 'plans/getPlans',
      subscription: 'subscription/fetchSubscription',
    }),
  },
  async mounted() {
    this.fetchApps();
    await this.RequestPlans();
  },
  methods: {
    ...mapActions({
      getApps: 'apps/getApps',
      createApp: 'apps/createApp',
      editApp: 'apps/editApp',
      deleteApp: 'apps/deleteApp',
      RequestPlans: 'plans/RequestPlans',
      initiateSubscription: 'subscription/initiateSubscription',
      getSubscription: 'subscription/getSubscription',
      upgradeSubscription: 'subscription/upgradeSubscription',
    }),
    toggleModalClass(modal) {
      if (!this[modal]) {
        this[modal] = true;
      } else {
        this.toggleClass = !this.toggleClass;
        setTimeout(() => {
          this[modal] = !this[modal];
          this.toggleClass = !this.toggleClass;
        }, 500);
      }
    },
    async fetchApps() {
      this.pageLoading = true;
      try {
        const response = await this.getApps();
        this.apps = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.pageLoading = false;
      }
    },
    async registerApp() {
      this.loading = true;
      try {
        const response = await this.createApp(this.newApp);
        const { status } = response;
        console.log(response);
        if (status === 201) {
          this.toggleModalClass('showCreateApp');
          await this.fetchApps();
          this.newApp = {
            name: null,
            description: null,
            type: 'Web',
            framework: 'Django',
          };
          this.$notify({
            type: 'success',
            title: 'Success',
            text: 'App created successfully',
          });
        }
      } catch (error) {
        this.displayError(error);
      } finally {
        this.loading = false;
      }
    },

    openModal(item, modal) {
      this.appInfo = item;
      this.toggleModalClass(modal);
    },

    async updateApp() {
      this.loading = true;
      const { name, description, type, framework, domain_name } = this.appInfo;
      try {
        const response = await this.editApp({
          id: this.appInfo.id,
          data: { name, description, type, framework, domain_name },
        });
        const { status, statusText } = response;
        if (status === 200 && statusText === 'OK') {
          this.toggleModalClass('showEditApp');
          this.fetchApps();
          this.$notify({
            type: 'success',
            title: 'Success',
            text: 'App successfully updated',
          });
        }
      } catch (error) {
        this.displayError(error);
      } finally {
        this.loading = false;
      }
    },
    async removeApp() {
      this.loading = true;
      try {
        const response = await this.deleteApp(this.appInfo.id);
        if (response.status === 204) {
          this.toggleModalClass('showDeleteApp');
          this.fetchApps();
          this.$notify({
            type: 'success',
            title: 'Success',
            text: 'App successfully deleted',
          });
        }
      } catch (error) {
        this.displayError(error);
      } finally {
        this.loading = false;
      }
    },
    async selectPlan(plan) {
      try {
        const response = await this.initiateSubscription({
          plan: plan.id,
          app: this.appInfo.id,
          active: true,
        });
        if (response.status === 201) {
          this.toggleModalClass('showSubscriptionModal');
          this.fetchApps();
          this.$notify({
            type: 'success',
            title: 'Success',
            text: `${this.appInfo.name} successfully subscribed to ${plan.name}`,
          });
        }
      } catch (error) {
        this.displayError(error);
      }
    },
    async getSubscriptionDetail(item, modal) {
      this.loading = true;
      this.openModal(item, modal)
      try {
        await this.getSubscription(item.subscription);
      } catch (error) {
        this.displayError(error);
      } finally {
        this.loading = false;
      }
    },
    async upgradePlan(id, plan) {
      const payload = {
        plan: plan.id,
        app: this.appInfo.id,
        active: true,
      };
      try {
        const response = await this.upgradeSubscription({
          id: id,
          data: payload,
        });
        if (response.status === 200) {
          this.toggleModalClass('showUpgradeModal');
          this.fetchApps();
          this.$notify({
            type: 'success',
            title: 'Success',
            text: `${this.appInfo.name} successfully subscribed to ${plan.name}`,
          });
        }
      } catch (error) {
        this.displayError(error);
      }
    },
  },
};
