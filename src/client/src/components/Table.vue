<template>
  <div>
    <div class="table">
      <div v-if="items.length === 0">
        No hay textos para mostrar
      </div>
      <row
        v-for="item in items" 
        v-bind:key="item.textId"
        :text="item"
        :textId="item.textId"
      />
    </div>
  </div>
</template>

<script>
import Row from '@/components/Row.vue'

export default {
  components: {
    Row
  },
  props: {
    type: String
  },
  data() {
    return {
      errors: []
    }
  },
  mounted() {
    this.$store.dispatch(this.actionGetAll);
  },
  computed: {
    items() {
      return this.$store.state[this.type];
    },
    actionGetAll() {
      return 'getAll' + this.type.charAt(0).toUpperCase() + this.type.slice(1);
    }
  }
}
</script>

<style lang="scss">
.table {
  width: 100%;
  display: flex;
  flex-direction: column;
}

</style>