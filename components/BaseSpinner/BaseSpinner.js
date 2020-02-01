export default {
  props: {
    inner: {
      type: Boolean,
      default: false,
    },
    white: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
    fail() {
      this.loading = false;
    },
  },
  mounted() {
    if (this.inner) this.start();
  },
};
