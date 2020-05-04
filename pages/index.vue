<template lang="pug">
  .container.chat
    .chat__wrapper
      h1.h1.chat__title Chat
      ChatContainer.chat__container(@submit.prevent.native="onSubmit", :messages="messages", v-model="message", @submitForm="onSubmit")
</template>

<style lang="scss">
.chat {
  height: 100%;
  padding-top: 30px;
  padding-bottom: 30px;

  @include mq("tablet") {
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    z-index: 1;
  }

  @include mq("tablet", "phone") {
    height: calc(100vh - 120px);
  }

  @include mq("phone") {
    height: calc(100vh - 65px);
  }

  @media (orientation: landscape) {
    position: static;
    height: 100%;
  }

  &__wrapper {
    border-radius: 35px;
    background-color: $background;
    padding: 20px 150px 60px;
    display: flex;
    flex-direction: column;
    height: 100%;

    @include mq("desktop-small", "tablet") {
      padding-left: 50px;
      padding-right: 50px;
    }

    @include mq("tablet") {
      padding-left: 20px;
      padding-right: 20px;
      padding-bottom: 20px;
    }
  }

  &__title {
    text-align: center;
    flex-shrink: 0;
  }

  &__container {
    margin-top: 30px;
    max-height: calc(100% - 80px);

    @include mq("tablet") {
      margin-top: 15px;
      max-height: calc(100% - 50px);
    }
  }
}
</style>

<script>
import BaseInput from '~/components/BaseInput/BaseInput.vue';
import ChatContainer from '~/components/ChatContainer/ChatContainer.vue';

export default {
  head() {
    return {
      title: 'Home',
    };
  },
  components: {
    BaseInput,
    ChatContainer,
  },
  data() {
    return {
      message: '',
    };
  },
  computed: {
    messages() {
      return this.$store.state.ModuleChat.messages;
    },
  },
  methods: {
    onSubmit() {
      if (this.message === '') return;
      this.$store.dispatch('ModuleChat/write', this.message);
      this.message = '';
    },
  },
  mounted() {
    if (this.$store.state.ModuleChat.messages.length === 0) this.$store.dispatch('ModuleChat/listen');
  },
};
</script>>
