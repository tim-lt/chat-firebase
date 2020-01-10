export default {
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
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    fail() {
      this.loading = false;
    },
  },
};
