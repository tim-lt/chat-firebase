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
      email: 't@t.ru',
      emailError: '',
      password: '123321',
      passwordError: '',
      name: 'tim',
      nameError: '',
    };
  },
  watch: {
    email() {
      if (this.emailError !== '') this.emailError = '';
    },
    password() {
      if (this.passwordError !== '') this.passwordError = '';
    },
    name() {
      if (this.nameError !== '') this.nameError = '';
    },
  },
  methods: {
    async onSubmit() {
      if (!email.test(this.email)) this.emailError = errors.email;
      if (this.email === '') this.emailError = errors.required;
      if (this.password === '') this.passwordError = errors.required;
      if (this.password.length < 6) this.passwordError = errors.small_password;
      if (this.name === '') this.nameError = errors.required;
      if (this.name.length < 2) this.nameError = errors.name;
      if (this.emailError === '' && this.passwordError === '' && this.nameError === '') {
        try {
          await this.$store.dispatch('ModuleAuth/register', {
            email: this.email,
            password: this.password,
            name: this.name,
          });
          this.clearForm();
          this.$router.push('/');
        } catch (e) {
          if (e.message && e.message === 'auth/email-already-in-use') this.emailError = errors[e.message];
          else {
            console.log(e);
          }
        }
      }
    },
    clearForm() {
      this.email = '';
      this.password = '';
      this.name = '';
    },
  },
};

// this.$store.dispatch('ModuleAuth/register', { email: this.email, password: this.password, name: this.name });
