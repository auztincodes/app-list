import { ValidationObserver } from 'vee-validate';
import { mapActions, mapMutations } from 'vuex';
import CButton from '@/components/Button';
import CInput from '@/components/Input';
import Loader from '@/components/Loader';
import errowMixin from '@/mixins/errorMethod';
export default {
  name: 'Login',
  mixins: [errowMixin],
  components: {
    ValidationObserver,
    CInput,
    CButton,
    Loader,
  },
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      loading: false,
    };
  },
  methods: {
    ...mapMutations({
      saveUserSession: 'auth/loginSuccess',
    }),
    ...mapActions({
      LogIn: 'auth/LogIn',
      GetProfile: 'auth/GetProfile',
    }),
    async submit() {
      this.loading = true;
      try {
       await this.LogIn(this.form);
        await this.GetProfile();
        this.$router.push('/');
        return true;
      } catch (error) {
        this.displayError(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
