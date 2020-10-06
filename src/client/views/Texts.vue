<template>
  <div>
    <router-link
      :to="{ name: 'AddText' }"
      tag="button"
      class="ui primary button"
    >
      Nuevo texto
    </router-link>
    <catalog-table api-url="http://localhost:3000/api/texts" :fields="fields">
    </catalog-table>
  </div>
</template>

<script>
// @ is an alias to /src
import CatalogTable from "@/components/CatalogTable.vue";
import FieldDefs from "@/components/FieldDefs.js";

export default {
  components: {
    CatalogTable,
  },
  data() {
    return {
      fields: FieldDefs,
    };
  },
};
</script>

<style lang="scss"></style>
