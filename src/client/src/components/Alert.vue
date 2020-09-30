<template>
  <div v-show="active" :class="classObject">
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean
    },
    color: {
      type: String,
      validator (val) {
        return [
          'success',
          'error'
        ].includes(val);
      }
    },
  },
  computed: {
    classObject() {
      return {
        'alert': true,
        'alert--success': this.color === 'success',
        'alert--error': this.color === 'error'
      };
    }
  }
}
</script>

<style lang="scss">
$base-green: #21ba45;
$base-red: #db2828;

.alert {

  max-width: 30vw;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 5px;
  font-size: 1.1rem;

  &--success {
    background-color: $base-green;
  }

  &--error {
    background-color: $base-red;
  }
}
</style>