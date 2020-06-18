<template>
  <div class="home">
    <div class="info"></div>
    <catalog-table
      api-url="http://localhost:3000/api/texts"
      :fields="fields"
    >
    </catalog-table>
    <div class="more-info">
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import CatalogTable from '@/components/CatalogTable.vue'
import FieldDefs from '@/components/FieldDefs.js'

export default {
  name: 'Home',
  components: {
    CatalogTable
  },
  data() {
    return {
      fields: FieldDefs
    }
  }
}
</script>

<style lang="scss">
.home {
  display: grid;
  grid-template-columns: 1fr 50% 1fr;
}
</style>
