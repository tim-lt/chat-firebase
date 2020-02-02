<template lang="pug">
  .container.page
    .chat
      h1.chat__title Chat
      form.chat__content(@submit.prevent="onSubmit")
        .chat__inner
          .chat__message.chat__message--my Привет!
          .chat__message Антон: Это чат на firebase
          .chat__message.chat__message--my Это самое длинноу сообщение на свете Это самое длинноу сообщение на свете Это самое длинноу сообщение на свете
        .chat__footer
          BaseInput.chat__input(type="text" placeholder="Message" name="message" v-model="message")
            svg(xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512')
              path(d='M481.508 210.336L68.414 38.926c-17.403-7.222-37.064-4.045-51.309 8.287C2.86 59.547-3.098 78.551 1.558 96.808L38.327 241h180.026c8.284 0 15.001 6.716 15.001 15.001 0 8.284-6.716 15.001-15.001 15.001H38.327L1.558 415.193c-4.656 18.258 1.301 37.262 15.547 49.595 14.274 12.357 33.937 15.495 51.31 8.287l413.094-171.409C500.317 293.862 512 276.364 512 256.001s-11.683-37.862-30.492-45.665z')
</template>

<style lang="scss">
.page {
  height: 100%;
}

.chat {
  border-radius: 35px;
  background-color: $background;
  margin: 30px 0;
  padding: 20px 150px 60px;
  display: flex;
  flex-direction: column;
  height: 100%;

  &__title {
    color: $main;
    font: 700 36px/1em "PT Sans", sans-serif;
    text-align: center;
    flex-shrink: 0;
  }

  &__content {
    margin-top: 30px;
    background-color: #fff;
    border-radius: 35px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 15px 30px;
  }

  &__inner {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 20px;
    align-items: flex-start;
  }

  &__footer {
    flex-shrink: 0;
    display: flex;
  }

  &__input {
    padding-right: 50px;
    width: 100%;

    svg {
      right: 25px;
      left: auto;
    }
  }

  &__message {
    border-radius: 25px;
    border-bottom-left-radius: 0;
    background-color: $background;
    padding: 10px 15px;
    max-width: 70%;
    font: 400 18px/1em "PT Sans", sans-serif;
    color: $text;

    &--my {
      background: linear-gradient(to top, $message1, $message2);
      border-bottom-left-radius: 25px;
      border-bottom-right-radius: 0;
      margin-left: auto;
      color: #fff;
    }

    & + & {
      margin-top: 20px;
    }
  }
}
</style>

<script>
import BaseInput from '~/components/BaseInput/BaseInput.vue';

export default {
  // middleware: ['isLogget'],
  components: {
    BaseInput,
  },
  data() {
    return {
      message: '',
    };
  },
  methods: {
    onSubmit() {
      console.log(this.message);
    },
  },
};
</script>>
