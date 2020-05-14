import BaseSpinner from '../BaseSpinner/BaseSpinner.vue';

export default {
  props: {
    tag: {
      type: String,
      default: 'button',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    simple: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    BaseSpinner,
  },
};
