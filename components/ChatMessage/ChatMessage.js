export default {
  props: {
    my: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
