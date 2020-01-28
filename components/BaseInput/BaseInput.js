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
  methods: {
    onChange({ target }) {
      this.$emit('input', target.value);
    },
  },
};
