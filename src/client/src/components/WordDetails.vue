<template>
  <div>
    <h2>{{currentWord.word || 'Detalles de palabra'}}</h2>
    <p class="details-box" v-if="currentWord.word">
      <span class="detail-label">ID</span>: {{ currentWord.wordId }} <br />
      <span class="detail-label">Definición</span>: {{ currentWord.definition }} <br />
      <span class="detail-label">Imagen</span>: {{ currentWord.imageUrl }} <br />
      <span class="detail-label">Video</span>: {{ currentWord.videoUrl }} <br />
    </p>
    <p class="details-box help" v-else>
      Pon el cursor sobre una palabra para ver su información
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    wordId: String
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['currentWord'])
  },
  watch: {
    wordId: function(val) {
      this.$store.dispatch('setCurrentWordId', Number(val))
    }
  }
}
</script>

<style>
.help.details-box {
  color: #c2c2c2;
  text-align: center;
}
</style>