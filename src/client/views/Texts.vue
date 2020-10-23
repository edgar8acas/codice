<template>
  <div>
    <div class="catalog-actions-top">
      <router-link
        :to="{ name: 'AddText' }"
        tag="button"
        class="add-text ui primary button"
        v-if="user.admin"
      >
        Nuevo texto
      </router-link>
    </div>
    <catalog-table api-url="/api/texts" :fields="fields"> </catalog-table>
  </div>
</template>

<script>
// @ is an alias to /src
import CatalogTable from "@components/CatalogTable.vue";
import FieldDefsAdmin from "@components/TextTableAdminDefinitions.js";
import FieldDefsUser from "@components/TextTableStudentDefinitions.js";
import { mapState } from "vuex";

export default {
  components: {
    CatalogTable,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("auth", ["user"]),
    fields() {
      return this.user.admin ? FieldDefsAdmin : FieldDefsUser;
    },
  },
};
</script>

<style lang="scss">
.catalog-actions-top {
  margin-bottom: 2rem;
}
</style>
