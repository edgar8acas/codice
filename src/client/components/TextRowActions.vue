<template>
  <div>
    <router-link
      :to="{ name: 'TextDetails', params: { id: rowData.textId } }"
      tag="button"
      class="ui button mini"
    >
      Detalles
    </router-link>
    <router-link
      :to="{ name: 'Learn', params: { id: rowData.textId } }"
      tag="button"
      class="ui button mini"
    >
      Aprender
    </router-link>
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
