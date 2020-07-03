<template>
  <div>
    <router-link 
      :to="{ path: '', params: { id: rowData.wordId } }"
      tag="button"
      class="ui button mini"
    >
      Detalles
    </router-link>
    <button class="ui button mini" @click="showWordDetails">Editar</button>
  </div>
</template>

<script>
export default {
  props: {
    rowData: Object
  },
  methods: {
    showWordDetails() {
      this.$emit('showWordDetails', this.rowData);
    }
  }
}
</script>

<style>

</style>