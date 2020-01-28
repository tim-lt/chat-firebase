<template lang="pug">
  div
    h1 Hello f*cking world
</template>

<style lang="scss">
div {
  display: flex;
  justify-content: center;

  h1 {
    font-size: 35px;
  }
}
</style>

<script>
export default {
  middleware: ['isLogget'],
};
</script>>
