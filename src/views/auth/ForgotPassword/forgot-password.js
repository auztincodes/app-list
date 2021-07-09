import { ValidationObserver } from 'vee-validate';
import { mapActions } from 'vuex';
import CButton from '@/components/Button';
import CInput from '@/components/Input';
import Loader from '@/components/Loader';
export default {
  name: 'Forgot Password',
  components: {
    ValidationObserver,
    CInput,
    CButton,
    Loader,
  },
  data() {
    return {
      email: null,
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      ForgotPassword: 'auth/ForgotPassword',
    }),
    async submit() {
      this.loading = true;
      try {
        const response = await this.ForgotPassword({ email: this.email });
        if (response.status === 200) {
          this.$notify({
            type: 'success',
            title: 'Success',
            text: response.data.detail,
          });
          return true;
        }
      } catch (error) {
        error.response.data.non_field_errors.forEach((error) => {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: error,
          });
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
