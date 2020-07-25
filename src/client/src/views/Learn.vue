<template>
  <div class="learn-view">
    <div class="learn_text">
      <h2 class="learn__title">{{ currentTemplateText.title }}</h2>
      <text-content
        class="learn__text-content"
        @changeOccurrence="changeOccurrence"
      ></text-content>
    </div>
    <media-container
      class="learn__media-container"
      :occurrence="occurrence"
    >
      <template v-slot:select-meaning>
        <button v-if="occurrence.word" class="ui button" @click="toggleSelectMeaning">
          Cambiar significado
        </button>
      </template>
    </media-container>
    <div class="learn__word-actions">
      
      <button class="ui button" @click="toggleAddOccurrence">
        Añadir ocurrencia
      </button>
      </div>

    <sui-modal v-if="selectMeaning" v-model="selectMeaning">
      <sui-modal-header>Cambiar significado</sui-modal-header>
      <sui-modal-content class="scrolling">
        <word-details
          class="word-details"
          :occurrence="occurrence"
          :selection="true"
        >
        </word-details>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive @click.native="toggleSelectMeaning">
          Aceptar
        </sui-button>
      </sui-modal-actions>
    </sui-modal>

    <sui-modal v-model="addingOccurrence">
      <sui-modal-header>Añadir ocurrencia</sui-modal-header>
      <sui-modal-content class="scrolling">
        <div class="ui info message" v-if="addingOccurrence">
          <div class="header">
            Instrucciones
          </div>
          <p>
            Selecciona la ocurrencia y da click en <b>Añadir seleccionado</b>.
          </p>
        </div>
        <pre>{{ currentTemplateText.rawContent }}</pre>
      </sui-modal-content>
      <sui-modal-actions>
        <button
          class="primary ui button"
          v-if="addingOccurrence"
          @click="addSelectedOccurrence"
        >
          Añadir seleccionado
        </button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
import TextContent from "@/components/TextContent";
import MediaContainer from "@/components/MediaContainer";
import WordDetails from "@/components/WordDetails";
import { getSelectedWordDetails } from "@/utils/template";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    TextContent,
    MediaContainer,
    WordDetails
  },
  data() {
    return {
      textId: this.$route.params.id,
      occurrence: {
        Word: {}
      },
      isLearnt: false,
      selectMeaning: false,
      addingOccurrence: false,
    };
  },
  computed: {
    ...mapState(["occurrences", "currentTemplateText"]),
    ...mapGetters(["learntWords", "unlearntWords"]),
    formatEssential() {
      return this.occurrence.essential ? "Esencial" : "No esencial";
    },
    formatAvailableMeanings() {
      return this.occurrence.availableMeanings
        ? "Definiciones disponibles"
        : "Sin definiciones";
    },
    formatVisible() {
      return this.occurrence.visible ? "Visible" : "No visible";
    },
  },
  async mounted() {
    await this.$store.dispatch("getDataForLearning", this.textId);
  },
  methods: {
    changeOccurrence(start) {
      this.occurrence = this.occurrences.find((o) => o.start === start);
    },
    async toggleSelectMeaning() {
      await this.$store.dispatch("getRelatedWords", this.occurrence);
      this.selectMeaning = !this.selectMeaning;
    },
    toggleAddOccurrence() {
      this.addingOccurrence = true;
    },
    async addSelectedOccurrence() {
      const details = getSelectedWordDetails(this.currentTemplateText);
      await this.$store.dispatch("addNewOccurrence", details);
      window.location.reload();
    },
  },
};
</script>

<style lang="scss">
:root {
  --learn-background: #abd1c6;
  --learn-secondary: #004643;

}
.learn-view.main {
  grid-column: 2 / 6;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100%;
  font-family: 'Mulish', sans-serif;
}

.learn__title {
  font-family: 'Mulish', sans-serif;
  font-size: 2.5em;
  text-align: center;
  font-weight: 800;
}

.learn__text-content {
  height: 70vh;
  overflow: scroll;
  overflow-x: hidden;
  font-size: 1.8em;
  margin: 0 10px;
  text-align: left;
  line-height: 160%;
}

.learn__media_container {
}

.learn__word-actions {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 1em;
    grid-column: 1 / 3;
    // border: 1px solid red;
    margin-left: 20px;
    margin-right: 20px;

    > * {
      margin-top: 10px;
    }
  }

.central {
  display: grid;
  grid-template-columns: 20% 40% 20%;
  justify-content: center;
  column-gap: 0.5em;
}
.side-info {
  border-radius: 5px;
  border: 1px solid #c2c2c2;
  text-align: center;

  .word-detailed-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.5em;

    .feature {
      position: relative;

      span {
        color: #2185d0;
      }
      .help {
        display: none;
      }
      &:hover .help {
        display: block;
        border-radius: 20px;
        position: absolute;
        background-color: beige;
        z-index: 5;
        left: 200px;
        min-width: 200px;
        text-align: left;
        padding: 10px;
      }
    }
  }

  
}

.btn {
  margin: 5px;
  width: 150px;
  height: 30px;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 1em;
  border: none;
  border-radius: 5px;
}

.btn-learned {
  background-color: green;
}

.btn-unlearned {
  background-color: red;
}
.dictionary {
  text-align: left;
  margin-left: 20px;
  margin-right: 20px;
}

.inline-word.ready {
  color: blue;
}
ul {
  list-style-type: none;
  padding: 0;
  > * {
    display: block;
    text-align: left;
    border: 1px solid #c2c2c2;
    padding: 5px;
    margin-bottom: 5px;
    border-radius: 5px;
  }
  .learned {
    background-color: #b3ffb3;
  }
  .unlearned {
    background-color: #fff3b3;
  }
}
</style>
