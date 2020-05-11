<template>
  <div>
    <h2>Procesar texto {{ text.textId }}</h2>
    <span v-if="loading">Cargando...</span>
    <!-- -->
    <div class="words conflicts">
      <span v-if="isEmpty(wordsToChoose.conflicts)">Sin conflictos</span>
      <div v-for="(conflicts, word) in wordsToChoose.conflicts" :key="word">
        {{ word }}
        <ChoosingTooltip :options="conflicts" @selectedChanged="updateConflicts"/>
        </div>
    </div>
    <div class="words ready">
      <div v-for="(ready, word) in wordsToChoose.ready" :key="word">
        {{ word }}
        <ChoosingTooltip :options="ready"/>
      </div>
    </div>
    <a class="btn-primary" @click.prevent="save">Guardar</a>
  </div>
</template>

<script>
import ChoosingTooltip from '@/components/ChoosingTooltip';
export default {
  components: {
    ChoosingTooltip
  },
  data() {
    return {
      textId: this.$route.params.id,
      loading: false
    }
  },
  computed: {
    text() {
      return this.$store.state.texts.find(
        text => text.textId === this.textId
      )
    },
    wordsToChoose() {
      return this.$store.state.wordsToChoose;
    }
  },
  mounted() {
    this.$store.dispatch('resetWordsToChoose');
    this.$store.dispatch('processText', this.textId);
  },
  methods: {
    isEmpty(obj) {
      for(var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
      }
      return true;
    },
    save() {
      this.$store.dispatch('saveChoosenWords', this.textId);
    }
  }
}
</script>

<style lang="scss" scoped>

.words {
  max-width: 300px;
  display: flex;
  flex-flow: row wrap;
  border: 1px solid blue;
  
  > div {
    margin: 5px;
    padding: 5px;
    border-radius: 3px;
    cursor: pointer;
  }  
}

[class~="conflicts"] > div {
  border: 1px solid red;

  &:hover {
    background-color: red;
    color: white;
  }
} 

[class~="ready"] > div {
  border: 1px solid green;

  &:hover {
    background-color: green;
    color: white;
  }
}

.btn-primary {
  display: inline-block;
  text-transform: uppercase;
  background-color: #42B983;
  color: white;
  border-radius: 3px;
  box-sizing: border-box;
  padding: 5px 10px;
  text-decoration: none;
  font-size: 0.9em;
}

.btn-primary:link {
  color: white;
}

.btn-primary:visited {
  color: white;
}

.btn-primary:hover {
  background-color: #26694B;
}
</style>