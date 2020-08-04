<template>
  <sui-modal v-model="activeModal">
    <sui-modal-header>Cambiar significado</sui-modal-header>
    <sui-modal-content class="scrolling">
      <!-- <word-details
        class="word-details"
        :occurrence="occurrence"
        :selection="true"
      >
      </word-details> -->
    </sui-modal-content>
    <sui-modal-actions>
      <sui-button positive @click.native="toggleActive">
        Aceptar
      </sui-button>
    </sui-modal-actions>
  </sui-modal>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleActive() {
      this.$emit("toggle-select-meaning");
    },
  },
  computed: {
    activeModal() {
      return this.active;
    },
  },
};
</script>

<style></style>
