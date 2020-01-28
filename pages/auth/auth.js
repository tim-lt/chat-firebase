import BaseInput from '~/components/BaseInput/BaseInput.vue';
import BaseButton from '~/components/BaseButton/BaseButton.vue';
import errors from '~/assets/scripts/errors';
import { email } from '~/assets/scripts/regex';

export default {
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  },
  watch: {
    email() {
      if (this.emailError !== '') this.emailError = '';
    },
    password() {
      if (this.passwordError !== '') this.passwordError = '';
    },
  },
  methods: {
    async onSubmit() {
      if (!email.test(this.email)) this.emailError = errors.email;
      if (this.email === '') this.emailError = errors.required;
      if (this.password === '') this.passwordError = errors.required;
      if (this.password.length < 6) this.passwordError = errors.small_password;
      if (this.emailError === '' && this.passwordError === '') {
        try {
          await this.$store.dispatch('ModuleAuth/login', {
            email: this.email,
            password: this.password,
          });
          this.clearForm();
          this.$router.push('/');
        } catch (e) {
          if (e.message && e.message === 'auth/user-not-found') this.emailError = errors[e.message];
          else if (e.message && e.message === 'auth/wrong-password') this.passwordError = errors[e.message];
          else {
            console.log(e);
          }
        }
      }
    },
    clearForm() {
      this.email = '';
      this.password = '';
    },
  },
};
