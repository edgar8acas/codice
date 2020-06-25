<template>
  <div>
    <router-link 
      :to="{ path: '', params: { id: rowData.wordId } }"
      tag="button"
      class="ui button mini"
    >
      Detalles
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    rowData: Object
  }
}
</script>

<style>

</style>