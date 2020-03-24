<template lang="pug">
  .page
    header.page__header
      .container.page__headerContainer
        .page__name {{ name }}
        BaseButton(@click.native="logout") Выйти
    main.page__main
      nuxt
</template>

<style lang="scss">
.page {
  display: flex;
  flex-direction: column;

  &__header {
    border-bottom: 2px solid $background;
    background-color: $page;
    height: 60px;
  }

  &__headerContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  &__name {
    color: $main;
    font: 700 24px/1em "PT Sans", sans-serif;
    text-transform: uppercase;
  }

  &__main {
    background-color: $page;
  }
}
</style>

<script>
import BaseButton from '~/components/BaseButton/BaseButton.vue';

export default {
  components: {
    BaseButton,
  },
  computed: {
    name() {
      return this.$store.state.ModuleAuth.name;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch('ModuleAuth/logout');
      this.$router.push('/auth');
    },
  },
};
</script>
