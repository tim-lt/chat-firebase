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
    onInput({ target }) {
      if (this.type !== 'number') this.$emit('input', target.value);
    },
    onChange({ target }) {
      if (this.type === 'number') {
        if ((Number(target.value) && Number(target.value) > 1) || target.value === '0') {
          this.$emit('input', Number(target.value) || target.value);
        } else {
          const target_ = target;
          target_.value = this.value;
        }
      }
    },
  },
};
