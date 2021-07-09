import { ValidationObserver } from 'vee-validate';
import { mapActions } from 'vuex';
import CButton from '@/components/Button';
import CInput from '@/components/Input';
import Loader from '@/components/Loader';
import errowMixin from '@/mixins/errorMethod';

export default {
  name: 'Register',
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
    ...mapActions({
      Register: 'auth/Register',
    }),
    async submit() {
      this.loading = true;
      try {
        await this.Register(this.form);
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
