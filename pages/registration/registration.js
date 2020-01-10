import BaseInput from '~/components/BaseInput/BaseInput.vue';
import BaseButton from '~/components/BaseButton/BaseButton.vue';

export default {
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      auth: true,
      login: '',
      password: '',
    };
  },
  watch: {
    login(newValue) {
      console.log(newValue);
    },
    password(newValue) {
      console.log(newValue);
    },
  },
};
