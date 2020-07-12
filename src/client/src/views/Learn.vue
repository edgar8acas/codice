<template>
  <section class="central">
    <div class="side-info">
      <h2 class="section-title">Diccionario de la lección</h2>
      <div class="dictionary">
        Aprendidas ({{ learntWords.length }})
        <ul>
          <li
            class="learned"
            v-for="dictionaryWord in learntWords"
            :key="dictionaryWord.dictionaryId"
          >
            {{ dictionaryWord.Word.word }}
          </li>
        </ul>
        Por aprender ({{ unlearntWords.length }})
        <ul>
          <li
            class="unlearned"
            v-for="dictionaryWord in unlearntWords"
            :key="dictionaryWord.dictionaryId"
          >
            {{ dictionaryWord.Word.word }}
          </li>
        </ul>
      </div>
    </div>
    <div class="learn-view">
      <h2>Los bancos</h2>
      <text-content
        class="text-content"
        :isChoosing="false"
        @changeOccurrence="changeOccurrence"
      ></text-content>

      <!--<div class="media-container">
        <img v-if="occurrence.Word.imageUrl"
          :src="occurrence.Word.imageUrl" 
          :alt="occurrence.word" 
          class="image" />
        <img v-if="!occurrence.Word.imageUrl"
          :src="require('../assets/img_placeholder.png')"
          :alt="occurrence.word" 
          class="image" />
        <iframe v-if="formattedVideoUrl"
          width="560" height="315" 
          :src="formattedVideoUrl" 
          frameborder="0" 
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen></iframe>
        <div v-if="!occurrence.Word.videoUrl"
          class="video">Sin video</div>
      </div>-->
    </div>
    <div class="side-info">
      <h2 class="section-title">
        {{ occurrence.word || "Información de palabra" }}
      </h2>
      <div class="word-detailed-info">
        <div class="feature">
          <span>{{ formatEssential }}</span>
          <div class="help">
            <b>Esencial: </b> La ocurrencia fue añadida por el administrador.
            <br />
            <b>No esencial: </b> La ocurrencia fue añadida por el usuario.
          </div>
        </div>
        <div class="feature">
          <span>{{ formatAvailableMeanings }}</span>
          <div class="help">
            <b>Definiciones disponibles: </b> Existen definiciones para la
            ocurrencia. <br />
            <b>Sin definiciones: </b> No existen definiciones para la
            ocurrencia.
          </div>
        </div>
        <div class="feature">
          <span>{{ formatVisible }}</span>
          <div class="help">
            <b>Visible: </b> La palabra está resaltada en el texto. <br />
            <b>No visible: </b> La palabra no está resaltada en el texto.
          </div>
        </div>
      </div>
      <div class="word-actions">
        <button class="ui button" @click="toggleSelectMeaning">
          Cambiar significado
        </button>
        <button class="ui button" @click="toggleAddOccurrence">
          Añadir ocurrencia
        </button>
      </div>

      <!--<mark-learned :occurrence="occurrence"></mark-learned>-->
    </div>

    <sui-modal v-model="selectMeaning">
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
  </section>
</template>

<script>
import TextContent from "@/components/TextContent";
// import MarkLearned from "@/components/MarkLearned";
import WordDetails from "@/components/WordDetails";
import { getSelectedWordDetails } from "@/utils/template";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    WordDetails,
    TextContent,
    // MarkLearned
  },
  data() {
    return {
      textId: this.$route.params.id,
      occurrence: {
        Word: {},
        matchingWords: [],
      },
      isLearnt: false,
      selectMeaning: false,
      addingOccurrence: false,
    };
  },
  computed: {
    ...mapState(["occurrences", "currentTemplateText"]),
    ...mapGetters(["learntWords", "unlearntWords"]),
    formattedVideoUrl() {
      if (this.occurrence.Word.videoUrl) {
        const videoUrl = this.occurrence.Word.videoUrl.match(
          new RegExp("v=(.*)")
        )[1];
        return `https://www.youtube.com/embed/${videoUrl}`;
      }
      return null;
    },
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
    await this.$store.dispatch("getTemplateByTextId", this.textId);
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

<style lang="scss" scoped>
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

  .word-actions {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    margin-right: 20px;

    > * {
      margin-top: 10px;
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
.text-content {
  height: 400px;
  overflow: scroll;
  overflow-x: hidden;
  font-size: 1.5em;
  margin: 0 10px;
  text-align: left;
  line-height: 160%;
}

.media-container {
  display: flex;
  flex-flow: row nowrap;
  height: 200px;
  margin-top: 20px;
  > * {
    flex-grow: 1;
    height: 100%;
  }
  .video {
    //color: red;
    text-align: center;
    //border: 1px solid red;
  }
  .image {
    border: 1px solid blue;
  }
}
</style>
