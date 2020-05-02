import BaseInput from '../BaseInput/BaseInput.vue';
import ChatMessage from '../ChatMessage/ChatMessage.vue';

export default {
  props: {
    value: String,
    messages: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      message: '',
    };
  },
  components: {
    BaseInput,
    ChatMessage,
  },
  methods: {
    scrollMessage() {
      this.$nextTick(() => {
        this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight - this.$refs.scroll.clientHeight;
      });
    },
  },
  watch: {
    message(newValue) {
      this.$emit('input', newValue);
    },
    value(newValue) {
      this.message = newValue;
    },
    messages() {
      if (this.messages.length > 0 && this.messages[this.messages.length - 1].userID !== this.$store.state.ModuleAuth.userID) return;
      this.scrollMessage();
    },
  },
  mounted() {
    console.log(this.messages);
    this.scrollMessage();
  },
};
