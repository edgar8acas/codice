<template>
  <section class="central">
    <div class="details">
      <div class="side-card">
        <h2>Información</h2>
        <div class="details-box">
          <div class="detail expand">
            <span class="label">Título</span>
            <span>{{ text.title }}</span>
          </div>

          <div class="detail">
            <span class="label">Categoría</span>
            <span>{{ text.category }}</span>
          </div>

          <div class="detail">
            <span class="label">Grado</span>
            <span>{{ formatGrade }}</span>
          </div>
        </div>
        <span class="more-info">+</span>
      </div>

      <div class="side-card" v-if="processed">
        <h2>Ocurrencias</h2>
        <form class="ui form">
          <div class="field">
            <div class="ui checkbox">
              <input
                type="checkbox"
                name="availableMeanings"
                v-model="filter.availableMeanings"
              />
              <label>Significados disponibles</label>
            </div>
          </div>
          <div class="field">
            <div class="ui checkbox">
              <input
                type="checkbox"
                name="noAvailableMeanings"
                v-model="filter.noAvailableMeanings"
              />
              <label>Sin significados</label>
            </div>
          </div>
        </form>
      </div>

      <div class="side-card" v-if="!processed">
        <sui-message class="warning">
          <sui-message-header>Texto sin palabras</sui-message-header>
          <p>Este texto aún no ha sido procesado.</p>
          <button
            class="ui button primary"
            @click="toggleProcessingConfirmation"
          >
            Procesar
          </button>
        </sui-message>
      </div>

      <div class="side-card" v-if="processed">
        <symbology :items="contentSymbology"/>
      </div>
    </div>

    <div class="template">
      <h2 class="title">{{ text.title }}</h2>
      <text-content
        class="text-content"
        :filterOptions="filter"
        :isProcessing="false"
        :text="text"
      ></text-content>
    </div>
    <div class="side-info" v-if="occurrence">
      <word-details class="word-details" :occurrence="occurrence">
      </word-details>
      <create-word :forWord="occurrence.word"></create-word>
    </div>

    <sui-modal v-model="processingConfirmation">
      <sui-modal-header>Procesar el texto "{{ text.title }}"</sui-modal-header>
      <sui-modal-content class="scrolling">
        <form class="ui form">
          <div class="field">
            <div class="ui checkbox">
              <input
                type="checkbox"
                name="exclusivo"
                v-model="options.lexicoExclusivo"
              />
              <label>Léxico exclusivo</label>
            </div>
          </div>
        </form>
      </sui-modal-content>
      <sui-modal-actions>
        <router-link
          :to="{ name: 'ProcessText', params: { id: text.textId } }"
          tag="button"
          class="ui button primary"
          v-if="!processed"
        >
          Continuar
        </router-link>
      </sui-modal-actions>
    </sui-modal>
  </section>
</template>

<script>
import TextContent from "@/components/TextContent";
import WordDetails from "@/components/WordDetails";
import CreateWord from "@/components/CreateWord";
import Symbology from "@/components/Symbology";

import { mapState, mapActions } from "vuex";
import { GET_TEMPLATE_DATA, GET_TEXT_BY_ID } from "./../store/action-types";

import { colors } from "@/assets/colors"

export default {
  components: {
    TextContent,
    WordDetails,
    CreateWord,
    Symbology
  },
  data() {
    return {
      textId: this.$route.params.id,
      currentWordId: null,
      onlyExclusive: false,
      processingConfirmation: false,
      occurrence: {},
      filter: {
        availableMeanings: false,
        noAvailableMeanings: false,
      },
      contentSymbology: [
        { color: colors.GREEN, description: 'Ocurrencias con significado' },
        { color: colors.ORANGE, description: 'Ocurrencias sin significado' }
      ]
    };
  },
  computed: {
    ...mapState("texts", ["texts"]),
    ...mapState("process", ["options"]),
    ...mapState(["template"]),
    text() {
      return this.texts.find((text) => text.textId === Number(this.textId));
    },
    processed() {
      return this.text.status === "processed" ||
        this.text.status === "incomplete"
        ? true
        : false;
    },
    status() {
      switch (this.text.status) {
        case "processed":
          return "Procesado";
        case "unprocessed":
          return "Sin procesar";
        case "incomplete":
          return "Procesado (existen palabras sin multimedia)";
        default:
          return "Desconocido";
      }
    },
    formatGrade() {
      return this.text.grade + "°";
    },
  },
  async mounted() {
    await this[GET_TEXT_BY_ID](this.textId);
    await this[GET_TEMPLATE_DATA](this.text);
  },
  methods: {
    ...mapActions([GET_TEMPLATE_DATA]),
    ...mapActions("texts", [GET_TEXT_BY_ID]),
    displayContent() {
      this.showContent = true;
    },
    async changeOccurrence(start) {
      const foundOccurrence = this.template.occurrences.find(
        (o) => o.start === start
      );
      this.occurrence = foundOccurrence;
    },
    toggleProcessingConfirmation() {
      this.processingConfirmation = !this.processingConfirmation;
    },
  },
};
</script>

<style lang="scss">
:root {
  --box-border-color: #c2c2c2;
}
.identified {
  color: blue;
}
.central {
  display: grid;
  grid-template-columns: 20% 60% 20%;
  justify-content: center;
  column-gap: 0.5em;
}

.text-content {
  height: 60vh;
  overflow: scroll;
  overflow-x: hidden;
  font-size: 1.5em;
  margin: 0 10px;
  text-align: left;
  line-height: 160%;
  border-top: 3px solid #c2c2c2;
  border-bottom: 3px solid #c2c2c2;
  padding: 1em 0em;
}

.details-box {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}

.side-card {
  padding: 10px;
  border-bottom: 1px solid var(--box-border-color);
  margin-bottom: 0.5em;
}

.detail {
  font-size: 1.4rem;
  padding-bottom: 10px;
  padding-right: 10px;
  .label {
    text-transform: uppercase;
    font-size: 0.8rem;
  }
  span {
    display: block;
  }
}

.expand {
  flex-basis: 100%;
  padding-right: 0;
}

.btn-primary {
  display: inline-block;
  text-transform: uppercase;
  background-color: #42b983;
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
  background-color: #26694b;
}
</style>
