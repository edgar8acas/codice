<template>
  <div class="home">
    <div class="info"></div>
    <TextsTable class="texts" :type="'texts'"/>
    <div class="more-info"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import TextsTable from '@/components/Table.vue'

export default {
  name: 'Home',
  components: {
    TextsTable
  }
}
</script>

<style lang="scss">
.home {
  display: grid;
  grid-template-columns: 1fr 50% 1fr;
}
</style>
