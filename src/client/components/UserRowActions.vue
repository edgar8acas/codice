<template>
  <div>
    <button class="ui button mini" @click="$emit('show-user-details', rowData)">
      Editar
    </button>
  </div>
</template>

<script>
export default {
  props: {
    rowData: Object,
  },
};
</script>

<style></style>
