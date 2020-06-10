<template>
  <div class="row">
    <router-link :to="{ name: 'TextDetails', params: { id: textId } }">{{ textId }}</router-link> |
    <span style="color: #157A6E; font-weight: bold">{{ text.title }}</span> |
    <span style="color: #157A6E">{{ text.category }}</span> |
    <span style="color: #157A6E">{{ text.grade + '°' }} grado</span> |
    <span style="color: #157A6E">Procesado: {{ isProcessed }}</span> |
    <span style="color: #C2C5BB">{{ isRawContentNull }}</span> |
    <router-link :to="{ name: 'Learn', params: { id: textId } }">{{ 'Aprender' }}</router-link>
  </div>
</template>

<script>
export default {
  props: {
    text: Object,
    textId: Number
  },
  data() {
    return {   
      
    }
  },
  computed: {
    textIdLocation: function() {
      return `/texts/${this.text.textId}`;
    },
    isRawContentNull: function() {
      return this.text.rawContent ? this.text.rawContent.substring(0, 30) + '...' : 'Sin contenido';
    },
    isProcessed: function() {
      return this.text.status === 'processed' ? 'Si' : 'No';
    }
  }
}
</script>

<style>
.row {
  height: auto;
  text-align: start;
  padding: 10px 10px;
  margin-bottom: 10px;
  border: 1px solid #c2c2c2;
  border-radius: 5px;
  color: #42B983;
}
</style>