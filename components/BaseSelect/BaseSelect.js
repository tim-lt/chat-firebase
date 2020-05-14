export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggle() {
      if (this.isOpen) this.close();
      else this.open();
    },
    onTransitionEnd() {
      this.$refs.body.style.height = '';
    },
    open() {
      if (this.$refs.body === undefined) return;
      this.$refs.body.style.height = `${this.$refs.bodyInner.offsetHeight}px`;
      this.isOpen = true;
      if (this.$listeners.open !== undefined) this.$emit('open');
    },
    close() {
      if (this.$refs.body === undefined) return;
      this.$refs.body.style.height = `${this.$refs.bodyInner.offsetHeight}px`;
      this.$refs.body.offsetHeight; // eslint-disable-line
      this.$refs.body.style.height = '';
      this.isOpen = false;
      if (this.$listeners.close !== undefined) this.$emit('close');
    },
    clickDocument({ target }) {
      // console.log(e);
      const el = target.closest('.baseSelect');
      if (el === null || !el.isEqualNode(this.$el)) this.close();
    },
  },
  mounted() {
    ['webkitTransitionEnd', 'otransitionend', 'oTransitionEnd', 'msTransitionEnd', 'transitionend'].forEach((event) => {
      this.$refs.body.addEventListener(event, this.onTransitionEnd);
    });
    document.addEventListener('click', this.clickDocument);
  },
  beforeDestroyed() {
    ['webkitTransitionEnd', 'otransitionend', 'oTransitionEnd', 'msTransitionEnd', 'transitionend'].forEach((event) => {
      this.$refs.body.removeEventListener(event, this.onTransitionEnd);
    });
    document.removeEventListener('click', this.clickDocument);
  },
};
