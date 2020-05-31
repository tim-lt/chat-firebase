import BaseButton from '../BaseButton/BaseButton.vue';
import BaseInput from '../BaseInput/BaseInput.vue';
import BaseTextarea from '../BaseTextarea/BaseTextarea.vue';
import BaseSelect from '../BaseSelect/BaseSelect.vue';

export default {
  props: {
    titleText: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    titleProp: {
      type: String,
      default: '',
    },
    descProp: {
      type: String,
      default: '',
    },
    responsibleProp: {
      type: String,
      default: '',
    },
    assessmentProp: {
      type: Number,
      default: 0,
    },
    creatorProp: {
      type: String,
      default: '',
    },
  },
  components: {
    BaseButton,
    BaseInput,
    BaseTextarea,
    BaseSelect,
  },
  data() {
    return {
      models: {
        title: this.titleProp,
        desc: this.descProp,
        responsible: this.responsibleProp,
        assessment: this.assessmentProp,
        creator: this.creatorProp || this.$store.state.ModuleAuth.userID,
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
