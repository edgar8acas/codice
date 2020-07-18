<template>
  <div>
    <h2 class="section-title">
      {{ occurrence.word || "Detalles de palabra" }}
    </h2>
    <div class="related-words-container">
      <button
        class="mini ui button"
        @click="updateAvailableMeanings"
      >
        Refrescar
      </button>
      <div v-if="availableMeanings.length === 0">
        No hay definiciones para la ocurrencia
      </div>
      <div v-else-if="selection">
        Selecciona un significado para la ocurrencia
      </div>
      <div v-else>
        Significados disponibles
      </div>
      <div
        v-for="word in availableMeanings"
        :key="word.wordId"
        class="related-word"
      >
        <div
          class="flex-item image"
          :style="{
            backgroundImage:
              'url(' + require('@/assets/img_placeholder.png') + ')',
          }"
        ></div>
        <div class="flex-item info">
          <span class="definition" style="font-weight: bold;">{{
            word.definition || "Definición..."
          }}</span>
          <span class="definition">{{ word.type || "Tipo..." }}</span>
          <span class="more">{{
            word.wordId ? "Id de palabra: " + word.wordId : "Nuevo significado"
          }}</span>
          <br />
          <div class="field" v-if="selection">
            <label>Seleccionar</label>
            <input
              type="radio"
              name="words-group"
              v-model="picked"
              :id="'word-' + word.wordId"
              :value="'word-' + word.wordId"
              placeholder='"Español" ó "Conocimiento del medio"'
            />
          </div>
          <button
            class="mini red ui button"
            v-if="!selection"
            @click="deleteWord(word)"
          >
            Eliminar
          </button>
          <span class="more">Más información</span>
        </div>
      </div>
      <div v-if="selection && occurrence.selectedWordId !== null">
        Guardar seleccionado para cada ocurrencia de
        <i>{{ occurrence.word }}</i>
        <br />
        <a class="btn-primary" @click.prevent="setSelectedForEveryOccurrence"
          >Guardar</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    occurrence: {
      type: Object,
      required: true,
      default: function () {
        return {};
      },
    },
    selection: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      picked: "",
      markedStatus: "",
    };
  },
  computed: {
    availableMeanings() {
      return this.$store.getters.availableMeaningsByWord(this.occurrence.word);
    },
  },
  watch: {
    occurrence() {
      this.picked = "word-" + this.occurrence.selectedWordId;
      this.markedStatus = this.occurrence.markedStatus;
    },
    picked(newVal) {
      if (newVal === "word-" + this.occurrence.selectedWordId) return;

      this.$store.dispatch("updateSelectedWord", {
        ...this.occurrence,
        selectedWordId: Number(newVal.substring(5)),
      });
      this.markedStatus = "ready";
    },
    markedStatus: {
      handler(newVal) {
        if (newVal === this.occurrence.markedStatus) return;
        this.$store.dispatch("updateMarkedStatus", {
          occurrenceStart: this.occurrence.start,
          markedStatus: newVal,
        });
      },
    },
  },
  methods: {
    setSelectedForEveryOccurrence() {
      this.$store.dispatch("setSelectedForEveryOccurrence", this.occurrence);
    },
    deleteWord(word) {
      this.$store.dispatch("deleteRelatedWord", word);
    },
    updateAvailableMeanings() {
      this.$store.dispatch("getRelatedWords", this.occurrence);
    }
  },
};
</script>

<style lang="scss">
.word-details > h2 {
  text-align: center;
}
.help.details-box {
  color: #c2c2c2;
  text-align: center;
}
.related-words-container {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  align-items: center;
}
.related-word {
  display: flex;
  flex-flow: row nowrap;
  padding: 10px;
  width: 90%;
  border-radius: 5px;
  margin: 5px;
  background-color: #d9d9d9;
  .info {
    box-sizing: border-box;
    text-align: left;
    margin-left: 0.5em;
    .definition {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 1em;
    }
    .more {
      font-size: 0.8em;
    }
    flex-grow: 1;
  }
  .image {
    background-image: url("https://images.freeimages.com/images/large-previews/b3d/flowers-1375316.jpg");
    background-size: cover;
    border-radius: 5px;
  }
}

.flex-item {
  width: 100px;
  height: 100px;
}
</style>
