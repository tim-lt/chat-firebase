export default {
  props: {
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    value: {},
  },
  data() {
    return {
      recorded: false,
    };
  },
  methods: {
    onChange({ target }) {
      if (target.value !== '') this.recorded = true;
      else this.recorded = false;
      this.$emit('input', target.value);
    },
  },
};
