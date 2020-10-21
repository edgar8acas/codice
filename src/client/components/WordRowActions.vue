<template>
  <div>
    <button class="ui button mini" @click="showWordDetails">Editar</button>
  </div>
</template>

<script>
export default {
  props: {
    rowData: Object,
  },
  methods: {
    showWordDetails() {
      this.$emit("showWordDetails", this.rowData);
    },
  },
};
</script>

<style></style>
