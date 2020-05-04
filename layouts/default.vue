<template lang="pug">
  .page(:class="{'page--overflow':isMenu}")
    header.page__header
      .container.page__headerContainer
        .page__name {{ name }}
        button.page__burder(aria-label="menu", @click="isMenu = !isMenu", :class="{'page__burder--open':isMenu}")
          .page__line
    main.page__main
      nuxt
    transition(name="fade")
      .page__menu(v-if="isMenu")
        .page__overlay(@click="isMenu = false")
        nav.page__nav
          .page__scroll(v-bar)
            div
              nuxt-link.page__link(to="/" exact @click.native="onClick") Главная
              nuxt-link.page__link(to="/tasks" exact @click.native="onClick") Все задачи
              button.page__link(aria-label="exit" @click="logout") Выход
</template>

<style lang="scss">
.page {
  display: flex;
  flex-direction: column;

  &--overflow {
    overflow: hidden;
    max-height: 100vh;
  }

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

    @media (orientation: landscape) {
      min-height: 500px;
    }
  }

  &__burder {
    background-color: transparent;
    border: none;
    padding: 0;
    height: 17px;
    position: relative;
    width: 25px;
    transition: 0.3s ease opacity;

    &::before,
    &::after {
      content: "";
      transition: 0.3s ease transform;
      transform-origin: left;
    }

    &::before {
      top: 0;
    }

    &::after {
      bottom: 0;
    }

    &--open {
      opacity: 0;
      transition: 0.3s ease opacity;
      pointer-events: none;

      @include mq("tablet") {
        opacity: 1;
        pointer-events: auto;

        .page__line {
          transition: 0.2s ease opacity;
          opacity: 0;
        }

        &::before {
          transform: rotate(37deg);
        }

        &::after {
          transform: rotate(-37deg);
        }

        &::before,
        &::after {
          transition: 0.3s ease transform 0.2s;
        }
      }
    }
  }

  &__burder::before,
  &__burder::after,
  &__line {
    background-color: $main;
    border-radius: 1px;
    left: 0;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 2px;
  }

  &__line {
    top: 50%;
    transform: translateY(-50%);
    transition: 0.2s ease opacity 0.2s;
  }

  &__menu {
    position: fixed;
    top: 60px;
    height: calc(100vh - 60px);
    width: 100%;
    right: 0;
    z-index: 500;

    &.fade-leave-active,
    &.fade-enter-active {
      transition: transform 0.5s ease;
    }

    &.fade-enter,
    &.fade-leave-to {
      transform: translateX(100%);
    }
  }

  &__overlay {
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 1;
  }

  &__nav {
    background-color: $default;
    border-left: 2px solid $white;
    position: absolute;
    width: 300px;
    top: 0;
    height: 100%;
    right: 0;
    z-index: 2;

    @include mq("tablet") {
      border-left: none;
      width: 100%;
    }
  }

  &__link {
    background-color: transparent;
    border: none;
    color: $main;
    padding: 0 15px;
    position: relative;
    border-bottom: 2px solid #fff;
    display: flex;
    user-select: none;
    font: 700 16px/1em "PT Sans", sans-serif;
    text-transform: uppercase;
    align-items: center;
    text-decoration: none;
    -webkit-user-drag: none;
    transition: opacity 0.3s ease;
    height: 60px;
    width: 100%;

    @include hover() {
      opacity: 0.7;
    }

    &.nuxt-link-active {
      color: #fff;
      cursor: default;

      @include hover() {
        opacity: 1;
      }

      &::after {
        opacity: 1;
      }
    }

    &::after {
      background: linear-gradient(to top, $message1, $message2);
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
      transition: 0.3s ease opacity;
      z-index: -1;
    }
  }

  &__scroll {
    height: 100%;
  }
}
</style>

<script>
import BaseButton from '~/components/BaseButton/BaseButton.vue';

export default {
  components: {
    BaseButton,
  },
  data() {
    return {
      isMenu: false,
    };
  },
  computed: {
    name() {
      return this.$store.state.ModuleAuth.name;
    },
    isMobile() {
      return (this.$mq === 'phone' || this.$mq === 'phone-wide' || this.$mq === 'tablet');
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch('ModuleAuth/logout');
      this.$router.replace('/auth');
    },
    onClick() {
      if (this.isMobile) this.isMenu = false;
    },
  },
};
</script>
