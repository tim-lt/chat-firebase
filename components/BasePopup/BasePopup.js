export default {
  computed: {
    isMobile() {
      return (this.$mq === 'phone' || this.$mq === 'phone-wide' || this.$mq === 'tablet');
    },
  },
};
