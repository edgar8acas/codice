<template>
  <div>
    <catalog-table
      api-url="http://localhost:3000/api/words"
      :fields="fields"
    >
    </catalog-table>
  </div>
</template>

<script>
import CatalogTable from '@/components/WordsCatalogTable.vue'
import FieldDefs from '@/components/WordsFieldDefs.js';

export default {
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

<style>

</style>