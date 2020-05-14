export default {
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    value: {
      type: String,
    },
  },
  methods: {
    onChange({ target }) {
      this.$emit('input', target.value);
    },
  },
};
