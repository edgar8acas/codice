<template>
  <div>
    <div class="top-bar-words-catalog">
      <form class="ui form word-search">
        <div class="field search-field">
          <label>Búsqueda</label>
          <input type="text" name="word" v-model="search" placeholder=""/>
        </div>
      </form>
      <!-- <button class="primary ui button add-definition-button">Nueva definición</button> -->
    </div>
    <catalog-table
      :api-url="`http://localhost:3000/api/words?search=${search}`"
      :fields="fields"
      @showWordDetails="this.showWordDetails"
      ref="table"
    >
    </catalog-table>
    <alert :active="alertSuccess" :color="`success`">
      La definición se guardó correctamente.
    </alert>
    <alert :active="alertError" :color="`error`">
      Algo salió mal, intenta de nuevo.
    </alert>
    <sui-modal v-model="showDetailsModal">
      <sui-modal-header>Editar definición</sui-modal-header>
      <sui-modal-content class="scrolling">
        <edit-word :word="word"></edit-word>
      </sui-modal-content>
      <sui-modal-actions>
        <button class="primary ui button" @click="saveWord">Guardar</button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
import CatalogTable from "@/components/WordsCatalogTable.vue";
import EditWord from "@/components/EditWord.vue";
import FieldDefs from "@/components/WordsFieldDefs.js";
import Alert from "@/components/Alert.vue";
import { mapActions } from 'vuex';
import { UPDATE_MEANING } from '../store/action-types';

export default {
  components: {
    CatalogTable,
    EditWord,
    Alert
  },
  data() {
    return {
      fields: FieldDefs,
      showDetailsModal: false,
      word: {},
      search: '',
      alertSuccess: false,
      alertError: false
    };
  },
  methods: {
    ...mapActions([UPDATE_MEANING]),
    showWordDetails(word) {
      this.word = Object.assign({}, word);
      this.showDetailsModal = !this.showDetailsModal;
    },
    saveWord() {
      this[UPDATE_MEANING](this.word)
        .then(() => {
          this.$refs.table.$refs.vuetable.reload();
          this.showDetailsModal = !this.showDetailsModal;
          this.alertSuccess = true;
          setTimeout(() => this.alertSuccess = false, 4000);
        })
        .catch(() => {
          this.alertError = true;
          setTimeout(() => this.alertError = false, 4000);
        })
      
    }
  },
};
</script>

<style lang="scss">
.top-bar-words-catalog {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
}

.word-search {
  width: 25vw;
}
.word-actions {
  
}
.add-definition-button {
  align-self: center;
  font-size: 1.1rem !important;
  align-self: flex-end;
}
</style>
