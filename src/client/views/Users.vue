<template>
  <div>
    <catalog-table
      api-url="/api/users"
      :fields="fields"
      @show-user-details="this.showUserDetails"
      ref="table"
    ></catalog-table>
    <alert :active="alertSuccess" :color="`success`">
      El usuario se guardó correctamente.
    </alert>
    <alert :active="alertError" :color="`error`">
      Algo salió mal, intenta de nuevo.
    </alert>
    <sui-modal v-model="showDetailsModal">
      <sui-modal-header>Editar definición</sui-modal-header>
      <sui-modal-content class="scrolling">
        <div class="definition-details-wrapper">
          <edit-user :user="formUser"></edit-user>
        </div>
      </sui-modal-content>
      <sui-modal-actions>
        <button class="ui button" @click="toggleModal">Cancelar</button>
        <button class="primary ui button" @click="saveUser">Guardar</button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import CatalogTable from "@components/UsersCatalogTable.vue";
import EditUser from "@components/EditUser.vue";
import tableDefinitions from "@components/UsersTableFieldDefinitions.js";
import Alert from "@components/Alert.vue";
import { mapActions, mapState } from "vuex";
import { UPDATE_USER } from "../store/action-types";

export default {
  components: {
    CatalogTable,
    Alert,
    EditUser,
  },
  data() {
    return {
      fields: tableDefinitions,
      showDetailsModal: false,
      formUser: {},
      alertSuccess: false,
      alertError: false,
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    ...mapActions("users", [UPDATE_USER]),
    showUserDetails(user) {
      this.formUser = Object.assign({}, user);
      this.toggleModal();
    },
    toggleModal() {
      this.showDetailsModal = !this.showDetailsModal;
    },
    saveUser() {
      this[UPDATE_USER](this.formUser)
        .then(() => {
          this.$refs.table.$refs.vuetable.reload();
          this.alertSuccess = true;
          setTimeout(() => (this.alertSuccess = false), 4000);
        })
        .catch(() => {
          this.alertError = true;
          setTimeout(() => (this.alertError = false), 4000);
        })
        .finally(() => {
          this.showDetailsModal = false;
        });
    },
  },
  watch: {
    showDetailsModal(value) {
      if (!value) this.formUser = {};
    },
  },
};
</script>

<style lang="scss"></style>
