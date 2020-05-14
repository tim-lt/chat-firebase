import BaseButton from '../BaseButton/BaseButton.vue';
import BaseInput from '../BaseInput/BaseInput.vue';
import BaseTextarea from '../BaseTextarea/BaseTextarea.vue';
import BaseSelect from '../BaseSelect/BaseSelect.vue';

export default {
  components: {
    BaseButton,
    BaseInput,
    BaseTextarea,
    BaseSelect,
  },
  data() {
    return {
      models: {
        title: '',
        desc: '',
        responsible: '',
        assessment: 0,
        creator: this.$store.state.ModuleAuth.userID,
      },
      errors: {
        title: '',
        responsible: false,
      },
    };
  },
  computed: {
    users() {
      return this.$store.state.ModuleAuth.users;
    },
  },
  watch: {
    /* eslint-disable */
    'models.title': function () {
      this.errors.title = '';
    },
    'models.responsible': function () {
      this.errors.responsible = false;
    },
    /* eslint-enable */

  },
  methods: {
    onSubmit() {
      if (!this.models.title) this.errors.title = 'Это обязательное поле';
      if (!this.models.responsible) this.errors.responsible = true;
      if (!this.errors.title && !this.errors.responsible) {
        try {
          this.$store.dispatch('ModuleTask/addTask', this.models);
          this.$emit('closePopup');
        } catch (e) {
          console.error(e);
          this.$emit('closePopup');
        }
      }
    },
    setResponsible(key) {
      this.models.responsible = key;
      this.$refs.selectResponsible.close();
    },
    setCreator(key) {
      this.models.creator = key;
      this.$refs.selectCreator.close();
    },
  },
};
