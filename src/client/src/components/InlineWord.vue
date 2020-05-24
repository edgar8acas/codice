<template>
  <span>{{ word }}</span>
</template>

<script>
export default {
  props: {
    word: String
  }
}
</script>

<style lang="scss" scoped>
span {
  color: red;
}
</style>