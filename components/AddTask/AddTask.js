import BaseButton from '../BaseButton/BaseButton.vue';
import BaseInput from '../BaseInput/BaseInput.vue';
import BaseTextarea from '../BaseTextarea/BaseTextarea.vue';
import BaseSelect from '../BaseSelect/BaseSelect.vue';
import InputFile from '../InputFile/InputFile.vue';

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
    filesProp: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    BaseButton,
    BaseInput,
    BaseTextarea,
    BaseSelect,
    InputFile,
  },
  data() {
    return {
      models: {
        title: this.titleProp,
        desc: this.descProp,
        responsible: this.responsibleProp,
        assessment: this.assessmentProp,
        creator: this.creatorProp || this.$store.state.ModuleAuth.userID,
        files: this.filesProp,
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
    async onSubmit() {
      if (!this.models.title) this.errors.title = 'Это обязательное поле';
      if (!this.models.responsible) this.errors.responsible = true;
      if (!this.errors.title && !this.errors.responsible) {
        try {
          const date = Date.now();
          let files = [];
          if (this.models.files.length > 0) {
            await this.$store.dispatch('ModuleTask/addFile', { date, files: this.models.files });
            files = this.getFileNames(date);
          }
          this.$store.dispatch('ModuleTask/addTask', { ...this.models, files });
          this.$emit('closePopup');
        } catch (e) {
          console.error(e);
          this.$emit('closePopup');
        }
      }
    },
    getFileNames(date) {
      const files = [];
      this.models.files.forEach((file) => {
        files.push(`${date}/${file.name}`);
      });
      return files;
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
