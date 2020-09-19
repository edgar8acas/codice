<template>
  <div>
    <form class="ui form">
      <div class="field">
        <label>Búsqueda</label>
        <input type="text" name="word" v-model="search" placeholder=""/>
      </div>
    </form>
    <catalog-table
      :api-url="`http://localhost:3000/api/words?search=${search}`"
      :fields="fields"
      @showWordDetails="this.showWordDetails"
    >
    </catalog-table>

    <sui-modal v-model="showDetailsModal">
      <sui-modal-header>Editar palabra</sui-modal-header>
      <sui-modal-content class="scrolling">
        <form class="ui form">
          <div class="field">
            <label>Id</label>
            <input type="text" name="wordId" v-model="word.wordId" />
          </div>
          <div class="field">
            <label>Palabra</label>
            <input type="text" name="word" v-model="word.word" />
          </div>
          <div class="field">
            <label>Definición</label>
            <input type="text" name="definition" v-model="word.word" />
          </div>
          <div class="field">
            <label>Tipo</label>
            <input type="text" name="type" v-model="word.type" />
          </div>
        </form>
      </sui-modal-content>
      <sui-modal-actions>
        <button class="primary ui button" @click="editWord">Guardar</button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
import CatalogTable from "@/components/WordsCatalogTable.vue";
import FieldDefs from "@/components/WordsFieldDefs.js";

export default {
  components: {
    CatalogTable,
  },
  data() {
    return {
      fields: FieldDefs,
      showDetailsModal: false,
      word: {},
      search: ''
    };
  },
  methods: {
    showWordDetails(word) {
      this.word = word;
      this.showDetailsModal = !this.showDetailsModal;
    },
    editWord() {},
  },
};
</script>

<style></style>
