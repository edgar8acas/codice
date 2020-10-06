<template>
  <div>
    <h2>Significado</h2>
    <div v-for="i in items" :key="i.color" class="symbol">
      <div class="color" :style="{ backgroundColor: i.color }"></div>
      {{ i.description }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: function () { return [
        { color: 'blue', description: 'Something here Something here Something here'},
        { color: 'red', description: 'Something here Something here Something here'}
      ]}
    }
  }
}
</script>

<style lang="scss" scoped>
.symbol {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.color {
  height: 15px;
  width: 15px;
  border-radius: 2px;
  margin-right: 10px;
  align-self: center;
}
</style>