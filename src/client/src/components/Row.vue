<template>
  <div class="row">
    <router-link :to="{ name: 'TextDetails', params: { id: textId } }">{{ textId }}</router-link>
    | {{ text.title }} | {{ text.category }} | {{ isRawContentNull }} | {{ isProcessed }}
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
      return this.text.rawContent ? this.text.rawContent.substring(0, 10) + '...' : 'Sin contenido';
    },
    isProcessed: function() {
      return this.text.status === 'PROCESSED' ? 'Si' : 'No';
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